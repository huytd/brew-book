# Drink illustration sprite sheets: spec

Brief for an image-generation model to draw **one illustration per recipe** (59 drinks, plus 1 fallback = 60). These replace the simple SVG cups on:

| Where | Component | Display size (CSS px) |
|---|---|---|
| Browse recipe cards | `RecipeCard` | 104 (mobile) · 128 (desktop) |
| What to Brew results | `WhatToBrew` match list | 64 |
| Recipe detail hero | `RecipeDetail` | 180 (mobile) · 220 (desktop) |

On a 2× phone the hero needs ~360–440 real pixels, so every drink should be drawn at **≥ 300 px**.

## 1. Deliverable: three sheets of 20

One 60-item sheet would squeeze each drink to ~145 px at typical generator resolutions, and models lose track of order with that many items. So generate **3 sheets**, each a **5 × 4 grid** (20 cells):

| Sheet | Cells | Contents |
|---|---|---|
| A | 1–20 | espresso drinks, milk drinks, first 2 brew methods |
| B | 21–40 | brew methods, iced, first 3 international |
| C | 41–60 | international, sweet, cocktails, fallback |

| Property | Value |
|---|---|
| Canvas | **1600 × 1280 px** per sheet (320 px cells). Larger is fine; keep the 5:4 ratio. |
| Grid | 5 columns × 4 rows, no gutters, row-major (left → right, top → bottom). |
| Background | **Transparent** PNG. If alpha isn't supported, flat pure **#FF00FF**. |
| Safe area | Centred **260 × 260 px** per cell (30 px margin). Nothing may cross into a neighbouring cell. Keep **steam inside the safe area** too. |
| Size & baseline | Every drink sits on the same invisible table line near the bottom of its safe area. The tallest element (glass, pot, or whipped-cream peak) reaches ~85 % of the safe-area height. Small drinks (espresso, ristretto) are drawn larger, not tiny, so cells look equally full. |
| Labels | **None.** No text, numbers, logos, grid lines, or tables/backgrounds under the drinks. |

## 2. Style

Same set as the ingredient icons (`docs/icon-sheet-source.png`). Put that image in as a **style reference** if the model accepts one.

- **Rendering:** flat vector sticker illustration, warm coffee-house mood. Bold continuous dark-brown outline **#3A2A20** (~12 px at 320 px), round joins, thinner interior lines. Flat fills plus one soft highlight on glass and ceramic. **No** gradients, shadows, photorealism or 3D.
- **View:** three-quarter view from slightly **above** (~20°), so the top surface of each drink shows. Foam, latte art, crema, cream and garnish are how people tell these drinks apart. Light from top-left.
- **Show the drink, not just the cup:** glass vessels show their **layers** (condensed milk, espresso band, foam). Opaque cups show the **surface** (crema colour, foam dome, latte art).
- **Steam:** two soft curly wisps on hot drinks only. No steam on iced drinks; show ice cubes and/or condensation dots instead.
- **Props:** at most **one** small prop per drink, only when it identifies the drink (lemon peel, cinnamon stick, coffee beans). Nothing else on the "table".
- **Palette:** the same palette as the ingredient sheet:
  #3A2218 espresso · #6F4E37 coffee · #7B4A2D bean · #C98A4B crema/caramel · #F7EEDF cream/foam · #FFFFFF porcelain/milk · #E8DCCB oat/latte-light · #A8744A latte · #4A2A1C chocolate · #E0A43A honey/amber · #F2D24B lemon/egg · #E8923A orange/pumpkin · #7A9B5C mint · #C2412D chili/cherry · #D6E7EE glass/ice · #B9B2A8 metal · #A87A4F wood · #B5653A terracotta/copper.
- **Coffee colour logic:** black coffee is #3A2218, crema and caramel are #C98A4B, milky drinks run from #A8744A (strong) to #E8DCCB (very milky). Keep this consistent across the set so the strength of a drink reads at a glance.
- **Cups:** plain white porcelain, clear glass or the listed material. No brand marks, no patterns except where noted (Turkish cup).

## 3. The 60 drinks

**Similar-drink groups must be distinguishable at 64 px.** Each entry lists the **vessel** and the **key visual** that sets it apart. Keep vessels exactly as described, because the vessel is the main difference.

### Sheet A (cells 1–20)

| # | Recipe id | Drink | Vessel | Key visual (must read) |
|---|---|---|---|---|
| 1 | affogato | Affogato | small glass coupe / dessert bowl | round scoop of vanilla ice cream with dark espresso pooling and running down it; tiny spoon |
| 2 | americano | Caffè Americano | **tall** white ceramic mug | black coffee, thin broken pale crema ring |
| 3 | espresso | Espresso (Double) | white demitasse on saucer | thick **hazelnut crema** with a darker tiger-stripe fleck; little spoon on saucer |
| 4 | espresso-con-panna | Espresso con Panna | clear glass demitasse on saucer | espresso crowned with a **piped whipped-cream swirl** |
| 5 | espresso-romano | Espresso Romano | white demitasse on saucer | a curled **yellow lemon-peel twist** on the saucer |
| 6 | long-black | Long Black | **clear glass** cup with handle | black coffee to the top with a **thick unbroken crema** layer visible through the glass |
| 7 | lungo | Lungo | **taller** narrow white espresso cup (lungo cup) on saucer | paler, thinner crema; cup fuller than #3 |
| 8 | ristretto | Ristretto | white demitasse on saucer, **cup mostly empty** | only a shallow, very dark syrupy pool with dark crema at the bottom |
| 9 | cafe-au-lait | Café au Lait | **wide handleless French bowl** | light tan milky coffee, smooth surface |
| 10 | breve | Caffè Breve | small white cup on saucer + tiny **cream jug** beside | very thick, glossy **ivory** foam, paler than a cappuccino |
| 11 | latte | Caffè Latte | **tall clear glass mug** with handle | light-brown milky coffee, **rosetta** latte art on top |
| 12 | mocha | Caffè Mocha | white mug | foam with **chocolate-sauce drizzle** and chocolate shavings |
| 13 | cappuccino | Cappuccino | classic wide white cappuccino cup & saucer | tall domed **foam cap** dusted with cocoa |
| 14 | cortado | Cortado | small straight **Gibraltar glass** (no handle) | lower half dark espresso, upper half warm milk, thin foam line |
| 15 | macchiato | Espresso Macchiato | white demitasse on saucer | crema with **one small white dot of foam** in the centre |
| 16 | flat-white | Flat White | medium white **tulip-shaped** cup & saucer | glossy flat microfoam with a **tulip** latte-art pattern, darker ring of crema at the rim |
| 17 | latte-macchiato | Latte Macchiato | **tall clear stemless glass** + long spoon | three crisp layers: white milk bottom · **espresso band** · white foam top |
| 18 | piccolo | Piccolo Latte | **tiny clear glass** (≈ ⅓ the height of #11) | milky coffee with a small **heart** latte art |
| 19 | aeropress-inverted | AeroPress (Inverted) | an **upside-down AeroPress** (plunger at the bottom, chamber up) full of coffee | a mug beside it; the flip is the point |
| 20 | aeropress | AeroPress (Standard) | AeroPress standing **on top of** a mug, plunger half pressed | coffee visible in the chamber |

### Sheet B (cells 21–40)

| # | Recipe id | Drink | Vessel | Key visual |
|---|---|---|---|---|
| 21 | drip-coffee-maker | Better Drip Coffee | **glass carafe** with black handle next to a plain mug | carafe half full of black coffee |
| 22 | chemex | Chemex | **Chemex** hourglass with wooden collar and leather tie | folded paper filter at top, coffee in the bottom bulb |
| 23 | cold-brew | Cold Brew Concentrate | **big mason jar** of very dark coffee | a small glass of cold brew on ice beside it |
| 24 | cowboy-coffee | Cowboy Coffee | **enamel camp coffee pot** (dark with white speckles) + tin camping mug | tiny campfire flame under the pot |
| 25 | french-press | French Press | **French press** (glass, metal frame, plunger pressed down) | black coffee inside, grounds at bottom |
| 26 | japanese-iced-pour-over | Japanese Iced Coffee | ceramic **cone dripper** on a glass server **full of ice** | coffee dripping onto the ice |
| 27 | moka-pot | Moka Pot | **Bialetti-style eight-sided moka pot** next to a small demitasse of coffee | coffee bubbling out of the spout |
| 28 | v60-pour-over | V60 Pour-Over | ridged **V60 cone** with paper filter on a clear glass server | server half full of **amber-brown clear** coffee |
| 29 | blended-coffee-frappe | Blended Coffee Frappé | clear **domed plastic cup** with straw | pale blended coffee, **whipped-cream dome**, caramel drizzle |
| 30 | brown-sugar-shaken-espresso | Brown Sugar Shaken Espresso | tall clear glass with ice | **foamy tan espresso layer on top**, creamy oat milk swirling below; cinnamon dust |
| 31 | dalgona-coffee | Dalgona Coffee | short clear glass | white milk with a **thick whipped toffee-coloured cloud** sitting on top |
| 32 | espresso-tonic | Espresso Tonic | tall highball glass with ice | clear bubbly **tonic below**, dark **espresso floating on top**, orange slice |
| 33 | greek-frappe | Greek Frappé | tall clear glass with straw and ice | **thick light-brown foam** filling the upper half |
| 34 | iced-americano | Iced Americano | tall clear glass with straw | **black** coffee with ice cubes, condensation dots |
| 35 | iced-latte | Iced Latte | tall clear glass with ice | white milk with espresso **cascading down** from the top |
| 36 | iced-mocha | Iced Mocha | tall clear glass with ice | **chocolate drizzle down the inside walls**, whipped cream top |
| 37 | sweet-cream-cold-brew | Vanilla Sweet Cream Cold Brew | tall clear glass with ice | very dark cold brew with a **white cream layer billowing down** from the top |
| 38 | bulletproof-coffee | Butter Coffee | white mug | frothy **creamy tan** latte-like top; a **pat of butter** beside |
| 39 | vietnamese-coconut-coffee | Cà Phê Cốt Dừa | short clear glass | **white coconut slush** filling it, dark coffee poured over the top; half coconut beside |
| 40 | vietnamese-iced-coffee | Cà Phê Sữa Đá | clear glass with **metal phin filter** on top | **white condensed-milk layer** at the bottom, dark coffee above, ice |

### Sheet C (cells 41–60)

| # | Recipe id | Drink | Vessel | Key visual |
|---|---|---|---|---|
| 41 | vietnamese-egg-coffee | Cà Phê Trứng (Egg Coffee) | small white cup **sitting in a bowl of hot water** | thick **custard-yellow egg foam** top, cocoa dusting |
| 42 | cafe-bombon | Café Bombón | small clear glass | two crisp layers: **white condensed milk bottom**, black espresso top |
| 43 | cafe-con-leche | Café con Leche | clear **glass tumbler** (no handle) on saucer | even tan coffee-with-milk, a sugar cube on the saucer |
| 44 | cafe-cubano | Café Cubano | **three tiny white cups** on a small tray | each with a **pale sweet foam** (espumita) top |
| 45 | cafe-de-olla | Café de Olla | **terracotta clay mug** (jarrito) | black coffee, a **cinnamon stick** in the mug |
| 46 | einspanner | Einspänner (Vienna Coffee) | **clear glass with handle** | black coffee under a **tall mound of whipped cream** reaching above the rim, cocoa dust |
| 47 | mazagran | Mazagran | tall clear glass with ice | dark amber iced coffee, **lemon wheel** on the rim and a mint sprig |
| 48 | qahwa | Qahwa (Arabic Coffee) | brass **dallah** (long curved beak spout) + small handleless **finjan** cup | pale golden coffee in the cup; one date beside |
| 49 | swedish-egg-coffee | Swedish Egg Coffee | **enamel coffee pot** + white mug | mug of **clear, light amber** coffee; a whole egg beside |
| 50 | turkish-coffee | Turkish Coffee | small **patterned** cup (simple red or gold band) + copper **cezve** beside | **thick velvety foam** on top; one cube of Turkish delight |
| 51 | caramel-macchiato | Caramel Macchiato | tall clear glass | milk with espresso band near the top, **caramel crosshatch** on the foam |
| 52 | honey-cinnamon-latte | Honey Cinnamon Latte | white mug | latte art, **honey dipper** resting on the rim, cinnamon dusting |
| 53 | maple-latte | Maple Cinnamon Latte | white mug | latte with a **maple-leaf** shape in the foam; small maple syrup bottle beside |
| 54 | mexican-mocha | Mexican Mocha | **terracotta** mug | whipped cream with cinnamon, a small **red chili** beside |
| 55 | pumpkin-spice-latte | Pumpkin Spice Latte | white mug | whipped cream dusted with spice; a **mini pumpkin** beside |
| 56 | vanilla-latte | Vanilla Latte | clear glass mug with handle | light latte, heart art; a **vanilla pod** beside |
| 57 | carajillo | Carajillo | **rocks glass** with ice | frothy dark-tan shaken drink, three coffee beans on the foam |
| 58 | espresso-martini | Espresso Martini | **martini / coupe glass** (stemmed) | dark drink with a creamy tan foam top and **three coffee beans** |
| 59 | irish-coffee | Irish Coffee | **stemmed Irish-coffee glass** (tulip, with handle) | dark coffee with a thick **white cream collar** floating on top |
| 60 | *(fallback)* | Coffee | plain white mug | black coffee with steam; used for any future recipe without art |

## 4. Acceptance checklist

- [ ] Three sheets, each 5 × 4, transparent (or #FF00FF), no text or grid lines.
- [ ] Order matches §3 exactly. Spot-check cells 1, 8, 17, 20 · 21, 26, 33, 40 · 41, 50, 58, 60.
- [ ] Each drink sits within its cell's safe area (steam included), on a common baseline, at similar visual size.
- [ ] At **64 px**, these groups are all distinguishable:
  - espresso #3 vs lungo #7 vs ristretto #8 vs macchiato #15
  - americano #2 vs long black #6
  - latte #11 vs vanilla latte #56 vs flat white #16 vs piccolo #18
  - iced americano #34 vs iced latte #35 vs iced mocha #36 vs cold brew #37
  - AeroPress #19 vs #20
- [ ] Hot drinks have steam; iced drinks have none.
- [ ] Style matches `docs/icon-sheet-source.png`: same outline weight, flat fills, palette.

If one sheet has errors, regenerate **only that sheet**, or the single row as a 1600 × 320 strip with the same prompt.

## 5. Integration plan

- Save the sheets as `docs/drink-sheet-a.png`, `-b.png`, `-c.png`.
- Generalise `scripts/slice-icon-sheet.py` (columns, rows, output cell size as arguments). Slice the three sheets into one **10 × 6 grid of 192 px cells** → `src/assets/drinks.webp` (1920 × 1152, ~300–400 KB).
- Add `src/lib/drinkCells.ts` (`recipe id → cell`, taken from §3) and a `DrinkArt` component like `ItemIcon`. Use it in `RecipeCard`, the What to Brew match list and the recipe hero. Fall back to cell 60 for unknown ids.
- Add a test that every recipe id in `src/data/recipes/*.json` has a cell.
- Keep `Cup.tsx` until the art is approved, then remove it.

## 6. Ready-to-paste prompts

Use the shared style block with **each** sheet's list. Attach `docs/icon-sheet-source.png` as a style reference if the model supports image input.

**Shared style block**

> Create a PNG sprite sheet, 1600×1280 px, transparent background, laid out as an exact 5-column × 4-row grid of 320×320 cells with no gutters, no grid lines, no text, no labels, no table or backdrop. Each cell holds one coffee drink, centred inside a 260 px safe area, all resting on the same invisible table line near the bottom of the safe area and drawn at similar visual size (small cups drawn larger). Style: cohesive flat vector sticker illustrations for a warm coffee-house recipe app, matching the attached ingredient icons — bold continuous dark-brown outline (#3A2A20, ~12 px, round joins), flat fills, one soft highlight on glass/ceramic, no gradients, no shadows, no photorealism. Three-quarter view from slightly above so the drink's top surface (crema, foam, latte art, cream) is visible; glass vessels show their layers. Hot drinks have two small curly steam wisps kept inside the cell; iced drinks have ice cubes and no steam. Plain white porcelain or clear glass unless stated, no logos. Palette only: #3A2218, #6F4E37, #7B4A2D, #C98A4B, #F7EEDF, #FFFFFF, #E8DCCB, #A8744A, #4A2A1C, #E0A43A, #F2D24B, #E8923A, #7A9B5C, #C2412D, #D6E7EE, #B9B2A8, #A87A4F, #B5653A. Drinks, left→right, top→bottom:

**Sheet A list**

> Row 1: affogato — vanilla ice-cream scoop in a small glass coupe with espresso running over it; americano — tall white mug of black coffee with thin broken crema; double espresso — white demitasse on saucer with thick hazelnut crema and a spoon; espresso con panna — glass demitasse with a piped whipped-cream swirl; espresso romano — white demitasse on saucer with a curled yellow lemon-peel twist.
> Row 2: long black — clear glass cup with handle, black coffee with a thick unbroken crema layer; lungo — taller narrow white espresso cup on saucer, paler thin crema; ristretto — white demitasse on saucer, mostly empty, a shallow very dark syrupy pool; café au lait — wide handleless French bowl of light tan milky coffee; caffè breve — small white cup with very thick glossy ivory foam, tiny cream jug beside it.
> Row 3: caffè latte — tall clear glass mug, light-brown latte with rosetta latte art; caffè mocha — white mug with chocolate-sauce drizzle and shavings on foam; cappuccino — wide white cup and saucer with a tall domed foam cap dusted with cocoa; cortado — small straight Gibraltar glass, half espresso half warm milk; espresso macchiato — white demitasse with one small white dot of foam on the crema.
> Row 4: flat white — white tulip cup and saucer with glossy tulip latte art; latte macchiato — tall clear glass with three layers (milk, espresso band, foam) and a long spoon; piccolo latte — tiny clear glass with heart latte art; AeroPress inverted — an upside-down AeroPress (plunger at the bottom) full of coffee with a mug beside it; AeroPress — AeroPress standing on a mug, plunger half pressed.

**Sheet B list**

> Row 1: glass drip-coffee carafe with black handle, half full, next to a plain mug; Chemex hourglass brewer with wooden collar and paper filter, coffee in the bottom; big mason jar of very dark cold brew with a small glass of cold brew on ice beside it; dark speckled enamel camp coffee pot over a tiny campfire flame with a tin mug; French press with plunger pressed down, black coffee inside.
> Row 2: ceramic cone dripper on a glass server full of ice with coffee dripping onto it; eight-sided Bialetti moka pot beside a small demitasse, coffee bubbling at the spout; ridged V60 cone with paper filter on a clear server of amber-brown coffee; blended coffee frappé in a clear domed cup with straw, whipped-cream dome and caramel drizzle; brown sugar shaken espresso — tall glass with ice, foamy tan espresso on top of swirling oat milk, cinnamon dust.
> Row 3: dalgona coffee — short glass of white milk topped with a thick whipped toffee-coloured cloud; espresso tonic — tall highball with ice, clear bubbly tonic below and dark espresso floating on top, orange slice; Greek frappé — tall glass with straw, ice and thick light-brown foam filling the upper half; iced americano — tall glass of black coffee with ice, straw and condensation dots; iced latte — tall glass of white milk and ice with espresso cascading down from the top.
> Row 4: iced mocha — tall glass with chocolate drizzle down the inside walls and whipped cream; vanilla sweet cream cold brew — tall glass of very dark cold brew with a white cream layer billowing down from the top, ice; butter coffee — white mug with frothy creamy tan top and a pat of butter beside; Vietnamese coconut coffee — short glass filled with white coconut slush, dark coffee poured on top, half coconut beside; Vietnamese iced coffee — clear glass with a metal phin filter on top, white condensed-milk layer at the bottom, dark coffee above, ice.

**Sheet C list**

> Row 1: Vietnamese egg coffee — small white cup sitting in a bowl of hot water, thick custard-yellow egg foam dusted with cocoa; café bombón — small clear glass with a white condensed-milk layer below black espresso; café con leche — clear handleless glass tumbler of tan coffee with milk on a saucer with a sugar cube; café cubano — three tiny white cups on a small tray, each with pale sweet foam; café de olla — terracotta clay mug of black coffee with a cinnamon stick.
> Row 2: einspänner — clear glass with handle, black coffee under a tall mound of whipped cream above the rim, cocoa dust; mazagran — tall glass of dark amber iced coffee with a lemon wheel on the rim and a mint sprig; qahwa — brass dallah pot with long curved spout beside a small handleless cup of pale golden coffee and one date; Swedish egg coffee — enamel coffee pot and a white mug of clear light-amber coffee, a whole egg beside; Turkish coffee — small cup with a simple red band, thick velvety foam, copper cezve beside, one cube of Turkish delight.
> Row 3: caramel macchiato — tall clear glass of milk with an espresso band near the top and a caramel crosshatch on the foam; honey cinnamon latte — white mug with latte art, honey dipper resting on the rim, cinnamon dust; maple cinnamon latte — white mug with a maple-leaf shape in the foam, small maple-syrup bottle beside; Mexican mocha — terracotta mug with whipped cream and cinnamon, small red chili beside; pumpkin spice latte — white mug with spiced whipped cream, mini pumpkin beside.
> Row 4: vanilla latte — clear glass mug with light latte and heart art, vanilla pod beside; carajillo — rocks glass with ice, frothy dark-tan drink, three coffee beans on the foam; espresso martini — stemmed martini glass, dark drink with creamy tan foam and three coffee beans; Irish coffee — stemmed Irish-coffee glass with handle, dark coffee under a thick white cream collar; plain white mug of black coffee with steam.
