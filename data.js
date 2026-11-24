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
    { id: "potato", name: "Potato", unit: "g", quantity: 8000, minLevel: 2000, storage: "dry" },
    { id: "garlic", name: "Garlic", unit: "g", quantity: 1000, minLevel: 200, storage: "dry" },
    { id: "sugar", name: "Sugar", unit: "g", quantity: 5000, minLevel: 1000, storage: "dry" },
    { id: "bulgur", name: "Bulgur", unit: "g", quantity: 4000, minLevel: 1000, storage: "dry" },
    { id: "lentil", name: "Red lentils", unit: "g", quantity: 4000, minLevel: 1000, storage: "dry" },
    { id: "chickpea", name: "Chickpeas", unit: "g", quantity: 3000, minLevel: 800, storage: "dry" },
    { id: "tpaste", name: "Tomato paste", unit: "g", quantity: 2000, minLevel: 500, storage: "dry" },
    { id: "breadcrumbs", name: "Breadcrumbs", unit: "g", quantity: 2000, minLevel: 500, storage: "dry" },
    { id: "sunoil", name: "Sunflower oil", unit: "ml", quantity: 5000, minLevel: 1500, storage: "dry" },
    { id: "vinegar", name: "Vinegar", unit: "ml", quantity: 2000, minLevel: 500, storage: "dry" },
    { id: "pepper", name: "Black pepper", unit: "g", quantity: 500, minLevel: 100, storage: "dry" },
    { id: "cumin", name: "Cumin", unit: "g", quantity: 400, minLevel: 80, storage: "dry" },
    { id: "paprika", name: "Red pepper flakes", unit: "g", quantity: 70, minLevel: 80, storage: "dry" },
    { id: "mint", name: "Dried mint", unit: "g", quantity: 40, minLevel: 50, storage: "dry" },
    { id: "butter", name: "Butter", unit: "g", quantity: 2000, minLevel: 500, storage: "fridge" },
    { id: "yogurt", name: "Yogurt", unit: "g", quantity: 6000, minLevel: 1500, storage: "fridge" },
    { id: "cream", name: "Cream", unit: "ml", quantity: 2000, minLevel: 500, storage: "fridge" },
    { id: "kashar", name: "Kashar cheese", unit: "g", quantity: 2000, minLevel: 500, storage: "fridge" },
    { id: "cucumber", name: "Cucumber", unit: "g", quantity: 3000, minLevel: 800, storage: "fridge" },
    { id: "gpepper", name: "Green pepper", unit: "g", quantity: 2000, minLevel: 600, storage: "fridge" },
    { id: "carrot", name: "Carrot", unit: "g", quantity: 3000, minLevel: 800, storage: "fridge" },
    { id: "eggplant", name: "Eggplant", unit: "g", quantity: 3000, minLevel: 800, storage: "fridge" },
    { id: "lettuce", name: "Lettuce", unit: "g", quantity: 2000, minLevel: 500, storage: "fridge" },
    { id: "parsley", name: "Parsley", unit: "g", quantity: 120, minLevel: 150, storage: "fridge" },
    { id: "lemon", name: "Lemon", unit: "pcs", quantity: 8, minLevel: 10, storage: "fridge" },
    { id: "fish", name: "Sea bass fillet", unit: "g", quantity: 3000, minLevel: 1000, storage: "freezer" },
    { id: "shrimp", name: "Shrimp", unit: "g", quantity: 450, minLevel: 500, storage: "freezer" },
    { id: "peas", name: "Green peas", unit: "g", quantity: 700, minLevel: 800, storage: "freezer" },
    { id: "spinach", name: "Spinach", unit: "g", quantity: 3000, minLevel: 800, storage: "freezer" },
    { id: "fries", name: "Frozen french fries", unit: "g", quantity: 5000, minLevel: 1500, storage: "freezer" },
    { id: "oats", name: "Oats", unit: "g", quantity: 3000, minLevel: 800, storage: "dry" },
    { id: "cornstarch", name: "Cornstarch", unit: "g", quantity: 2000, minLevel: 500, storage: "dry" },
    { id: "semolina", name: "Semolina", unit: "g", quantity: 3000, minLevel: 800, storage: "dry" },
    { id: "bakingpowder", name: "Baking powder", unit: "g", quantity: 300, minLevel: 80, storage: "dry" },
    { id: "yeast", name: "Dry yeast", unit: "g", quantity: 200, minLevel: 50, storage: "dry" },
    { id: "honey", name: "Honey", unit: "g", quantity: 2000, minLevel: 500, storage: "dry" },
    { id: "walnut", name: "Walnuts", unit: "g", quantity: 1500, minLevel: 400, storage: "dry" },
    { id: "raisin", name: "Raisins", unit: "g", quantity: 1500, minLevel: 400, storage: "dry" },
    { id: "cocoa", name: "Cocoa powder", unit: "g", quantity: 800, minLevel: 200, storage: "dry" },
    { id: "tahini", name: "Tahini", unit: "g", quantity: 2000, minLevel: 500, storage: "dry" },
    { id: "olive", name: "Black olives", unit: "g", quantity: 2000, minLevel: 500, storage: "dry" },
    { id: "vermicelli", name: "Vermicelli", unit: "g", quantity: 2000, minLevel: 500, storage: "dry" },
    { id: "whitebean", name: "White beans", unit: "g", quantity: 4000, minLevel: 1000, storage: "dry" },
    { id: "greenlentil", name: "Green lentils", unit: "g", quantity: 3000, minLevel: 800, storage: "dry" },
    { id: "oregano", name: "Oregano", unit: "g", quantity: 200, minLevel: 50, storage: "dry" },
    { id: "cinnamon", name: "Cinnamon", unit: "g", quantity: 300, minLevel: 60, storage: "dry" },
    { id: "tomatocan", name: "Canned tomatoes", unit: "g", quantity: 6000, minLevel: 1500, storage: "dry" },
    { id: "tea", name: "Black tea", unit: "g", quantity: 1000, minLevel: 200, storage: "dry" },
    { id: "mozzarella", name: "Mozzarella", unit: "g", quantity: 2000, minLevel: 500, storage: "fridge" },
    { id: "mushroom", name: "Mushrooms", unit: "g", quantity: 2000, minLevel: 500, storage: "fridge" },
    { id: "zucchini", name: "Zucchini", unit: "g", quantity: 3000, minLevel: 800, storage: "fridge" },
    { id: "springonion", name: "Spring onion", unit: "g", quantity: 800, minLevel: 200, storage: "fridge" },
    { id: "dill", name: "Dill", unit: "g", quantity: 300, minLevel: 80, storage: "fridge" },
    { id: "redpepper", name: "Red bell pepper", unit: "g", quantity: 2000, minLevel: 600, storage: "fridge" },
    { id: "cabbage", name: "Cabbage", unit: "g", quantity: 4000, minLevel: 1000, storage: "fridge" },
    { id: "beefcubes", name: "Beef cubes", unit: "g", quantity: 4000, minLevel: 1000, storage: "fridge" },
    { id: "sucuk", name: "Sucuk (spicy sausage)", unit: "g", quantity: 1500, minLevel: 400, storage: "fridge" },
    { id: "apple", name: "Apple", unit: "pcs", quantity: 40, minLevel: 10, storage: "fridge" },
    { id: "mayo", name: "Mayonnaise", unit: "g", quantity: 2000, minLevel: 500, storage: "fridge" },
    { id: "ayran", name: "Ayran", unit: "ml", quantity: 6000, minLevel: 1500, storage: "fridge" },
    { id: "icecream", name: "Vanilla ice cream", unit: "g", quantity: 4000, minLevel: 1000, storage: "freezer" },
    { id: "mixveg", name: "Mixed vegetables", unit: "g", quantity: 4000, minLevel: 1000, storage: "freezer" },
    { id: "okra", name: "Okra", unit: "g", quantity: 2000, minLevel: 500, storage: "freezer" },
    { id: "corn", name: "Sweet corn", unit: "g", quantity: 3000, minLevel: 800, storage: "freezer" },
    { id: "pastry", name: "Puff pastry", unit: "g", quantity: 3000, minLevel: 800, storage: "freezer" },
    { id: "phyllo", name: "Phyllo dough", unit: "g", quantity: 2000, minLevel: 500, storage: "freezer" },
    { id: "squid", name: "Squid rings", unit: "g", quantity: 2000, minLevel: 500, storage: "freezer" },
    { id: "chickenthigh", name: "Chicken thighs", unit: "g", quantity: 4000, minLevel: 1000, storage: "freezer" },
    { id: "pizzadough", name: "Pizza dough", unit: "g", quantity: 3000, minLevel: 800, storage: "freezer" },
    { id: "berries", name: "Frozen berries", unit: "g", quantity: 2000, minLevel: 500, storage: "freezer" },
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
    {
      id: "lentil-soup", name: "Lentil soup", prepMinutes: 30, portions: 1,
      ingredients: [
        { ingredientId: "lentil", qty: 100 }, { ingredientId: "onion", qty: 30 }, { ingredientId: "carrot", qty: 30 }, { ingredientId: "butter", qty: 10 }, { ingredientId: "salt", qty: 3 }, { ingredientId: "pepper", qty: 1 }, { ingredientId: "cumin", qty: 1 },
      ],
      steps: [
        { text: "Peel and dice the onion and carrot.", media: "" },
        { text: "Melt the butter and sauté the onion and carrot for 3 minutes.", media: "" },
        { text: "Add the washed lentils and hot water, then simmer for 20 minutes.", media: "" },
        { text: "Blend until smooth, season with salt, pepper and cumin, and serve hot.", media: "" },
      ],
    },
    {
      id: "shepherd-salad", name: "Shepherd salad", prepMinutes: 10, portions: 1,
      ingredients: [
        { ingredientId: "tomato", qty: 150 }, { ingredientId: "cucumber", qty: 100 }, { ingredientId: "onion", qty: 30 }, { ingredientId: "gpepper", qty: 50 }, { ingredientId: "parsley", qty: 5 }, { ingredientId: "oil", qty: 15 }, { ingredientId: "vinegar", qty: 10 }, { ingredientId: "salt", qty: 2 },
      ],
      steps: [
        { text: "Wash the vegetables and the parsley.", media: "" },
        { text: "Dice the tomato, cucumber, pepper and onion into small cubes.", media: "" },
        { text: "Chop the parsley and mix everything in a bowl.", media: "" },
        { text: "Dress with oil, vinegar and salt, mix and serve cold.", media: "" },
      ],
    },
    {
      id: "cacik", name: "Yogurt cucumber dip (Cacik)", prepMinutes: 5, portions: 1,
      ingredients: [
        { ingredientId: "yogurt", qty: 150 }, { ingredientId: "cucumber", qty: 80 }, { ingredientId: "garlic", qty: 3 }, { ingredientId: "mint", qty: 1 }, { ingredientId: "salt", qty: 2 }, { ingredientId: "oil", qty: 5 },
      ],
      steps: [
        { text: "Grate the cucumber and squeeze out the extra water.", media: "" },
        { text: "Crush the garlic and mix it with the yogurt.", media: "" },
        { text: "Stir in the cucumber, salt and dried mint.", media: "" },
        { text: "Serve cold with a few drops of olive oil on top.", media: "" },
      ],
    },
    {
      id: "meatballs", name: "Meatballs (Kofte)", prepMinutes: 25, portions: 1,
      ingredients: [
        { ingredientId: "mince", qty: 150 }, { ingredientId: "onion", qty: 30 }, { ingredientId: "breadcrumbs", qty: 20 }, { ingredientId: "salt", qty: 3 }, { ingredientId: "pepper", qty: 1 }, { ingredientId: "cumin", qty: 1 }, { ingredientId: "oil", qty: 10 },
      ],
      steps: [
        { text: "Thaw the minced beef in the refrigerator the day before (never at room temperature).", media: "" },
        { text: "Grate the onion and knead it with the mince, breadcrumbs, salt, pepper and cumin.", media: "" },
        { text: "Shape into small balls and rest them in the refrigerator for 10 minutes.", media: "" },
        { text: "Pan-fry in oil for about 8 minutes, turning, until cooked through.", media: "" },
      ],
    },
    {
      id: "bolognese", name: "Spaghetti bolognese", prepMinutes: 30, portions: 1,
      ingredients: [
        { ingredientId: "pasta", qty: 120 }, { ingredientId: "mince", qty: 100 }, { ingredientId: "tpaste", qty: 20 }, { ingredientId: "onion", qty: 40 }, { ingredientId: "garlic", qty: 5 }, { ingredientId: "oil", qty: 15 }, { ingredientId: "salt", qty: 3 }, { ingredientId: "pepper", qty: 1 },
      ],
      steps: [
        { text: "Thaw the minced beef in the refrigerator; dice the onion and garlic.", media: "" },
        { text: "Brown the mince in oil with the onion and garlic for 8 minutes.", media: "" },
        { text: "Add tomato paste and a little water, then simmer for 10 minutes.", media: "" },
        { text: "Boil the pasta in salted water, mix with the sauce and serve.", media: "" },
      ],
    },
    {
      id: "sea-bass", name: "Baked sea bass", prepMinutes: 35, portions: 1,
      ingredients: [
        { ingredientId: "fish", qty: 200 }, { ingredientId: "potato", qty: 150 }, { ingredientId: "lemon", qty: 0.5 }, { ingredientId: "oil", qty: 15 }, { ingredientId: "salt", qty: 3 }, { ingredientId: "pepper", qty: 1 },
      ],
      steps: [
        { text: "Thaw the fish in the refrigerator the day before (never at room temperature).", media: "" },
        { text: "Slice the potatoes thinly and lay them in a tray with oil and salt.", media: "" },
        { text: "Place the fish on top, add lemon slices and pepper.", media: "" },
        { text: "Bake at 200 °C for about 20 minutes until the fish is cooked through.", media: "" },
      ],
    },
    {
      id: "bulgur-pilaf", name: "Bulgur pilaf", prepMinutes: 25, portions: 1,
      ingredients: [
        { ingredientId: "bulgur", qty: 120 }, { ingredientId: "tpaste", qty: 15 }, { ingredientId: "onion", qty: 30 }, { ingredientId: "oil", qty: 15 }, { ingredientId: "salt", qty: 3 },
      ],
      steps: [
        { text: "Dice the onion.", media: "" },
        { text: "Sauté the onion in oil, then cook the tomato paste for 2 minutes.", media: "" },
        { text: "Add the bulgur, salt and hot water (twice the amount of bulgur) and simmer covered for 12 minutes.", media: "" },
        { text: "Rest for 5 minutes off the heat, then fluff and serve.", media: "" },
      ],
    },
    {
      id: "fries", name: "Crispy fries", prepMinutes: 15, portions: 1,
      ingredients: [
        { ingredientId: "fries", qty: 200 }, { ingredientId: "sunoil", qty: 60 }, { ingredientId: "salt", qty: 2 },
      ],
      steps: [
        { text: "Heat the sunflower oil to 180 °C.", media: "" },
        { text: "Fry the fries straight from the freezer (do not thaw) for about 5 minutes.", media: "" },
        { text: "Drain on paper towel.", media: "" },
        { text: "Add salt and serve immediately.", media: "" },
      ],
    },
    {
      id: "pancakes", name: "Pancakes", prepMinutes: 20, portions: 1,
      ingredients: [
        { ingredientId: "flour", qty: 80 }, { ingredientId: "egg", qty: 1 }, { ingredientId: "milk", qty: 120 }, { ingredientId: "sugar", qty: 10 }, { ingredientId: "butter", qty: 10 }, { ingredientId: "bakingpowder", qty: 3 }, { ingredientId: "honey", qty: 15 },
      ],
      steps: [
        { text: "Whisk the flour, baking powder, sugar, egg and milk into a smooth batter.", media: "" },
        { text: "Let the batter rest for 10 minutes.", media: "" },
        { text: "Fry small ladles of batter in a little butter, 2 minutes on each side.", media: "" },
        { text: "Stack the pancakes and serve with honey.", media: "" },
      ],
    },
    {
      id: "mushroom-omelette", name: "Mushroom omelette", prepMinutes: 12, portions: 1,
      ingredients: [
        { ingredientId: "egg", qty: 3 }, { ingredientId: "mushroom", qty: 60 }, { ingredientId: "butter", qty: 10 }, { ingredientId: "kashar", qty: 20 }, { ingredientId: "salt", qty: 2 }, { ingredientId: "pepper", qty: 1 },
      ],
      steps: [
        { text: "Wash and slice the mushrooms.", media: "" },
        { text: "Sauté the mushrooms in butter for 4 minutes.", media: "" },
        { text: "Beat the eggs with salt and pepper and pour over the mushrooms.", media: "" },
        { text: "Add grated kashar cheese, fold the omelette and serve hot.", media: "" },
      ],
    },
    {
      id: "chicken-soup", name: "Chicken vegetable soup", prepMinutes: 35, portions: 1,
      ingredients: [
        { ingredientId: "chickenthigh", qty: 120 }, { ingredientId: "carrot", qty: 40 }, { ingredientId: "potato", qty: 60 }, { ingredientId: "onion", qty: 30 }, { ingredientId: "vermicelli", qty: 20 }, { ingredientId: "butter", qty: 10 }, { ingredientId: "salt", qty: 3 }, { ingredientId: "pepper", qty: 1 },
      ],
      steps: [
        { text: "Thaw the chicken thighs in the refrigerator the day before (never at room temperature).", media: "" },
        { text: "Dice the carrot, potato and onion.", media: "" },
        { text: "Boil the chicken with the vegetables for 20 minutes, then shred the meat.", media: "" },
        { text: "Add the vermicelli and butter, simmer 5 more minutes, season and serve.", media: "" },
      ],
    },
    {
      id: "beef-stew", name: "Beef stew", prepMinutes: 60, portions: 1,
      ingredients: [
        { ingredientId: "beefcubes", qty: 150 }, { ingredientId: "potato", qty: 120 }, { ingredientId: "carrot", qty: 50 }, { ingredientId: "onion", qty: 40 }, { ingredientId: "tpaste", qty: 15 }, { ingredientId: "oil", qty: 15 }, { ingredientId: "salt", qty: 3 }, { ingredientId: "pepper", qty: 1 },
      ],
      steps: [
        { text: "Dice the onion, potato and carrot.", media: "" },
        { text: "Brown the beef cubes in oil with the onion for 8 minutes.", media: "" },
        { text: "Add the tomato paste and hot water and simmer covered for 35 minutes.", media: "" },
        { text: "Add the potato and carrot, cook 15 more minutes, season and serve.", media: "" },
      ],
    },
    {
      id: "white-beans", name: "White bean stew", prepMinutes: 50, portions: 1,
      ingredients: [
        { ingredientId: "whitebean", qty: 100 }, { ingredientId: "onion", qty: 40 }, { ingredientId: "tpaste", qty: 15 }, { ingredientId: "butter", qty: 10 }, { ingredientId: "salt", qty: 3 }, { ingredientId: "paprika", qty: 2 },
      ],
      steps: [
        { text: "Soak the white beans overnight and drain them.", media: "" },
        { text: "Sauté the chopped onion in butter, then add the tomato paste and paprika.", media: "" },
        { text: "Add the beans and hot water and simmer for 35 minutes until soft.", media: "" },
        { text: "Season with salt and serve hot.", media: "" },
      ],
    },
    {
      id: "zucchini-fritters", name: "Zucchini fritters", prepMinutes: 25, portions: 1,
      ingredients: [
        { ingredientId: "zucchini", qty: 150 }, { ingredientId: "egg", qty: 1 }, { ingredientId: "flour", qty: 40 }, { ingredientId: "dill", qty: 3 }, { ingredientId: "kashar", qty: 20 }, { ingredientId: "salt", qty: 2 }, { ingredientId: "sunoil", qty: 40 },
      ],
      steps: [
        { text: "Grate the zucchini and squeeze out the water.", media: "" },
        { text: "Mix with the egg, flour, chopped dill, grated cheese and salt.", media: "" },
        { text: "Fry spoonfuls of the mixture in sunflower oil, 3 minutes on each side.", media: "" },
        { text: "Drain on paper towel and serve with yogurt.", media: "" },
      ],
    },
    {
      id: "pizza", name: "Margherita pizza", prepMinutes: 25, portions: 1,
      ingredients: [
        { ingredientId: "pizzadough", qty: 200 }, { ingredientId: "tomatocan", qty: 80 }, { ingredientId: "mozzarella", qty: 100 }, { ingredientId: "oregano", qty: 1 }, { ingredientId: "oil", qty: 10 }, { ingredientId: "salt", qty: 1 },
      ],
      steps: [
        { text: "Thaw the pizza dough in the refrigerator the day before.", media: "" },
        { text: "Roll the dough into a round base and spread the crushed tomatoes on it.", media: "" },
        { text: "Add the mozzarella, oregano, a pinch of salt and a little oil.", media: "" },
        { text: "Bake at 220 °C for about 10 minutes until the edges are golden.", media: "" },
      ],
    },
    {
      id: "veg-saute", name: "Vegetable sauté", prepMinutes: 20, portions: 1,
      ingredients: [
        { ingredientId: "mixveg", qty: 200 }, { ingredientId: "onion", qty: 30 }, { ingredientId: "tpaste", qty: 10 }, { ingredientId: "oil", qty: 15 }, { ingredientId: "salt", qty: 2 },
      ],
      steps: [
        { text: "Dice the onion.", media: "" },
        { text: "Sauté the onion in oil and add the tomato paste.", media: "" },
        { text: "Add the frozen mixed vegetables straight from the freezer (do not thaw).", media: "" },
        { text: "Cook covered for 12 minutes, season with salt and serve.", media: "" },
      ],
    },
    {
      id: "stuffed-peppers", name: "Stuffed peppers", prepMinutes: 45, portions: 1,
      ingredients: [
        { ingredientId: "redpepper", qty: 150 }, { ingredientId: "rice", qty: 60 }, { ingredientId: "mince", qty: 60 }, { ingredientId: "onion", qty: 30 }, { ingredientId: "tpaste", qty: 10 }, { ingredientId: "oil", qty: 15 }, { ingredientId: "salt", qty: 3 }, { ingredientId: "parsley", qty: 5 },
      ],
      steps: [
        { text: "Thaw the minced beef in the refrigerator; cut the tops off the peppers and remove the seeds.", media: "" },
        { text: "Mix the mince, rice, grated onion, parsley, tomato paste, oil and salt.", media: "" },
        { text: "Fill the peppers with the mixture and place them upright in a pot.", media: "" },
        { text: "Add hot water to half the height and simmer covered for 30 minutes.", media: "" },
      ],
    },
    {
      id: "rice-pudding", name: "Rice pudding", prepMinutes: 45, portions: 1,
      ingredients: [
        { ingredientId: "rice", qty: 60 }, { ingredientId: "milk", qty: 300 }, { ingredientId: "sugar", qty: 40 }, { ingredientId: "cornstarch", qty: 10 }, { ingredientId: "cinnamon", qty: 1 },
      ],
      steps: [
        { text: "Boil the washed rice in a little water for 10 minutes.", media: "" },
        { text: "Add the milk and sugar and simmer for 20 minutes, stirring often.", media: "" },
        { text: "Mix the cornstarch with cold milk, stir it in and cook 5 more minutes.", media: "" },
        { text: "Pour into bowls, cool and sprinkle with cinnamon.", media: "" },
      ],
    },
    {
      id: "oatmeal", name: "Oatmeal with walnuts", prepMinutes: 10, portions: 1,
      ingredients: [
        { ingredientId: "oats", qty: 60 }, { ingredientId: "milk", qty: 200 }, { ingredientId: "honey", qty: 15 }, { ingredientId: "walnut", qty: 15 }, { ingredientId: "raisin", qty: 10 }, { ingredientId: "apple", qty: 0.5 },
      ],
      steps: [
        { text: "Heat the milk in a pot.", media: "" },
        { text: "Add the oats and cook for 5 minutes, stirring.", media: "" },
        { text: "Dice the apple and chop the walnuts.", media: "" },
        { text: "Serve in a bowl topped with apple, walnuts, raisins and honey.", media: "" },
      ],
    },
    {
      id: "calamari", name: "Fried calamari", prepMinutes: 20, portions: 1,
      ingredients: [
        { ingredientId: "squid", qty: 150 }, { ingredientId: "flour", qty: 40 }, { ingredientId: "sunoil", qty: 80 }, { ingredientId: "salt", qty: 2 }, { ingredientId: "lemon", qty: 0.25 }, { ingredientId: "mayo", qty: 20 },
      ],
      steps: [
        { text: "Thaw the squid rings in the refrigerator and pat them dry.", media: "" },
        { text: "Toss the squid in flour mixed with salt.", media: "" },
        { text: "Fry in hot sunflower oil for 2-3 minutes until golden.", media: "" },
        { text: "Drain and serve with lemon and mayonnaise.", media: "" },
      ],
    },
    {
      id: "borek", name: "Cheese pastry (Borek)", prepMinutes: 35, portions: 1,
      ingredients: [
        { ingredientId: "phyllo", qty: 100 }, { ingredientId: "cheese", qty: 60 }, { ingredientId: "egg", qty: 1 }, { ingredientId: "milk", qty: 50 }, { ingredientId: "parsley", qty: 5 }, { ingredientId: "oil", qty: 20 }, { ingredientId: "salt", qty: 1 },
      ],
      steps: [
        { text: "Thaw the phyllo dough in the refrigerator the day before.", media: "" },
        { text: "Mix the crumbled white cheese with chopped parsley.", media: "" },
        { text: "Brush each phyllo sheet with the egg-milk-oil mixture, add filling and roll.", media: "" },
        { text: "Bake at 180 °C for about 25 minutes until golden.", media: "" },
      ],
    },
    {
      id: "berry-dessert", name: "Berry ice cream cup", prepMinutes: 5, portions: 1,
      ingredients: [
        { ingredientId: "icecream", qty: 120 }, { ingredientId: "berries", qty: 50 }, { ingredientId: "honey", qty: 10 },
      ],
      steps: [
        { text: "Take the berries out of the freezer 5 minutes before serving.", media: "" },
        { text: "Put the ice cream scoops in a cup.", media: "" },
        { text: "Add the berries on top.", media: "" },
        { text: "Drizzle with honey and serve immediately.", media: "" },
      ],
    },
    {
      id: "hummus", name: "Hummus", prepMinutes: 15, portions: 1,
      ingredients: [
        { ingredientId: "chickpea", qty: 100 }, { ingredientId: "tahini", qty: 30 }, { ingredientId: "oil", qty: 15 }, { ingredientId: "lemon", qty: 0.5 }, { ingredientId: "garlic", qty: 3 }, { ingredientId: "salt", qty: 2 }, { ingredientId: "paprika", qty: 1 },
      ],
      steps: [
        { text: "Soak the chickpeas overnight, boil until very soft and drain.", media: "" },
        { text: "Blend the chickpeas with tahini, garlic, lemon juice and salt.", media: "" },
        { text: "Add a little cold water and blend until smooth and creamy.", media: "" },
        { text: "Spread on a plate, drizzle with oil and sprinkle with red pepper flakes.", media: "" },
      ],
    },
    {
      id: "eggplant-gratin", name: "Eggplant gratin", prepMinutes: 40, portions: 1,
      ingredients: [
        { ingredientId: "eggplant", qty: 200 }, { ingredientId: "cream", qty: 60 }, { ingredientId: "mozzarella", qty: 50 }, { ingredientId: "tomatocan", qty: 50 }, { ingredientId: "oil", qty: 15 }, { ingredientId: "salt", qty: 2 },
      ],
      steps: [
        { text: "Slice the eggplant, salt it for 10 minutes and pat dry.", media: "" },
        { text: "Brush the slices with oil and grill them for 3 minutes on each side.", media: "" },
        { text: "Layer the eggplant in a dish with crushed tomatoes and cream.", media: "" },
        { text: "Cover with mozzarella and bake at 200 °C for 20 minutes.", media: "" },
      ],
    },
    {
      id: "chicken-corn-salad", name: "Chicken corn salad", prepMinutes: 25, portions: 1,
      ingredients: [
        { ingredientId: "chicken", qty: 100 }, { ingredientId: "lettuce", qty: 80 }, { ingredientId: "corn", qty: 30 }, { ingredientId: "olive", qty: 15 }, { ingredientId: "mayo", qty: 20 }, { ingredientId: "oil", qty: 10 }, { ingredientId: "salt", qty: 2 },
      ],
      steps: [
        { text: "Thaw the chicken breast in the refrigerator the day before (never at room temperature).", media: "" },
        { text: "Grill the chicken in oil until cooked through, then slice it.", media: "" },
        { text: "Tear the lettuce and mix it with the corn and olives.", media: "" },
        { text: "Top with the chicken, add mayonnaise and salt, and serve.", media: "" },
      ],
    },
    {
      id: "shrimp-casserole", name: "Shrimp casserole", prepMinutes: 25, portions: 1,
      ingredients: [
        { ingredientId: "shrimp", qty: 150 }, { ingredientId: "mushroom", qty: 50 }, { ingredientId: "kashar", qty: 40 }, { ingredientId: "tomato", qty: 80 }, { ingredientId: "gpepper", qty: 30 }, { ingredientId: "butter", qty: 10 }, { ingredientId: "salt", qty: 2 },
      ],
      steps: [
        { text: "Thaw the shrimp in the refrigerator the day before.", media: "" },
        { text: "Sauté the shrimp, mushrooms, tomato and pepper in butter for 5 minutes.", media: "" },
        { text: "Put everything in a small ovenproof dish and add salt.", media: "" },
        { text: "Cover with grated kashar and bake at 200 °C for 10 minutes.", media: "" },
      ],
    },
    {
      id: "pea-rice", name: "Rice with green peas", prepMinutes: 25, portions: 1,
      ingredients: [
        { ingredientId: "rice", qty: 120 }, { ingredientId: "peas", qty: 60 }, { ingredientId: "butter", qty: 10 }, { ingredientId: "onion", qty: 30 }, { ingredientId: "salt", qty: 3 },
      ],
      steps: [
        { text: "Dice the onion and sauté it in butter.", media: "" },
        { text: "Add the washed rice and toast it for 2 minutes.", media: "" },
        { text: "Add the frozen peas straight from the freezer, salt and hot water.", media: "" },
        { text: "Simmer covered for 15 minutes, rest 5 minutes, fluff and serve.", media: "" },
      ],
    },
    {
      id: "spinach-pie", name: "Spinach pie", prepMinutes: 40, portions: 1,
      ingredients: [
        { ingredientId: "spinach", qty: 150 }, { ingredientId: "phyllo", qty: 80 }, { ingredientId: "egg", qty: 1 }, { ingredientId: "cheese", qty: 50 }, { ingredientId: "onion", qty: 30 }, { ingredientId: "oil", qty: 15 }, { ingredientId: "salt", qty: 2 },
      ],
      steps: [
        { text: "Thaw the spinach and the phyllo dough in the refrigerator and squeeze the spinach dry.", media: "" },
        { text: "Sauté the chopped onion, add the spinach and crumbled cheese.", media: "" },
        { text: "Brush the phyllo sheets with egg and oil, add the filling and roll.", media: "" },
        { text: "Bake at 180 °C for about 25 minutes until golden.", media: "" },
      ],
    },
    {
      id: "semolina-halva", name: "Semolina halva", prepMinutes: 25, portions: 1,
      ingredients: [
        { ingredientId: "semolina", qty: 80 }, { ingredientId: "butter", qty: 30 }, { ingredientId: "sugar", qty: 50 }, { ingredientId: "milk", qty: 200 }, { ingredientId: "walnut", qty: 15 },
      ],
      steps: [
        { text: "Melt the butter and toast the semolina for 10 minutes, stirring.", media: "" },
        { text: "Heat the milk with the sugar in another pot.", media: "" },
        { text: "Pour the hot milk into the semolina and stir quickly.", media: "" },
        { text: "Cover and rest for 10 minutes, then serve topped with walnuts.", media: "" },
      ],
    },
    {
      id: "bread", name: "Homemade bread", prepMinutes: 90, portions: 1,
      ingredients: [
        { ingredientId: "flour", qty: 300 }, { ingredientId: "yeast", qty: 7 }, { ingredientId: "salt", qty: 5 }, { ingredientId: "sugar", qty: 5 }, { ingredientId: "oil", qty: 15 },
      ],
      steps: [
        { text: "Mix the flour, yeast, salt and sugar, then add warm water and oil.", media: "" },
        { text: "Knead the dough for 10 minutes until smooth.", media: "" },
        { text: "Cover and let it rise for 45 minutes.", media: "" },
        { text: "Shape the loaf and bake at 220 °C for 25 minutes.", media: "" },
      ],
    },
    {
      id: "chocolate-cake", name: "Chocolate cake", prepMinutes: 50, portions: 1,
      ingredients: [
        { ingredientId: "flour", qty: 80 }, { ingredientId: "cocoa", qty: 20 }, { ingredientId: "sugar", qty: 70 }, { ingredientId: "egg", qty: 2 }, { ingredientId: "butter", qty: 50 }, { ingredientId: "milk", qty: 80 }, { ingredientId: "bakingpowder", qty: 4 },
      ],
      steps: [
        { text: "Whisk the eggs with the sugar until pale.", media: "" },
        { text: "Mix in the melted butter, milk, flour, cocoa and baking powder.", media: "" },
        { text: "Pour the batter into a greased cake tin.", media: "" },
        { text: "Bake at 180 °C for 35 minutes, cool and serve.", media: "" },
      ],
    },
    {
      id: "green-lentil-salad", name: "Green lentil salad", prepMinutes: 35, portions: 1,
      ingredients: [
        { ingredientId: "greenlentil", qty: 100 }, { ingredientId: "onion", qty: 30 }, { ingredientId: "carrot", qty: 30 }, { ingredientId: "parsley", qty: 5 }, { ingredientId: "oil", qty: 15 }, { ingredientId: "vinegar", qty: 10 }, { ingredientId: "salt", qty: 2 },
      ],
      steps: [
        { text: "Boil the green lentils for 20 minutes until tender, then drain and cool.", media: "" },
        { text: "Dice the carrot and onion and chop the parsley.", media: "" },
        { text: "Mix the lentils with the vegetables and parsley.", media: "" },
        { text: "Dress with oil, vinegar and salt and serve cold.", media: "" },
      ],
    },
    {
      id: "turkish-tea", name: "Turkish tea", prepMinutes: 10, portions: 1,
      ingredients: [
        { ingredientId: "tea", qty: 5 }, { ingredientId: "sugar", qty: 8 },
      ],
      steps: [
        { text: "Fill the lower pot with water and bring it to the boil.", media: "" },
        { text: "Put the tea leaves in the upper pot and pour a little boiling water over them.", media: "" },
        { text: "Let it steep for 10 minutes on low heat.", media: "" },
        { text: "Pour into a glass, dilute with hot water and serve with sugar.", media: "" },
      ],
    },
    {
      id: "lahmacun", name: "Lahmacun with ayran", prepMinutes: 35, portions: 1,
      ingredients: [
        { ingredientId: "flour", qty: 120 }, { ingredientId: "mince", qty: 80 }, { ingredientId: "onion", qty: 30 }, { ingredientId: "parsley", qty: 5 }, { ingredientId: "tomato", qty: 50 }, { ingredientId: "tpaste", qty: 10 }, { ingredientId: "oil", qty: 10 }, { ingredientId: "salt", qty: 2 }, { ingredientId: "ayran", qty: 250 },
      ],
      steps: [
        { text: "Thaw the minced beef in the refrigerator; make a dough with flour, water and salt.", media: "" },
        { text: "Mix the mince with chopped onion, tomato, parsley, tomato paste and oil.", media: "" },
        { text: "Roll the dough very thin and spread the mixture on top.", media: "" },
        { text: "Bake at 250 °C for 7 minutes and serve with a glass of ayran.", media: "" },
      ],
    },
    {
      id: "cabbage-rolls", name: "Stuffed cabbage rolls", prepMinutes: 60, portions: 1,
      ingredients: [
        { ingredientId: "cabbage", qty: 200 }, { ingredientId: "rice", qty: 40 }, { ingredientId: "mince", qty: 60 }, { ingredientId: "onion", qty: 30 }, { ingredientId: "tpaste", qty: 10 }, { ingredientId: "oil", qty: 10 }, { ingredientId: "salt", qty: 3 },
      ],
      steps: [
        { text: "Thaw the minced beef in the refrigerator; boil the cabbage leaves for 5 minutes.", media: "" },
        { text: "Mix the mince, rice, grated onion, tomato paste, oil and salt.", media: "" },
        { text: "Put a spoon of filling on each leaf and roll it up.", media: "" },
        { text: "Pack the rolls in a pot, add hot water and simmer covered for 40 minutes.", media: "" },
      ],
    },
    {
      id: "sucuk-egg", name: "Sucuk and eggs", prepMinutes: 10, portions: 1,
      ingredients: [
        { ingredientId: "sucuk", qty: 60 }, { ingredientId: "egg", qty: 2 }, { ingredientId: "springonion", qty: 15 }, { ingredientId: "butter", qty: 5 }, { ingredientId: "pepper", qty: 1 },
      ],
      steps: [
        { text: "Slice the sucuk and chop the spring onion.", media: "" },
        { text: "Fry the sucuk slices in butter for 2 minutes.", media: "" },
        { text: "Crack in the eggs and cook until the whites are set.", media: "" },
        { text: "Top with spring onion and pepper and serve in the pan.", media: "" },
      ],
    },
    {
      id: "okra-stew", name: "Okra stew", prepMinutes: 40, portions: 1,
      ingredients: [
        { ingredientId: "okra", qty: 150 }, { ingredientId: "onion", qty: 30 }, { ingredientId: "tomato", qty: 100 }, { ingredientId: "tpaste", qty: 10 }, { ingredientId: "oil", qty: 15 }, { ingredientId: "salt", qty: 2 }, { ingredientId: "lemon", qty: 0.25 },
      ],
      steps: [
        { text: "Dice the onion and tomato.", media: "" },
        { text: "Sauté the onion in oil and add the tomato paste.", media: "" },
        { text: "Add the tomato and the frozen okra straight from the freezer (do not thaw).", media: "" },
        { text: "Simmer covered for 25 minutes, finish with lemon juice and salt.", media: "" },
      ],
    },
    {
      id: "apple-tart", name: "Apple puff pastry tart", prepMinutes: 35, portions: 1,
      ingredients: [
        { ingredientId: "pastry", qty: 120 }, { ingredientId: "apple", qty: 1 }, { ingredientId: "sugar", qty: 20 }, { ingredientId: "cinnamon", qty: 1 }, { ingredientId: "butter", qty: 10 },
      ],
      steps: [
        { text: "Thaw the puff pastry in the refrigerator and roll it out.", media: "" },
        { text: "Slice the apple thinly and arrange it on the pastry.", media: "" },
        { text: "Sprinkle with sugar and cinnamon and dot with butter.", media: "" },
        { text: "Bake at 200 °C for 25 minutes until golden.", media: "" },
      ],
    },
    {
      id: "choc-pudding", name: "Chocolate pudding", prepMinutes: 20, portions: 1,
      ingredients: [
        { ingredientId: "milk", qty: 250 }, { ingredientId: "cocoa", qty: 15 }, { ingredientId: "sugar", qty: 35 }, { ingredientId: "cornstarch", qty: 20 },
      ],
      steps: [
        { text: "Mix the sugar, cocoa and cornstarch in a pot.", media: "" },
        { text: "Slowly add the cold milk and whisk until smooth.", media: "" },
        { text: "Cook on medium heat, stirring, until thick.", media: "" },
        { text: "Pour into cups, cool and serve cold.", media: "" },
      ],
    },
    {
      id: "walnut-cookies", name: "Honey walnut cookies", prepMinutes: 30, portions: 1,
      ingredients: [
        { ingredientId: "flour", qty: 100 }, { ingredientId: "butter", qty: 50 }, { ingredientId: "sugar", qty: 40 }, { ingredientId: "walnut", qty: 20 }, { ingredientId: "bakingpowder", qty: 2 }, { ingredientId: "egg", qty: 1 }, { ingredientId: "honey", qty: 10 },
      ],
      steps: [
        { text: "Cream the soft butter with the sugar and egg.", media: "" },
        { text: "Mix in the flour, baking powder and chopped walnuts.", media: "" },
        { text: "Shape small balls and place them on a baking tray.", media: "" },
        { text: "Bake at 180 °C for 15 minutes and brush with honey.", media: "" },
      ],
    },
    {
      id: "pastry-rolls", name: "Cheese olive pastry rolls", prepMinutes: 30, portions: 1,
      ingredients: [
        { ingredientId: "pastry", qty: 100 }, { ingredientId: "kashar", qty: 40 }, { ingredientId: "olive", qty: 15 }, { ingredientId: "egg", qty: 1 },
      ],
      steps: [
        { text: "Thaw the puff pastry in the refrigerator and cut it into strips.", media: "" },
        { text: "Put grated kashar and chopped olives on each strip and roll up.", media: "" },
        { text: "Brush the rolls with beaten egg.", media: "" },
        { text: "Bake at 200 °C for 18 minutes until golden.", media: "" },
      ],
    },
  ],

  orders: [],      // { id, recipeId, portions, status: "waiting"|"preparing"|"done", createdAt, startedAt, finishedAt }
  stockLog: [],    // { at, ingredientId, change, reason }
};

// Every demo step gets its illustration: img/steps/<recipe-id>-<step number>.svg
// The three first recipes use the drawn illustrations in img/steps/. All other recipes get an
// illustration generated in the browser (emoji + step text), so the project stays small.
const STEP_EMOJI = {
  "apple-tart": ["🧊", "🍎", "🍬", "♨️"],
  "beef-stew": ["🔪", "🥩", "🍅", "🥔"],
  "berry-dessert": ["🍓", "🍨", "🫐", "🍯"],
  "bolognese": ["🧊", "🍳", "🍅", "🍝"],
  "borek": ["🧊", "🧀", "🥟", "♨️"],
  "bread": ["🥣", "🤲", "⏲️", "🍞"],
  "bulgur-pilaf": ["🧅", "🍅", "🌾", "🍚"],
  "cabbage-rolls": ["🧊", "🥣", "🥬", "♨️"],
  "cacik": ["🥒", "🧄", "🥄", "🫒"],
  "calamari": ["🧊", "🥣", "🍤", "🍋"],
  "chicken-corn-salad": ["🧊", "🍳", "🥬", "🥗"],
  "chicken-soup": ["🧊", "🥕", "🍲", "🍜"],
  "choc-pudding": ["🥣", "🥛", "🔥", "🍮"],
  "chocolate-cake": ["🥚", "🍫", "🎂", "♨️"],
  "eggplant-gratin": ["🍆", "🍳", "🥘", "🧀"],
  "fries": ["🛢️", "🍟", "📄", "🧂"],
  "green-lentil-salad": ["🫘", "🥕", "🥣", "🥗"],
  "hummus": ["💧", "🧄", "🥣", "🫒"],
  "lahmacun": ["🧊", "🥣", "🫓", "🔥"],
  "lentil-soup": ["🥕", "🧈", "🍲", "🥣"],
  "meatballs": ["🧊", "🧅", "🍡", "🍳"],
  "mushroom-omelette": ["🍄", "🧈", "🥚", "🧀"],
  "oatmeal": ["🥛", "🌾", "🍎", "🥣"],
  "okra-stew": ["🧅", "🫒", "🌿", "🍋"],
  "pancakes": ["🥣", "⏲️", "🥞", "🍯"],
  "pastry-rolls": ["🧊", "🧀", "🥚", "♨️"],
  "pea-rice": ["🧅", "🍚", "🫛", "🍽️"],
  "pizza": ["🧊", "🍕", "🧀", "🔥"],
  "rice-pudding": ["🍚", "🥛", "🥄", "🍮"],
  "sea-bass": ["🧊", "🥔", "🐟", "♨️"],
  "semolina-halva": ["🧈", "🥛", "🥄", "🌰"],
  "shepherd-salad": ["🥒", "🔪", "🌿", "🥗"],
  "shrimp-casserole": ["🧊", "🧈", "🍲", "🧀"],
  "spinach-pie": ["🧊", "🧅", "🥟", "♨️"],
  "stuffed-peppers": ["🧊", "🥣", "🫑", "♨️"],
  "sucuk-egg": ["🔪", "🍳", "🥚", "🌱"],
  "turkish-tea": ["♨️", "🍃", "⏲️", "🍵"],
  "veg-saute": ["🧅", "🫒", "🥦", "🥘"],
  "walnut-cookies": ["🧈", "🥣", "🍪", "🍯"],
  "white-beans": ["💧", "🧅", "🫘", "🍲"],
  "zucchini-fritters": ["🥒", "🥣", "🍳", "🍽️"],
};

function stepArt(n, emoji, text, dish) {
  const x = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = [];
  let cur = "";
  text.split(" ").forEach((w) => {
    if ((cur + " " + w).trim().length > 38) { lines.push(cur); cur = w; } else { cur = (cur + " " + w).trim(); }
  });
  if (cur) lines.push(cur);
  const tspans = lines.slice(0, 3).map((l, k) => `<tspan x="320" dy="${k ? 26 : 0}">${x(l)}</tspan>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="640" height="360">` +
    `<rect width="640" height="360" fill="#fdf6ec"/><rect y="292" width="640" height="68" fill="#c8a27a"/><rect y="292" width="640" height="8" fill="#b08860"/>` +
    `<circle cx="44" cy="44" r="24" fill="#c2410c"/><text x="44" y="53" font-size="26" font-weight="700" text-anchor="middle" fill="#fff" font-family="system-ui, sans-serif">${n}</text>` +
    `<text x="320" y="170" font-size="110" text-anchor="middle">${emoji}</text>` +
    `<text x="320" y="228" font-size="20" text-anchor="middle" fill="#1f2328" font-family="system-ui, sans-serif">${tspans}</text>` +
    `<text x="320" y="334" font-size="16" text-anchor="middle" fill="#fff" font-family="system-ui, sans-serif">${x(dish)}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

SEED.recipes.forEach((r) => r.steps.forEach((s, i) => {
  if (s.media) return;
  const e = STEP_EMOJI[r.id];
  s.media = e ? stepArt(i + 1, e[i], s.text, r.name) : `img/steps/${r.id}-${i + 1}.svg`;
}));

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
