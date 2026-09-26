# Cuts AI-generated sprite sheets into clean, evenly sized cells and packs them into one WebP sprite.
#
# Generators rarely keep objects inside their grid cells, so objects are found by connected alpha shapes rather than
# by cutting a fixed grid: each cell's main object is the largest shape whose centre falls in that cell, and loose
# pieces (drips, grains, droplets, steam) are attached to the nearest main object. The near-invisible halo that
# generators leave around objects (alpha < 40) is dropped.
#
#   python3 scripts/slice_sheets.py icons    docs/icon-sheet-source.png         -> src/assets/ingredients.webp
#   python3 scripts/slice_sheets.py drinks   docs/drink-sheet-{a,b,c}.png       -> src/assets/drinks.webp
#
# Requires Pillow.
import json
import os
import sys
from collections import deque

from PIL import Image

ALPHA_MIN = 40  # below this a pixel is generator noise
SPECK = 15  # connected shapes smaller than this (px) are discarded


def extract(path, cols, rows):
    """Return a list of cols*rows RGBA images (row-major), each trimmed to its object."""
    im = Image.open(path).convert('RGBA')
    W, H = im.size
    src = im.load()
    mask = bytearray(1 if v >= ALPHA_MIN else 0 for v in im.getchannel('A').tobytes())
    lab = [0] * (W * H)
    comps = []
    for i in range(W * H):
        if not mask[i] or lab[i]:
            continue
        cid = len(comps) + 1
        q = deque([i])
        lab[i] = cid
        pts = []
        while q:
            j = q.popleft()
            pts.append(j)
            x = j % W
            for k in (j - 1 if x > 0 else -1, j + 1 if x < W - 1 else -1, j - W, j + W):
                if 0 <= k < W * H and mask[k] and not lab[k]:
                    lab[k] = cid
                    q.append(k)
        xs = [p % W for p in pts]
        ys = [p // W for p in pts]
        comps.append(
            dict(id=cid, n=len(pts), cx=sum(xs) / len(xs), cy=sum(ys) / len(ys), bb=(min(xs), min(ys), max(xs), max(ys)))
        )
    comps = [c for c in comps if c['n'] >= SPECK]

    cw, ch = W / cols, H / rows
    main = {}
    for c in sorted(comps, key=lambda c: -c['n']):
        k = min(rows - 1, int(c['cy'] // ch)) * cols + min(cols - 1, int(c['cx'] // cw))
        if k not in main:
            main[k] = c
            c['main'] = True
    missing = [k + 1 for k in range(cols * rows) if k not in main]
    if missing:
        raise SystemExit(f'{path}: no object found in cells {missing}')

    def gap(a, b):
        ax0, ay0, ax1, ay1 = a['bb']
        bx0, by0, bx1, by1 = b['bb']
        dx = max(0, bx0 - ax1, ax0 - bx1)
        dy = max(0, by0 - ay1, ay0 - by1)
        return (dx * dx + dy * dy) ** 0.5

    groups = {k: [c] for k, c in main.items()}
    for c in comps:
        if not c.get('main'):
            groups[min(main, key=lambda k: gap(c, main[k]))].append(c)

    out = []
    for k in range(cols * rows):
        parts = groups[k]
        ids = {p['id'] for p in parts}
        x0 = max(0, min(p['bb'][0] for p in parts) - 2)
        y0 = max(0, min(p['bb'][1] for p in parts) - 2)
        x1 = min(W, max(p['bb'][2] for p in parts) + 3)
        y1 = min(H, max(p['bb'][3] for p in parts) + 3)
        obj = Image.new('RGBA', (x1 - x0, y1 - y0), (0, 0, 0, 0))
        o = obj.load()
        for y in range(y0, y1):
            for x in range(x0, x1):
                r, g, b, a = src[x, y]
                if lab[y * W + x] in ids:
                    o[x - x0, y - y0] = (r, g, b, 255 if a >= 245 else a)
                elif 12 <= a < ALPHA_MIN and any(
                    0 <= x + dx < W and 0 <= y + dy < H and lab[(y + dy) * W + x + dx] in ids
                    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))
                ):
                    o[x - x0, y - y0] = (r, g, b, a)  # soft antialiased edge of this object only
        out.append(obj.crop(obj.getbbox()))
    return out


def pack(objs, out_cols, out_rows, cell, fit, align='center'):
    """Scale each object to fit a fit×fit box and place it in a cell. None leaves the cell empty."""
    sheet = Image.new('RGBA', (out_cols * cell, out_rows * cell), (0, 0, 0, 0))
    margin = (cell - fit) // 2
    for i, obj in enumerate(objs):
        if obj is None:
            continue
        ow, oh = obj.size
        s = fit / max(ow, oh)
        obj = obj.resize((round(ow * s), round(oh * s)), Image.LANCZOS)
        r, c = divmod(i, out_cols)
        x = c * cell + (cell - obj.width) // 2
        y = r * cell + ((cell - obj.height) // 2 if align == 'center' else cell - margin - obj.height)
        sheet.alpha_composite(obj, (x, y))
    return sheet


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else ''
    if mode == 'icons':
        src = sys.argv[2] if len(sys.argv) > 2 else 'docs/icon-sheet-source.png'
        pack(extract(src, 8, 6), 8, 6, 128, 116).save('src/assets/ingredients.webp', quality=90, method=6)
        print('wrote src/assets/ingredients.webp')
    elif mode == 'drinks':
        objs = []
        for letter in 'abc':
            path = f'docs/drink-sheet-{letter}.png'
            if os.path.exists(path):
                objs += extract(path, 5, 4)
            else:
                print(f'skipping {path} (not found) — cells left empty')
                objs += [None] * 20
        # Drinks sit on a shared baseline, so bottom-align them.
        pack(objs, 10, 6, 192, 176, align='bottom').save('src/assets/drinks.webp', quality=85, method=6)
        # Tell the app which cells have art; the rest fall back to the SVG cup.
        filled = [i + 1 for i, o in enumerate(objs) if o is not None]
        with open('src/assets/drinks.json', 'w') as f:
            json.dump({'filledCells': filled}, f)
            f.write('\n')
        print(f'wrote src/assets/drinks.webp ({len(filled)} of {len(objs)} cells) and src/assets/drinks.json')
    else:
        raise SystemExit('usage: slice_sheets.py icons|drinks [sheet]')


if __name__ == '__main__':
    main()
