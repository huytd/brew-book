# Turns a generated image with a *painted* transparency checkerboard (common when a generator can't output alpha)
# into a real transparent PNG, so it can go through slice_sheets.py.
#
# The checkerboard is perfectly neutral (light grey + white) while the illustrations are warm-tinted, so background
# is found by colour: neutral light pixels reachable from the image border, plus enclosed pockets (inside cup
# handles, between glass and spoon) that contain both checker tones. A thin neutral JPEG fringe around outlines is
# trimmed too.
#
#   python3 scripts/remove_checkerboard.py in.jpg docs/drink-sheet-c.png
#
# Requires Pillow.
import sys
from collections import deque

from PIL import Image

MAX_SAT = 10  # checker pixels are neutral: max(r,g,b) - min(r,g,b)
MIN_LUM = 205  # ...and light (grey tone ~221, white ~255)
FRINGE_SAT = 18  # looser test for the JPEG blend ring right next to background
FRINGE_LUM = 180
FRINGE_PASSES = 2
MIN_GRID_AGREEMENT = 0.88  # enclosed pockets must follow the checker's column pattern: real holes score >0.9,
# neutral glass bottoms/stems score <0.85


def fit_columns(lum, W, H):
    """Fit the checker's column period/offset from grey↔white transitions along the top rows (usually empty)."""
    best = None
    for y in range(2, min(12, H)):
        row = [lum[y * W + x] for x in range(W)]
        edges = [x for x in range(1, W) if (row[x - 1] < 238) != (row[x] < 238)]
        if len(edges) < 6:
            continue
        n = len(edges)
        mk = (n - 1) / 2
        me = sum(edges) / n
        s = sum((k - mk) * (e - me) for k, e in enumerate(edges)) / sum((k - mk) ** 2 for k in range(n))
        o = me - s * mk
        err = max(abs(e - (o + s * k)) for k, e in enumerate(edges))
        if best is None or err < best[2]:
            best = (s * 2, o, err)  # a full period is two squares
    if best is None or best[2] > 2:
        raise SystemExit('could not find a regular checkerboard along the top edge')
    period, first_edge, _ = best
    return period, first_edge - period / 2  # offset so that column parity 0 = first (grey) square


def main(src, dst):
    im = Image.open(src).convert('RGB')
    W, H = im.size
    data = list(im.get_flattened_data() if hasattr(im, 'get_flattened_data') else im.getdata())
    lum = [sum(p) // 3 for p in data]
    sat = [max(p) - min(p) for p in data]
    cand = bytearray(1 if sat[i] <= MAX_SAT and lum[i] >= MIN_LUM else 0 for i in range(W * H))

    def neighbours(j):
        x = j % W
        if x > 0:
            yield j - 1
        if x < W - 1:
            yield j + 1
        if j >= W:
            yield j - W
        if j < W * (H - 1):
            yield j + W

    period, offset = fit_columns(lum, W, H)
    print(f'checker columns: period {period:.3f}px, offset {offset:.2f}px')

    def grid_agreement(comp):
        # Along each row the checker flips tone at every grid column; per row the phase is unknown (the painted
        # pattern isn't perfectly regular vertically), so take the best of the two phases row by row.
        rows = {}
        for j in comp:
            if 212 <= lum[j] <= 232 or lum[j] >= 245:
                y, x = divmod(j, W)
                col_parity = int((x - offset) // (period / 2)) % 2  # flips every square
                is_grey = lum[j] <= 232
                rows.setdefault(y, [0, 0])[col_parity ^ is_grey] += 1
        total = sum(a + b for a, b in rows.values())
        return sum(max(a, b) for a, b in rows.values()) / total if total else 0

    bg = bytearray(W * H)
    seen = bytearray(W * H)

    # 1. everything neutral-light connected to the border
    q = deque(i for i in range(W * H) if cand[i] and (i < W or i >= W * (H - 1) or i % W in (0, W - 1)))
    for i in q:
        seen[i] = 1
    while q:
        j = q.popleft()
        bg[j] = 1
        for k in neighbours(j):
            if cand[k] and not seen[k]:
                seen[k] = 1
                q.append(k)

    # 2. enclosed pockets that look like checkerboard (both tones present)
    pockets = 0
    for i in range(W * H):
        if not cand[i] or seen[i]:
            continue
        comp = []
        q = deque([i])
        seen[i] = 1
        while q:
            j = q.popleft()
            comp.append(j)
            for k in neighbours(j):
                if cand[k] and not seen[k]:
                    seen[k] = 1
                    q.append(k)
        grey = sum(1 for j in comp if 212 <= lum[j] <= 232) / len(comp)
        white = sum(1 for j in comp if lum[j] >= 245) / len(comp)
        agree = grid_agreement(comp) if len(comp) >= 40 and grey >= 0.15 and white >= 0.15 else 0
        if agree >= MIN_GRID_AGREEMENT:
            pockets += 1
            for j in comp:
                bg[j] = 1

    # 3. trim the neutral JPEG blend ring hugging the background
    for _ in range(FRINGE_PASSES):
        ring = [
            j
            for j in range(W * H)
            if not bg[j]
            and sat[j] <= FRINGE_SAT
            and lum[j] >= FRINGE_LUM
            and any(bg[k] for k in neighbours(j))
        ]
        for j in ring:
            bg[j] = 1

    out = Image.new('RGBA', (W, H))
    out.putdata([(r, g, b, 0 if bg[i] else 255) for i, (r, g, b) in enumerate(data)])
    out.save(dst, optimize=True)
    print(f'{dst}: removed {sum(bg)} of {W * H} px as background ({pockets} enclosed pockets such as cup-handle holes)')


if __name__ == '__main__':
    if len(sys.argv) != 3:
        raise SystemExit('usage: remove_checkerboard.py <in> <out.png>')
    main(sys.argv[1], sys.argv[2])
