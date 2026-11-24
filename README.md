# 🍳 Kitchen Manager

A kitchen management program that follows the flow **from purchased stock to the finished dish**.
Orders are entered into the kitchen manually.

> Status: **v1.0 (completed program)** – runs fully in the browser, no installation needed.

## Features

| Requirement | Where in the app |
|---|---|
| Stock tracking starting from purchased quantity | **Stock** tab: the initial quantity is logged as "Initial purchase", every later purchase is added and logged, every order deducts and is logged |
| Preparation time tracking (which dish, how many minutes) | **Orders** tab: Start / Mark ready; actual vs planned minutes, average per dish on the recipe card |
| Recipes: ingredients, quantities, prep time | **Recipes** tab: add, edit, delete |
| Visual recipe guides (photos/videos) for new staff | **Staff guide** tab: one step at a time with an illustration for every demo step; upload a photo from the computer/phone or add a YouTube / video link per step |
| Low-stock alerts below a set level | Pop-up warning the moment an item drops to its minimum, plus **Dashboard** list and red badge; min. level editable per item |
| Storage categories: dry / refrigerator / freezer | **Storage** tab, storage column in Stock, and "take from …" in the Staff guide |
| Kitchen layout drawing | **Kitchen layout** tab: plan of the kitchen (receiving, dry storage, refrigerator, freezer, prep, cooking line, pass, service, dishwashing) with numbered flow; click an area to see what happens there and which ingredients are stored in it; low-stock count shown on storage areas |
| User-test survey | "Feedback survey" link in the page header (set `SURVEY_URL` in `js/data.js`) |

## How to run

1. Download or clone the repository.
2. Open `index.html` in any modern browser.

Or use the live version on GitHub Pages: https://emelsena-22.github.io/kitchen-manager/

Demo data: **82 ingredients** (dry storage, refrigerator, freezer; 7 of them start at or below their minimum level) and **44 recipes** (main dishes, soups, salads, pastries, breads and desserts), each with illustrated steps. Every ingredient is used in at least one recipe. Data is saved in the browser's `localStorage`. Use **Reset demo data** to start over.

## Project structure

```
index.html        – page layout and navigation
css/style.css     – styles
js/data.js        – storage types, demo (seed) data, kitchen layout areas, survey link
js/app.js         – application logic and views
img/steps/        – drawn step illustrations of the first three demo recipes (all other recipes get generated illustrations)
docs/DESIGN.md    – program design document
```

## Roadmap (next versions)

- [ ] Backend + database (e.g. Python Flask + SQLite) so several devices share data and large videos can be uploaded
- [ ] User roles (chef, staff, manager)
- [ ] Reports: daily consumption per ingredient
- [ ] Expiry-date tracking per batch

## Team

- Emel Sena & Furkan Abacıoğlu
