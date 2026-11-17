// Seed data: loaded the first time the app runs (or after "Reset demo data").
// Units: g, ml, pcs. Storage: "dry" | "fridge" | "freezer".

const STORAGE_TYPES = {
  dry:     { label: "Dry storage",  temp: "15–21 °C", icon: "📦" },
  fridge:  { label: "Refrigerator", temp: "0–4 °C",   icon: "🧊" },
  freezer: { label: "Freezer",      temp: "≤ −18 °C", icon: "❄️" },
};

const SEED = {
  ingredients: [
    { id: "flour",   name: "Flour",          unit: "g",   quantity: 10000, minLevel: 2000, storage: "dry" },
    { id: "rice",    name: "Rice",           unit: "g",   quantity: 8000,  minLevel: 2000, storage: "dry" },
    { id: "pasta",   name: "Pasta",          unit: "g",   quantity: 5000,  minLevel: 1500, storage: "dry" },
    { id: "oil",     name: "Olive oil",      unit: "ml",  quantity: 3000,  minLevel: 1000, storage: "dry" },
    { id: "salt",    name: "Salt",           unit: "g",   quantity: 2000,  minLevel: 300,  storage: "dry" },
    { id: "tomato",  name: "Tomato",         unit: "g",   quantity: 4000,  minLevel: 1500, storage: "fridge" },
    { id: "onion",   name: "Onion",          unit: "g",   quantity: 3000,  minLevel: 1000, storage: "dry" },
    { id: "egg",     name: "Egg",            unit: "pcs", quantity: 60,    minLevel: 24,   storage: "fridge" },
    { id: "milk",    name: "Milk",           unit: "ml",  quantity: 5000,  minLevel: 2000, storage: "fridge" },
    { id: "cheese",  name: "White cheese",   unit: "g",   quantity: 900,   minLevel: 1000, storage: "fridge" },
    { id: "chicken", name: "Chicken breast", unit: "g",   quantity: 6000,  minLevel: 2000, storage: "freezer" },
    { id: "mince",   name: "Minced beef",    unit: "g",   quantity: 4000,  minLevel: 1500, storage: "freezer" },
  ],

  recipes: [
    {
      id: "menemen", name: "Menemen", prepMinutes: 15, portions: 1,
      ingredients: [
        { ingredientId: "egg", qty: 3 }, { ingredientId: "tomato", qty: 200 },
        { ingredientId: "onion", qty: 50 }, { ingredientId: "oil", qty: 20 },
        { ingredientId: "salt", qty: 3 },
      ],
      steps: [
        { text: "Dice the onion and tomatoes.", media: "" },
        { text: "Heat the oil in a pan and sauté the onion for 3 minutes.", media: "" },
        { text: "Add the tomatoes and cook until soft (about 5 minutes).", media: "" },
        { text: "Crack in the eggs, stir gently, add salt and serve hot.", media: "" },
      ],
    },
    {
      id: "pilaf", name: "Rice pilaf", prepMinutes: 25, portions: 1,
      ingredients: [
        { ingredientId: "rice", qty: 150 }, { ingredientId: "oil", qty: 15 },
        { ingredientId: "salt", qty: 3 },
      ],
      steps: [
        { text: "Wash the rice until the water runs clear.", media: "" },
        { text: "Toast the rice in oil for 2 minutes.", media: "" },
        { text: "Add hot water (1.5× the rice), salt, and simmer covered for 15 minutes.", media: "" },
        { text: "Rest for 5 minutes off the heat, then fluff and serve.", media: "" },
      ],
    },
    {
      id: "chicken-pasta", name: "Chicken pasta", prepMinutes: 30, portions: 1,
      ingredients: [
        { ingredientId: "pasta", qty: 120 }, { ingredientId: "chicken", qty: 150 },
        { ingredientId: "tomato", qty: 100 }, { ingredientId: "cheese", qty: 30 },
        { ingredientId: "oil", qty: 15 }, { ingredientId: "salt", qty: 4 },
      ],
      steps: [
        { text: "Thaw the chicken in the refrigerator the day before (never at room temperature).", media: "" },
        { text: "Boil the pasta in salted water.", media: "" },
        { text: "Cube and pan-fry the chicken in oil until cooked through.", media: "" },
        { text: "Add chopped tomatoes, then the pasta; top with cheese and serve.", media: "" },
      ],
    },
  ],

  orders: [],      // { id, recipeId, portions, status: "waiting"|"preparing"|"done", createdAt, startedAt, finishedAt }
  stockLog: [],    // { at, ingredientId, change, reason }
};

// Every demo step gets its illustration: img/steps/<recipe-id>-<step number>.svg
SEED.recipes.forEach((r) => r.steps.forEach((s, i) => { s.media = s.media || `img/steps/${r.id}-${i + 1}.svg`; }));

/** A fresh copy of the demo data. The starting quantities are recorded as the first purchase. */
function freshState() {
  const s = structuredClone(SEED);
  const now = Date.now();
  s.stockLog = s.ingredients.map((i) => ({ at: now, ingredientId: i.id, change: i.quantity, reason: "Initial purchase" }));
  return s;
}
