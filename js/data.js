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

// Link of the user-test survey (Google Forms). Leave empty to hide the link in the header.
const SURVEY_URL = "";

// Kitchen layout (drawn as SVG on the "Kitchen layout" screen). step = position in the kitchen flow.
// Storage zones use the same ids as STORAGE_TYPES, so they list the ingredients stored there.
const LAYOUT_ZONES = [
  { id: "dry",     step: 2,    icon: "📦", label: "Dry storage",   x: 30,  y: 30,  w: 250, h: 130, fill: "var(--dry)",     desc: "Shelves for dry goods and vegetables that do not need cooling. Keep it dry, ventilated and off the floor." },
  { id: "fridge",  step: 2,    icon: "🧊", label: "Refrigerator",  x: 290, y: 30,  w: 190, h: 130, fill: "var(--fridge)",  desc: "Fresh and chilled products. Keep raw and ready-to-eat foods on separate shelves." },
  { id: "freezer", step: 2,    icon: "❄️", label: "Freezer",       x: 490, y: 30,  w: 190, h: 130, fill: "var(--freezer)", desc: "Frozen meat and other frozen goods. Thaw in the refrigerator, never at room temperature." },
  { id: "dish",    step: 7,    icon: "🧼", label: "Dishwashing",   x: 700, y: 30,  w: 170, h: 130, fill: "#e5e7eb",        desc: "Dirty dishes return here from the pass and the cooking line. Clean dishes go back to the stations." },
  { id: "prep",    step: 3,    icon: "🔪", label: "Prep area",     x: 30,  y: 190, w: 250, h: 140, fill: "#ecfccb",        desc: "Washing and cutting. Use separate boards for raw meat and vegetables. Ingredients are taken here from storage." },
  { id: "cook",    step: 4,    icon: "🔥", label: "Cooking line",  x: 290, y: 190, w: 390, h: 140, fill: "#ffedd5",        desc: "Stove, oven and pans. Preparation time is measured from Start to Ready in the Orders screen." },
  { id: "staff",   step: null, icon: "🧤", label: "Staff area",    x: 700, y: 190, w: 170, h: 140, fill: "#e5e7eb",        desc: "Hand-washing sink, lockers and notice board. New staff start here before entering the kitchen." },
  { id: "receive", step: 1,    icon: "🚚", label: "Receiving",     x: 30,  y: 360, w: 250, h: 170, fill: "#fef9c3",        desc: "Delivery door. Check delivered goods, record them in Stock (Record a purchase), then move them to their storage area." },
  { id: "pass",    step: 5,    icon: "🍽️", label: "Plating & pass", x: 290, y: 360, w: 390, h: 170, fill: "#fce7f3",       desc: "Dishes are plated and checked here before they leave the kitchen. Mark the order Ready when the dish is on the pass." },
  { id: "service", step: 6,    icon: "🛎️", label: "Service area",  x: 700, y: 360, w: 170, h: 170, fill: "#e0e7ff",        desc: "Service exit. Finished dishes are picked up here." },
];
