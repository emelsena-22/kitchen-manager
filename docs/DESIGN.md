# Program Design – Kitchen Manager

## 1. Objective
Manage the full kitchen flow: **purchase → storage → order → preparation → finished dish**,
with orders entered manually by kitchen staff.

## 2. Users
| User | Needs |
|---|---|
| Kitchen manager | Record purchases, set minimum stock levels, see alerts |
| Chef / cook | See orders, start and finish preparation, follow recipes |
| New staff | Step-by-step visual guides, know where each ingredient is stored |

## 3. Main flow

```
 Purchase ──► Stock (+qty) ──► Storage area (dry / fridge / freezer)
                                   │
 Manual order ──► Waiting ──► Start ──► stock −(recipe qty × portions)
                                   │        └─► low-stock check ──► alert
                                   ▼
                              Preparing (timer) ──► Ready ──► actual minutes saved
```

## 4. Data model

**Ingredient**
| Field | Type | Example |
|---|---|---|
| id | text | `egg` |
| name | text | Egg |
| unit | g / ml / pcs | pcs |
| quantity | number | 60 |
| minLevel | number | 24 – alert when `quantity ≤ minLevel` |
| storage | dry / fridge / freezer | fridge |

**Recipe**
| Field | Type |
|---|---|
| id, name | text |
| prepMinutes | number (planned time) |
| ingredients | list of `{ ingredientId, qty }` per portion |
| steps | list of `{ text, media }` – media = image, video or YouTube URL |

**Order**
| Field | Type |
|---|---|
| id, recipeId, portions | |
| status | waiting → preparing → done |
| createdAt, startedAt, finishedAt | timestamps; actual time = finishedAt − startedAt |

**StockLog** – `{ at, ingredientId, change, reason }` (every purchase and every usage)

## 5. Business rules
1. When an ingredient is created, its starting quantity is logged as "Initial purchase".
   Every later purchase increases the quantity and is written to the stock log.
2. When an order is **started**, the program checks there is enough stock for every ingredient
   (`recipe qty × portions`). If not, it refuses and lists what is missing.
3. Stock is deducted at start, so the alert appears immediately.
4. An ingredient is **low** when `quantity ≤ minLevel`. The moment it becomes low (after an order,
   or after raising the minimum) a warning pop-up appears and stays until closed; the dashboard
   lists all low items with their storage area, and the menu shows a red counter.
5. Each ingredient has exactly one storage category, shown on the Stock, Storage and Guide screens.
6. Preparation time = minutes between *Start* and *Ready*; recipe cards show the average actual time
   next to the planned time.
7. Each recipe step can have one medium: a bundled illustration, an uploaded photo (resized in the
   browser to max. 800 px wide), or a link to a YouTube video, video file or photo.
8. An ingredient that is used in a recipe cannot be deleted.

## 6. Screens
1. **Dashboard** – counters, low-stock alerts, recent stock movements
2. **Stock** – table, purchase form, new ingredient, min level & storage editing
3. **Recipes** – recipe cards, add / edit recipe form
4. **Orders** – manual order entry, Waiting / Preparing / Done board with timers
5. **Staff guide** – one step at a time with photo/video, step thumbnails, photo upload and video link
   per step, ingredient list with where to take each one from
6. **Storage** – three areas with temperatures and their ingredients

## 7. Technology choice (draft)
- HTML + CSS + JavaScript, no framework → opens in any browser, easy to host on **GitHub Pages**.
- Data in browser `localStorage` (enough for a draft/demo).
- Next step: a backend + database so multiple devices share the same data.

## 8. Test scenarios
| # | Steps | Expected |
|---|---|---|
| 1 | Add new ingredient "Butter", 500 g, fridge | Log entry "Initial purchase +500"; appears under Refrigerator |
| 2 | Record a purchase of 500 g Tomato | Quantity +500, log entry "Purchase" |
| 3 | Add order "Menemen ×12", Start | 36 eggs deducted → egg reaches 24 = minimum → warning pop-up |
| 4 | Order "Menemen ×50", Start | Start refused, "Egg: need 150, have 24" |
| 5 | Mark an order ready | Actual minutes shown; recipe card average updates |
| 6 | Edit "Rice pilaf", change time to 28 min | Saved; step illustrations kept |
| 7 | Staff guide → Upload photo on step 1 | Photo shown and kept after reload and after editing the recipe |
| 8 | Staff guide → Video link with a YouTube URL | Video player shown for that step |
| 9 | Dashboard with White cheese at 900 g (min 1000) | Listed with storage area, red badge |

All scenarios were run in the browser on the draft version and passed.
