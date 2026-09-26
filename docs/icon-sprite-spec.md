# Ingredient & equipment icon sprite sheet: spec

Brief for an image-generation model to produce **one sprite sheet with 48 icons**. These replace the 70 hand-coded SVG icons.

## 1. Why 48 and not 70

The app has 70 ids (51 ingredients + 19 equipment). Many are near-duplicates that the user tells apart by the text label, not the picture: whole vs. 2% milk, kettle vs. gooseneck kettle, and so on. Those ids share one icon, so the sheet only needs 48. The id → cell mapping is in §5, and the app keeps showing the text label under every icon.

## 2. Sheet format

| Property | Value |
|---|---|
| Canvas | **2048 × 1536 px** |
| Grid | **8 columns × 6 rows**, each cell **256 × 256 px**, no gutters |
| Background | **Transparent** (PNG with alpha). If the model can't do alpha, use flat pure **#FF00FF** so it can be keyed out. Never use a colour that appears in the palette. |
| Safe area | Keep each object inside the centred **208 × 208 px** of its cell (24 px margin on every side). Nothing may cross a cell boundary. |
| Object size | Every object's bounding box fills **~75–85 % of the safe area** in its longest dimension. Small things (a clove, an egg) are drawn big; big things (an espresso machine) are drawn small, so every cell looks equally "full". |
| Grid lines / labels | **None.** No borders, numbers, captions or text anywhere. |
| Order | Row-major, left → right, top → bottom, exactly as numbered in §4. |

## 3. Visual style

Match the app's existing hand-drawn cup illustrations: a warm café look with bold outlines and flat colours.

- **Rendering:** flat, vector-like illustration, like a sticker or enamel pin. **No** gradients, photographic texture, drop shadows, glow or 3D rendering.
- **Outline:** one continuous dark-brown outline **#3A2A20**, about **10–12 px** at 256 px, with round caps and joins, the same weight on every icon. Interior detail lines (labels, facets, seams) are thinner, ~5–6 px.
- **Fills:** 2–3 flat colours per object from the palette below, plus at most **one** small cream highlight (#FFF8EE) on the top-left of glossy objects (glass, metal, ceramic).
- **View:** straight-on or slight three-quarter front view, as if the object sits on a table. Light comes from the top-left.
- **Detail level:** readable at **16 px** and good-looking at **42 px**. Show the silhouette feature that identifies the object (see "Must read as" in §4) and leave out the rest. No tiny text; a label is a plain rectangle, never lettering.
- **Consistency:** the 48 icons must look like one set drawn by one hand, with the same outline weight, palette, perspective and level of detail.
- **Legibility on both themes:** icons sit on a light circular "plate" (#FBF7F1 in light mode, #E8DCCB in dark mode). Make sure white or cream objects (milk, sugar, egg) still have their full dark outline, so they don't vanish into the plate.

### Palette (only these colours, plus #3A2A20 for outlines)

| Name | Hex | Use |
|---|---|---|
| Espresso | #3A2218 | dark coffee, black plastic, bakelite handles |
| Coffee | #6F4E37 | beans, grounds, brewed coffee |
| Bean | #7B4A2D | lighter bean tone |
| Crema / caramel | #C98A4B | caramel, crema, amber accents |
| Cream | #F7EEDF | cream, foam, paper |
| Milk / white | #FFFFFF | milk, sugar, porcelain |
| Oat | #E8DCCB | cardboard, oat, neutral packaging |
| Chocolate | #4A2A1C | chocolate |
| Honey | #E0A43A | honey, maple syrup |
| Lemon | #F2D24B | lemon, butter, yolk |
| Orange | #E8923A | orange, pumpkin |
| Mint | #7A9B5C | leaves, herbs |
| Cherry red | #C2412D | chili, accent caps |
| Glass / ice | #D6E7EE | glass, ice, water |
| Metal | #B9B2A8 | steel, aluminium |
| Wood | #A87A4F | wood, cinnamon, paper filters (kraft) |

## 4. The 48 icons (row-major)

Each entry gives the subject, what it **must read as** at small size, and the colours to use.

### Row 1: Coffee & dairy
1. **Whole coffee beans:** three plump beans in a little heap, each with the centre crease. *Must read as:* coffee beans. Coffee + Bean.
2. **Ground coffee:** an open kraft paper bag with a mound of dark grounds visible at the top. *Must read as:* a bag of ground coffee. Oat/Wood bag, Coffee grounds.
3. **Dark roast:** a small scoop or spoon heaped with very dark, glossy beans (one cream highlight dot per bean). *Must read as:* extra-dark beans, clearly darker than icon 1. Espresso + highlight.
4. **Instant coffee:** a short squat glass jar with a brown lid and a plain label band, dark granules inside. Espresso lid, Glass, Coffee.
5. **Cold brew concentrate:** a tall glass bottle with a swing-top stopper, filled with dark coffee, a small ice cube floating near the top. Glass, Espresso, Metal.
6. **Milk (dairy):** a classic gable-top milk carton, white, with an Oat stripe and a simple milk-splash shape on the front. White, Oat.
7. **Plant milk:** a gable-top carton like #6, but Oat-coloured with a Mint leaf / oat-sprig mark on the front, so it is clearly different from #6 at a glance. Oat, Mint.
8. **Cream:** a small white ceramic jug (creamer) with a spout, thick cream visible at the rim. White, Cream.

### Row 2: Dairy & sweeteners
9. **Whipped cream:** a tall swirled dollop with a pointed tip, like piped cream. White + Cream shading.
10. **Canned milk:** a short tin can with a plain Crema label band and a pull ring on top. Metal, Crema.
11. **Vanilla ice cream:** one round scoop in a small paper cup or on a cone, with a tiny wafer. Cream, Wood.
12. **Butter:** a rectangular block of butter, one corner sliced off, on a small paper wrapper. Lemon, White.
13. **Egg:** one whole egg lying next to a cracked half-shell holding a round yolk. White, Lemon.
14. **Sugar:** three stacked white sugar cubes with crisp edges. White.
15. **Brown sugar / piloncillo:** a small cone of piloncillo next to two brown sugar lumps. Crema, Bean.
16. **Honey / maple:** a round honey pot with a wooden dipper resting in it, a drip running down the side. Honey, Wood.

### Row 3: Sweeteners & spices
17. **Syrup:** a tall syrup bottle with a café pump top (like a coffee-shop syrup pump). Glass bottle, Crema liquid, Espresso pump.
18. **Caramel sauce:** a squeeze bottle with a pointed nozzle and a caramel drip on the nozzle. Crema, White cap.
19. **Chocolate:** a chocolate bar with two squares broken off, a small drip of sauce on top. Chocolate.
20. **Cocoa powder:** a round tin with the lid leaning against it, a mound of cocoa powder visible. Metal/Oat tin, Chocolate powder.
21. **Cinnamon:** two rolled cinnamon sticks crossed, with the spiral visible on the ends. Wood.
22. **Whole spices:** one star anise (8 points, the clear hero), with two green cardamom pods and two cloves beside it. Wood/Bean star, Mint pods, Espresso cloves.
23. **Cayenne:** one curved red chili pepper with a green stem. Cherry red, Mint.
24. **Pumpkin:** a small squat ribbed pumpkin with a curly stem and one leaf. Orange, Mint, Wood.

### Row 4: Flavours, spirits, basics
25. **Vanilla:** a small brown extract bottle with two dark vanilla pods lying in front of it. Bean bottle, Espresso pods.
26. **Citrus:** a half orange and a half lemon side by side, cut faces showing segments. Orange, Lemon, White pith.
27. **Salt:** a classic glass salt shaker with a metal top and a few grains beside it. Glass, Metal, White.
28. **Mint:** a sprig of mint with 4–5 serrated leaves. Mint.
29. **Spirit bottle:** a squat whiskey-style bottle with a cork, amber liquid, and a plain label. Honey/Crema liquid, Wood cork, Oat label.
30. **Liqueur:** a tall slim liqueur bottle with dark coffee-coloured liquid and a Lemon-gold label band. Espresso, Lemon.
31. **Water:** a clear drinking glass of water with one droplet above it. Glass.
32. **Ice:** three translucent ice cubes stacked at angles, with cream highlights. Glass/Ice.

### Row 5: Basics & equipment
33. **Sparkling / tonic:** a glass with rising bubbles and a lemon wedge on the rim. Glass, White bubbles, Lemon.
34. **Espresso machine:** a compact home machine seen from the front with a portafilter handle sticking out, a drip tray and one small cup under the group head. Metal body, Espresso handle, White cup. *Must read as:* espresso machine, not a microwave.
35. **Moka pot:** a Bialetti-style **eight-sided hourglass** pot (narrow waist where the two halves screw together), an angled spout pointing up-left, a **black bakelite handle** on the right, and a small lid knob. Metal with one lighter facet, Espresso handle. *Must read as:* moka pot. **Not** a straight-sided jug.
36. **French press:** a glass cylinder in a metal frame, plunger rod and knob on top, coffee inside. Glass, Metal, Coffee.
37. **Pour-over dripper:** a cone dripper with ridges and a paper filter visible at the rim, sitting on a mug. Also used for Chemex. White ceramic, Oat/Wood filter.
38. **AeroPress:** two nested plastic cylinders (plunger partly inserted) standing on a mug, with a hexagonal cap / paddle hint. Glass-grey plastic, Espresso rubber seal.
39. **Drip coffee maker:** a countertop drip machine with a glass carafe of coffee on the warming plate. Espresso body, Glass carafe, Coffee.
40. **Vietnamese phin:** a small metal phin filter with its lid, sitting on top of a short glass that has a pale layer of condensed milk at the bottom. Metal, Glass, Cream, Coffee.

### Row 6: Equipment
41. **Cezve / ibrik:** a small flared copper-coloured pot with a long straight handle, foam at the top. Crema/Orange copper, Wood handle, Coffee foam.
42. **Frother / whisk:** a balloon whisk crossed with a slim handheld milk-frother wand. Metal, Espresso handle.
43. **Blender:** a countertop blender with a jug on a base, a pale frappé inside. Glass jug, Espresso base, Cream contents.
44. **Coffee grinder:** a classic hand grinder: box or cylinder body, crank handle on top with a wooden knob. Wood/Metal, Espresso knob.
45. **Kettle:** a **gooseneck** pour-over kettle (long thin curved spout). Also used for the regular kettle. Metal, Espresso handle.
46. **Saucepan:** a small saucepan with a long handle, seen at a slight angle, with liquid inside. Metal, Espresso handle, Coffee liquid.
47. **Shaker / jar:** a mason jar with a metal screw lid next to (or overlapping) a small cocktail shaker. Glass, Metal.
48. **Kitchen scale:** a flat digital kitchen scale with a blank rectangular display (no digits) and a small cup on it. White/Metal body, Espresso display.

## 5. Id → cell mapping (for the app)

Cells are 1-indexed, row-major. Ids listed on one line share that cell.

| Cell | Ids |
|---|---|
| 1 | whole-beans |
| 2 | ground-coffee |
| 3 | dark-roast, espresso-beans |
| 4 | instant-coffee |
| 5 | cold-brew-concentrate |
| 6 | whole-milk, two-percent-milk |
| 7 | oat-milk, almond-milk, coconut-milk |
| 8 | heavy-cream, half-and-half |
| 9 | whipped-cream |
| 10 | sweetened-condensed-milk, evaporated-milk |
| 11 | vanilla-ice-cream |
| 12 | butter |
| 13 | egg |
| 14 | sugar |
| 15 | brown-sugar, piloncillo |
| 16 | honey, maple-syrup |
| 17 | simple-syrup, vanilla-syrup |
| 18 | caramel-sauce |
| 19 | chocolate-sauce, dark-chocolate |
| 20 | cocoa-powder |
| 21 | cinnamon |
| 22 | star-anise, cardamom, cloves, nutmeg |
| 23 | cayenne |
| 24 | pumpkin-puree, pumpkin-pie-spice |
| 25 | vanilla-extract |
| 26 | orange, lemon |
| 27 | salt |
| 28 | mint |
| 29 | whiskey, vodka |
| 30 | coffee-liqueur, licor-43 |
| 31 | water |
| 32 | ice |
| 33 | tonic-water, sparkling-water |
| 34 | espresso-machine |
| 35 | moka-pot |
| 36 | french-press |
| 37 | pour-over, chemex |
| 38 | aeropress |
| 39 | drip-machine |
| 40 | phin-filter |
| 41 | cezve |
| 42 | milk-frother, whisk |
| 43 | blender |
| 44 | grinder |
| 45 | kettle, gooseneck-kettle |
| 46 | saucepan |
| 47 | cocktail-shaker, large-jar |
| 48 | scale |

That covers all 70 ids. `npm test` should assert that every id in `src/data/ingredients.json` maps to exactly one cell 1–48.

## 6. Acceptance checklist (review before integrating)

- [ ] 2048 × 1536, 8 × 6 grid, transparent (or #FF00FF) background, no grid lines or text.
- [ ] Every object is inside its cell's 208 px safe area and roughly the same visual size as its neighbours.
- [ ] Outline colour and weight are the same across all 48. Only palette colours are used. No gradients or shadows.
- [ ] Downscaled to **42 px**, each icon is recognisable without its label. Check especially: 6 vs 7 (dairy vs plant carton), 1 vs 3 (beans vs dark roast), 35 moka pot, 34 espresso machine, 40 phin, 41 cezve.
- [ ] Downscaled to **16 px**, the silhouettes are still distinct: no mush, no hairline detail.
- [ ] Cells are in the exact order of §4. Spot-check cells 1, 8, 16, 24, 33, 40, 48.
- [ ] White and cream objects keep a full dark outline and are visible on both #FBF7F1 and #E8DCCB plates.

If a generation run gets some cells wrong, regenerate **just that row** as a 2048 × 256 strip using the same prompt and the same style reference, then paste the row into place.

## 7. Integration (done)

- Source sheet: `docs/icon-sheet-source.png`. `scripts/slice-icon-sheet.py` cuts it into clean 128 px cells, 8 × 6 = 1024 × 768, and writes `src/assets/ingredients.webp`. The generator didn't keep objects inside their cells, so the script finds each object by its outline and snaps small pieces (drips, grains, droplets) onto the nearest one.
- `src/lib/iconCells.ts` holds the id → cell table from §5. `ItemIcon` renders the matching cell of the sprite as a CSS background.
- `src/lib/icons.test.ts` checks that every id is mapped and that all 48 cells are used.

## 8. Ready-to-paste prompt

> Create a single PNG sprite sheet, 2048×1536 px, transparent background, laid out as an exact 8-column × 6-row grid of 256×256 cells with no gutters, no grid lines, no text, no labels. Each cell contains one centred object that fills about 80% of a 208 px safe area and never crosses its cell edge. Style: cohesive flat vector sticker illustrations for a warm coffee-house recipe app — bold continuous dark-brown outline (#3A2A20, ~11 px, round joins), 2–3 flat fills per object from this palette only: #3A2218, #6F4E37, #7B4A2D, #C98A4B, #F7EEDF, #FFFFFF, #E8DCCB, #4A2A1C, #E0A43A, #F2D24B, #E8923A, #7A9B5C, #C2412D, #D6E7EE, #B9B2A8, #A87A4F; at most one small cream highlight (#FFF8EE) top-left; no gradients, no shadows, no texture; slight three-quarter front view; light from top-left; readable at 16 px. Objects, left→right, top→bottom:
> Row 1: heap of three coffee beans; open kraft bag of ground coffee; scoop of very dark glossy beans; squat instant-coffee jar with brown lid; swing-top glass bottle of cold brew with an ice cube; white gable-top milk carton; oat-coloured gable-top plant-milk carton with a green leaf mark; small white cream jug.
> Row 2: swirled whipped-cream dollop; tin can with caramel label and pull ring; vanilla ice-cream scoop in a paper cup; block of butter with a corner sliced; whole egg beside a cracked shell with yolk; three stacked sugar cubes; piloncillo cone with two brown sugar lumps; honey pot with wooden dipper and drip.
> Row 3: café syrup bottle with pump top; caramel squeeze bottle with drip; chocolate bar with broken squares; cocoa tin with lid leaning on it; two crossed cinnamon sticks; star anise with cardamom pods and cloves; curved red chili; small ribbed pumpkin with stem and leaf.
> Row 4: vanilla extract bottle with two vanilla pods; half orange and half lemon; glass salt shaker; mint sprig; squat whiskey bottle with cork and amber liquid; tall slim coffee-liqueur bottle with gold label; glass of water with a droplet; three stacked ice cubes.
> Row 5: glass of sparkling water with bubbles and a lemon wedge; compact home espresso machine with portafilter and small cup; Bialetti-style eight-sided hourglass moka pot with angled spout and black handle; glass French press with metal frame and plunger; ceramic cone pour-over dripper with paper filter on a mug; AeroPress on a mug; drip coffee maker with glass carafe; Vietnamese phin filter on a short glass with condensed milk layer.
> Row 6: copper cezve with long handle and foam; balloon whisk crossed with a handheld milk frother; countertop blender with pale frappé; hand coffee grinder with crank; gooseneck pour-over kettle; small saucepan with long handle; mason jar beside a cocktail shaker; flat digital kitchen scale with blank display and a small cup.
