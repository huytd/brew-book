# Cuts the generated 8x6 icon sheet into clean, evenly sized 128px cells and writes src/assets/ingredients.webp.
# Pieces (drips, grains, droplets) are attached to the nearest main object, so it tolerates icons that stray across cells.
# Run: python3 scripts/slice-icon-sheet.py [path/to/sheet.png]   (needs Pillow)
from PIL import Image, ImageDraw
from collections import deque
import sys
SRC=sys.argv[1] if len(sys.argv)>1 else 'docs/icon-sheet-source.png'
im=Image.open(SRC).convert('RGBA'); W,H=im.size
src=im.load()
al=im.getchannel('A').tobytes()
mask=bytearray(1 if v>=40 else 0 for v in al)
lab=[0]*(W*H); comps=[]
for i in range(W*H):
    if mask[i] and not lab[i]:
        cid=len(comps)+1; q=deque([i]); lab[i]=cid; pts=[]
        while q:
            j=q.popleft(); pts.append(j); x,y=j%W,j//W
            for k in (j-1 if x>0 else -1, j+1 if x<W-1 else -1, j-W, j+W):
                if 0<=k<W*H and mask[k] and not lab[k]: lab[k]=cid; q.append(k)
        xs=[p%W for p in pts]; ys=[p//W for p in pts]
        comps.append(dict(id=cid,pts=pts,n=len(pts),cx=sum(xs)/len(xs),cy=sum(ys)/len(ys),bb=(min(xs),min(ys),max(xs),max(ys))))
comps=[c for c in comps if c['n']>=15]
cw=W/8; ch=H/6
main={}
for c in sorted(comps,key=lambda c:-c['n']):
    k=min(5,int(c['cy']//ch))*8+min(7,int(c['cx']//cw))+1
    if k not in main: main[k]=c; c['cell']=k
assert len(main)==48, len(main)
def gap(a,b):
    ax0,ay0,ax1,ay1=a['bb']; bx0,by0,bx1,by1=b['bb']
    dx=max(0,bx0-ax1,ax0-bx1); dy=max(0,by0-ay1,ay0-by1); return (dx*dx+dy*dy)**.5
groups={k:[c] for k,c in main.items()}
for c in comps:
    if 'cell' in c: continue
    k=min(main,key=lambda k:gap(c,main[k])); groups[k].append(c)
    if len(groups[k])>1: print(f'piece {c["n"]}px @({c["cx"]:.0f},{c["cy"]:.0f}) -> cell {k} (gap {gap(c,main[k]):.1f})')
OUT=128; FIT=116
sheet=Image.new('RGBA',(8*OUT,6*OUT),(0,0,0,0))
for k,parts in groups.items():
    ids={p['id'] for p in parts}
    x0=min(p['bb'][0] for p in parts)-2; y0=min(p['bb'][1] for p in parts)-2
    x1=max(p['bb'][2] for p in parts)+3; y1=max(p['bb'][3] for p in parts)+3
    x0,y0=max(0,x0),max(0,y0); x1,y1=min(W,x1),min(H,y1)
    obj=Image.new('RGBA',(x1-x0,y1-y0),(0,0,0,0)); o=obj.load()
    for y in range(y0,y1):
        for x in range(x0,x1):
            r,g,b,a=src[x,y]
            if lab[y*W+x] in ids: o[x-x0,y-y0]=(r,g,b,255 if a>=245 else a)
            elif 12<=a<40:  # keep soft antialias edge only if it touches this group
                if any(0<=x+dx<W and 0<=y+dy<H and lab[(y+dy)*W+x+dx] in ids for dx,dy in ((1,0),(-1,0),(0,1),(0,-1))):
                    o[x-x0,y-y0]=(r,g,b,a)
    obj=obj.crop(obj.getbbox()); ow,oh=obj.size; s=FIT/max(ow,oh)
    obj=obj.resize((round(ow*s),round(oh*s)),Image.LANCZOS)
    r_,c_=(k-1)//8,(k-1)%8
    sheet.alpha_composite(obj,(c_*OUT+(OUT-obj.width)//2, r_*OUT+(OUT-obj.height)//2))
sheet.save('src/assets/ingredients.webp', quality=90, method=6)
print('wrote src/assets/ingredients.webp')
