// Kitchen Management Program – draft
// Flow: purchase → stock → order (entered manually) → preparation (timed) → dish ready, stock deducted.

const KEY = "kitchen-mgmt-v1";
let state = load();

// ---------- persistence ----------
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* storage unavailable: fall back to seed */ }
  return freshState();
}

let knownLow = new Set(state.ingredients.filter((i) => i.quantity <= i.minLevel).map((i) => i.id));

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    toast("⚠️ Could not save: browser storage is full. Use smaller photos or video links instead.", "error");
  }
  checkLowStock();
  render();
}

// ---------- low-stock alert: fires the moment an item drops to/below its minimum ----------
function checkLowStock() {
  const lowNow = state.ingredients.filter(isLow);
  lowNow.filter((i) => !knownLow.has(i.id)).forEach((i) => {
    const s = STORAGE_TYPES[i.storage];
    toast(`⚠️ <b>Low stock: ${esc(i.name)}</b><br>${i.quantity} ${i.unit} left (minimum ${i.minLevel} ${i.unit}).<br>Stored in: ${s.icon} ${s.label}. Please reorder.`, "warn");
  });
  knownLow = new Set(lowNow.map((i) => i.id));
}

function toast(html, kind = "info") {
  const el = document.createElement("div");
  el.className = `toast ${kind}`;
  el.innerHTML = `<div>${html}</div><button class="link" aria-label="Close">✕</button>`;
  el.querySelector("button").onclick = () => el.remove();
  $("#toasts").appendChild(el);
  if (kind === "info") setTimeout(() => el.remove(), 4000);   // warnings stay until closed
}

// ---------- photo upload: resize in the browser, keep as data URL ----------
function readPhoto(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) return reject(new Error("Please choose an image file (JPG, PNG…)."));
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 800 / img.width);
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(img.src);
      resolve(c.toDataURL("image/jpeg", 0.75));
    };
    img.onerror = () => reject(new Error("This image could not be read."));
    img.src = URL.createObjectURL(file);
  });
}

// ---------- helpers ----------
const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const uid = () => Math.random().toString(36).slice(2, 9);
const ing = (id) => state.ingredients.find((i) => i.id === id);
const recipe = (id) => state.recipes.find((r) => r.id === id);
const isLow = (i) => i.quantity <= i.minLevel;
const fmtTime = (t) => (t ? new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "–");
const minutesBetween = (a, b) => Math.max(0, Math.round((b - a) / 60000));

function logStock(ingredientId, change, reason) {
  state.stockLog.unshift({ at: Date.now(), ingredientId, change, reason });
  state.stockLog = state.stockLog.slice(0, 200);
}

// ---------- domain logic ----------
function purchase(ingredientId, qty) {
  const i = ing(ingredientId);
  i.quantity += qty;
  logStock(ingredientId, +qty, "Purchase");
}

/** Returns a list of missing ingredients for the given recipe and portions (empty = enough stock). */
function missingFor(r, portions) {
  return r.ingredients
    .map((x) => ({ i: ing(x.ingredientId), need: x.qty * portions }))
    .filter(({ i, need }) => !i || i.quantity < need);
}

function startOrder(order) {
  const r = recipe(order.recipeId);
  const missing = missingFor(r, order.portions);
  if (missing.length) {
    alert("Not enough stock:\n" + missing.map(({ i, need }) => `• ${i ? i.name : "?"}: need ${need}, have ${i ? i.quantity : 0}`).join("\n"));
    return;
  }
  r.ingredients.forEach((x) => {
    const used = x.qty * order.portions;
    ing(x.ingredientId).quantity -= used;
    logStock(x.ingredientId, -used, `Order: ${r.name} ×${order.portions}`);
  });
  order.status = "preparing";
  order.startedAt = Date.now();
}

function finishOrder(order) {
  order.status = "done";
  order.finishedAt = Date.now();
}

function prepStats(recipeId) {
  const done = state.orders.filter((o) => o.recipeId === recipeId && o.status === "done");
  if (!done.length) return null;
  const avg = done.reduce((s, o) => s + minutesBetween(o.startedAt, o.finishedAt), 0) / done.length;
  return { count: done.length, avg: Math.round(avg) };
}

// ---------- views ----------
const views = {
  dashboard() {
    const low = state.ingredients.filter(isLow);
    const active = state.orders.filter((o) => o.status !== "done");
    return `
      <h2>Dashboard</h2>
      <div class="cards">
        <div class="card stat"><span>${state.ingredients.length}</span>Ingredients</div>
        <div class="card stat ${low.length ? "warn" : ""}"><span>${low.length}</span>Low-stock alerts</div>
        <div class="card stat"><span>${active.length}</span>Active orders</div>
        <div class="card stat"><span>${state.recipes.length}</span>Recipes</div>
      </div>
      <h3>⚠️ Low-stock alerts</h3>
      ${low.length ? `<ul class="alerts">${low.map((i) =>
        `<li><b>${esc(i.name)}</b> – ${i.quantity} ${i.unit} left (minimum ${i.minLevel} ${i.unit}) · ${STORAGE_TYPES[i.storage].icon} ${STORAGE_TYPES[i.storage].label}</li>`).join("")}</ul>`
        : `<p class="ok">All stock levels are above their minimum.</p>`}
      <h3>Recent stock movements</h3>
      ${stockLogTable(8)}
    `;
  },

  stock() {
    const opts = state.ingredients.map((i) => `<option value="${i.id}">${esc(i.name)} (${i.unit})</option>`).join("");
    return `
      <h2>Stock</h2>
      <form class="row" data-form="purchase">
        <b>Record a purchase:</b>
        <select name="id">${opts}</select>
        <input name="qty" type="number" min="1" placeholder="Quantity" required>
        <button>Add to stock</button>
      </form>
      <table>
        <thead><tr><th>Ingredient</th><th>Quantity</th><th>Min. level</th><th>Storage</th><th>Status</th><th></th></tr></thead>
        <tbody>${state.ingredients.map((i) => `
          <tr class="${isLow(i) ? "low" : ""}">
            <td>${esc(i.name)}</td>
            <td>${i.quantity} ${i.unit}</td>
            <td><input class="mini" type="number" min="0" value="${i.minLevel}" data-min="${i.id}"> ${i.unit}</td>
            <td><select data-storage="${i.id}">${Object.entries(STORAGE_TYPES).map(([k, s]) =>
              `<option value="${k}" ${k === i.storage ? "selected" : ""}>${s.icon} ${s.label}</option>`).join("")}</select></td>
            <td>${isLow(i) ? "⚠️ Low" : "✅ OK"}</td>
            <td><button class="link" data-del-ing="${i.id}">Delete</button></td>
          </tr>`).join("")}
        </tbody>
      </table>
      <form class="row" data-form="new-ingredient">
        <b>New ingredient:</b>
        <input name="name" placeholder="Name" required>
        <select name="unit"><option>g</option><option>ml</option><option>pcs</option></select>
        <input name="quantity" type="number" min="0" placeholder="Initial qty" required>
        <input name="minLevel" type="number" min="0" placeholder="Min. level" required>
        <select name="storage">${Object.entries(STORAGE_TYPES).map(([k, s]) => `<option value="${k}">${s.label}</option>`).join("")}</select>
        <button>Add</button>
      </form>
      <h3>Stock movements</h3>
      ${stockLogTable(30)}
    `;
  },

  recipes() {
    return `
      <h2>Recipes</h2>
      <div class="cards">${state.recipes.map((r) => {
        const st = prepStats(r.id);
        return `<div class="card recipe">
          <h3>${esc(r.name)}</h3>
          <p>⏱ Planned: <b>${r.prepMinutes} min</b>${st ? ` · Actual avg: <b>${st.avg} min</b> (${st.count} orders)` : ""}</p>
          <ul>${r.ingredients.map((x) => {
            const i = ing(x.ingredientId);
            return `<li>${esc(i ? i.name : x.ingredientId)} – ${x.qty} ${i ? i.unit : ""}</li>`;
          }).join("")}</ul>
          <p class="muted">${r.steps.length} steps · ${r.steps.filter((s) => s.media).length} with photo/video</p>
          <button data-guide="${r.id}">Open visual guide</button>
          <button class="link" data-edit-recipe="${r.id}">Edit</button>
          <button class="link" data-del-recipe="${r.id}">Delete</button>
        </div>`;
      }).join("")}</div>
      ${recipeForm()}
    `;
  },

  orders() {
    const opts = state.recipes.map((r) => `<option value="${r.id}">${esc(r.name)}</option>`).join("");
    const cols = [["waiting", "📝 Waiting"], ["preparing", "🔥 Preparing"], ["done", "✅ Done"]];
    return `
      <h2>Orders & preparation time</h2>
      <form class="row" data-form="new-order">
        <b>Enter an order (manual):</b>
        <select name="recipeId">${opts}</select>
        <input name="portions" type="number" min="1" value="1" class="mini">
        <button>Add order</button>
      </form>
      <div class="board">${cols.map(([status, title]) => `
        <div class="col"><h3>${title}</h3>
          ${state.orders.filter((o) => o.status === status).slice(0, 15).map((o) => orderCard(o)).join("") || `<p class="muted">Empty</p>`}
        </div>`).join("")}
      </div>
    `;
  },

  guide() {
    const r = recipe(ui.guideRecipe) || state.recipes[0];
    if (!r) return `<h2>Visual recipe guide</h2><p>No recipes yet.</p>`;
    const step = Math.min(ui.guideStep, r.steps.length - 1);
    const s = r.steps[step];
    return `
      <h2>Visual recipe guide <span class="muted">for new kitchen staff</span></h2>
      <div class="row">
        <select data-guide-select>${state.recipes.map((x) => `<option value="${x.id}" ${x.id === r.id ? "selected" : ""}>${esc(x.name)}</option>`).join("")}</select>
        <span>⏱ ${r.prepMinutes} min</span>
      </div>
      <div class="guide card">
        <div class="media">${mediaHtml(s.media, step + 1)}</div>
        <div class="step-text">
          <div class="muted">Step ${step + 1} / ${r.steps.length}</div>
          <p>${esc(s.text)}</p>
          <div class="progress"><div style="width:${((step + 1) / r.steps.length) * 100}%"></div></div>
          <div class="row">
            <button data-step="-1" ${step === 0 ? "disabled" : ""}>◀ Previous</button>
            <button data-step="1" ${step === r.steps.length - 1 ? "disabled" : ""}>Next ▶</button>
          </div>
          <div class="media-tools">
            <span class="muted">Media for this step:</span>
            <label class="btn-secondary">📷 Upload photo<input type="file" accept="image/*" data-upload hidden></label>
            <button class="btn-secondary" data-video-link>🎬 Video / photo link</button>
            ${s.media ? `<button class="link" data-remove-media>Remove</button>` : ""}
          </div>
        </div>
      </div>
      <div class="thumbs">${r.steps.map((x, i) => `
        <button class="thumb ${i === step ? "active" : ""}" data-goto="${i}" title="Step ${i + 1}">
          ${x.media && !/youtu|\.(mp4|webm|ogg)/i.test(x.media) ? `<img src="${esc(x.media)}" alt="">` : `<span>${x.media ? "🎬" : "📷"}</span>`}
          <small>${i + 1}</small>
        </button>`).join("")}
      </div>
      <h3>Ingredients to collect</h3>
      <ul>${r.ingredients.map((x) => {
        const i = ing(x.ingredientId);
        return i ? `<li>${esc(i.name)} – ${x.qty} ${i.unit} · take from ${STORAGE_TYPES[i.storage].icon} ${STORAGE_TYPES[i.storage].label}</li>` : "";
      }).join("")}</ul>
    `;
  },

  storage() {
    return `
      <h2>Storage map</h2>
      <p class="muted">Where each ingredient must be stored.</p>
      <div class="board">${Object.entries(STORAGE_TYPES).map(([k, s]) => `
        <div class="col storage-${k}">
          <h3>${s.icon} ${s.label} <span class="muted">${s.temp}</span></h3>
          <ul>${state.ingredients.filter((i) => i.storage === k).map((i) =>
            `<li class="${isLow(i) ? "low" : ""}">${esc(i.name)} <span class="muted">${i.quantity} ${i.unit}</span></li>`).join("") || "<li class='muted'>Empty</li>"}</ul>
        </div>`).join("")}
      </div>
    `;
  },
};

const UPLOADED = "(uploaded photo)";

function recipeForm() {
  const r = recipe(ui.editRecipe);
  const ingText = r ? r.ingredients.map((x) => `${ing(x.ingredientId)?.name ?? x.ingredientId}, ${x.qty}`).join("\n") : "";
  const stepText = r ? r.steps.map((s) => s.text + (s.media ? ` | ${s.media.startsWith("data:") ? UPLOADED : s.media}` : "")).join("\n") : "";
  return `
    <h3 id="recipe-form">${r ? `Edit recipe: ${esc(r.name)}` : "Add a recipe"}</h3>
    <form data-form="recipe" class="stack">
      <div class="row"><input name="name" placeholder="Dish name" value="${esc(r?.name)}" required>
        <input name="prepMinutes" type="number" min="1" placeholder="Prep time (min)" value="${r ? r.prepMinutes : ""}" required></div>
      <label>Ingredients per portion (one per line: <code>ingredient name, quantity</code>)</label>
      <textarea name="ingredients" rows="5" placeholder="Egg, 2&#10;Tomato, 150" required>${esc(ingText)}</textarea>
      <label>Steps (one per line: <code>instruction | optional photo or video link</code>). You can also upload photos from the <b>Staff guide</b> tab.</label>
      <textarea name="steps" rows="5" placeholder="Chop the onions | https://example.com/onion.jpg" required>${esc(stepText)}</textarea>
      <div class="row"><button>${r ? "Save changes" : "Save recipe"}</button>${r ? `<button type="button" class="link" data-cancel-edit>Cancel</button>` : ""}</div>
    </form>`;
}

function saveRecipe(v) {
  const ingredients = [];
  for (const line of v.ingredients.split("\n").filter((l) => l.trim())) {
    const [name, qty] = line.split(",").map((s) => s.trim());
    const found = state.ingredients.find((i) => i.name.toLowerCase() === name.toLowerCase());
    if (!found) { alert(`Unknown ingredient "${name}". Add it on the Stock page first.`); return false; }
    if (!(Number(qty) > 0)) { alert(`Please give a quantity for "${name}" (e.g. "${name}, 100").`); return false; }
    ingredients.push({ ingredientId: found.id, qty: Number(qty) });
  }
  const old = recipe(ui.editRecipe);
  const steps = v.steps.split("\n").filter((l) => l.trim()).map((l, idx) => {
    const [text, media = ""] = l.split("|").map((s) => s.trim());
    // keep an uploaded photo when the line still says "(uploaded photo)"
    const keep = media === UPLOADED && old?.steps[idx]?.media.startsWith("data:") ? old.steps[idx].media : "";
    return { text, media: keep || (media === UPLOADED ? "" : media) };
  });
  const data = { name: v.name.trim(), prepMinutes: Number(v.prepMinutes), portions: 1, ingredients, steps };
  if (old) Object.assign(old, data);
  else state.recipes.push({ id: uid(), ...data });
  ui.editRecipe = null;
  toast(old ? "Recipe updated." : "Recipe saved.");
  return true;
}

function orderCard(o) {
  const r = recipe(o.recipeId);
  const name = r ? esc(r.name) : "(deleted recipe)";
  let info = `Entered ${fmtTime(o.createdAt)}`;
  let btn = `<button data-start="${o.id}">Start</button>`;
  if (o.status === "preparing") {
    info = `Started ${fmtTime(o.startedAt)} · ${minutesBetween(o.startedAt, Date.now())} / ${r ? r.prepMinutes * 1 : "?"} min`;
    btn = `<button data-finish="${o.id}">Mark ready</button>`;
  } else if (o.status === "done") {
    const took = minutesBetween(o.startedAt, o.finishedAt);
    const late = r && took > r.prepMinutes;
    info = `Took <b class="${late ? "bad" : "good"}">${took} min</b> (planned ${r ? r.prepMinutes : "?"})`;
    btn = "";
  }
  return `<div class="card order"><b>${name}</b> ×${o.portions}<div class="muted">${info}</div>${btn}</div>`;
}

function mediaHtml(url, n) {
  if (!url) return `<div class="placeholder">📷<br>Step ${n}<br><small>No photo yet – use “Upload photo” below</small></div>`;
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  if (yt) return `<iframe src="https://www.youtube.com/embed/${yt[1]}" allowfullscreen></iframe>`;
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return `<video src="${esc(url)}" controls></video>`;
  return `<img src="${esc(url)}" alt="Step ${n}">`;
}

function stockLogTable(n) {
  const rows = state.stockLog.slice(0, n);
  if (!rows.length) return `<p class="muted">No movements yet.</p>`;
  return `<table><thead><tr><th>Time</th><th>Ingredient</th><th>Change</th><th>Reason</th></tr></thead><tbody>
    ${rows.map((l) => {
      const i = ing(l.ingredientId);
      return `<tr><td>${new Date(l.at).toLocaleString()}</td><td>${esc(i ? i.name : l.ingredientId)}</td>
        <td class="${l.change > 0 ? "good" : "bad"}">${l.change > 0 ? "+" : ""}${l.change} ${i ? i.unit : ""}</td><td>${esc(l.reason)}</td></tr>`;
    }).join("")}</tbody></table>`;
}

// ---------- UI state & rendering ----------
const ui = { tab: "dashboard", guideRecipe: null, guideStep: 0, editRecipe: null };

/** The step currently shown in the Staff guide. */
function currentStep() {
  const r = recipe(ui.guideRecipe) || state.recipes[0];
  return r && r.steps[Math.min(ui.guideStep, r.steps.length - 1)];
}

function render() {
  document.querySelectorAll("nav button").forEach((b) => b.classList.toggle("active", b.dataset.tab === ui.tab));
  const low = state.ingredients.filter(isLow).length;
  $("#badge").textContent = low || "";
  $("#view").innerHTML = views[ui.tab]();
}

// ---------- events ----------
document.addEventListener("click", (e) => {
  const t = e.target.closest("button");
  if (!t) return;
  const d = t.dataset;
  if (d.tab) { ui.tab = d.tab; render(); }
  else if (d.start) { startOrder(state.orders.find((o) => o.id === d.start)); save(); }
  else if (d.finish) { finishOrder(state.orders.find((o) => o.id === d.finish)); save(); }
  else if (d.guide) { ui.tab = "guide"; ui.guideRecipe = d.guide; ui.guideStep = 0; render(); }
  else if (d.step) { ui.guideStep = Math.max(0, ui.guideStep + Number(d.step)); render(); }
  else if (d.goto) { ui.guideStep = Number(d.goto); render(); }
  else if ("videoLink" in d) {
    const s = currentStep();
    const url = prompt("Paste a YouTube link, a video file link (.mp4) or a photo link:", s.media.startsWith("data:") ? "" : s.media);
    if (url !== null && url.trim()) { s.media = url.trim(); save(); }
  }
  else if ("removeMedia" in d && confirm("Remove the photo/video from this step?")) { currentStep().media = ""; save(); }
  else if (d.editRecipe) { ui.editRecipe = d.editRecipe; render(); $("#recipe-form").scrollIntoView({ behavior: "smooth" }); }
  else if ("cancelEdit" in d) { ui.editRecipe = null; render(); }
  else if (d.delIng) {
    const used = state.recipes.filter((r) => r.ingredients.some((x) => x.ingredientId === d.delIng));
    if (used.length) alert(`This ingredient is used in: ${used.map((r) => r.name).join(", ")}. Remove it from those recipes first.`);
    else if (confirm("Delete this ingredient?")) { state.ingredients = state.ingredients.filter((i) => i.id !== d.delIng); save(); }
  }
  else if (d.delRecipe && confirm("Delete this recipe?")) { state.recipes = state.recipes.filter((r) => r.id !== d.delRecipe); save(); }
  else if (t.id === "reset" && confirm("Reset all data to the demo data?")) {
    state = freshState(); ui.editRecipe = null;
    knownLow = new Set(state.ingredients.filter(isLow).map((i) => i.id));
    save();
  }
});

document.addEventListener("change", async (e) => {
  const d = e.target.dataset;
  if ("upload" in d) {
    const file = e.target.files[0];
    if (!file) return;
    try { currentStep().media = await readPhoto(file); save(); toast("Photo added to this step."); }
    catch (err) { alert(err.message); }
  }
  else if (d.min) { ing(d.min).minLevel = Number(e.target.value); save(); }
  else if (d.storage) { ing(d.storage).storage = e.target.value; save(); }
  else if ("guideSelect" in d) { ui.guideRecipe = e.target.value; ui.guideStep = 0; render(); }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const v = Object.fromEntries(new FormData(f));
  switch (f.dataset.form) {
    case "purchase":
      purchase(v.id, Number(v.qty));
      toast(`Purchase recorded: +${Number(v.qty)} ${ing(v.id).unit} ${esc(ing(v.id).name)}.`);
      break;
    case "new-ingredient": {
      const name = v.name.trim();
      if (state.ingredients.some((i) => i.name.toLowerCase() === name.toLowerCase())) { alert(`"${name}" already exists. Use "Record a purchase" instead.`); return; }
      const id = uid();
      state.ingredients.push({ id, name, unit: v.unit, quantity: Number(v.quantity), minLevel: Number(v.minLevel), storage: v.storage });
      if (Number(v.quantity) > 0) logStock(id, Number(v.quantity), "Initial purchase");
      break;
    }
    case "new-order":
      state.orders.unshift({ id: uid(), recipeId: v.recipeId, portions: Number(v.portions) || 1, status: "waiting", createdAt: Date.now() });
      break;
    case "recipe":
      if (!saveRecipe(v)) return;
      break;
  }
  save();
});

// refresh running timers once a minute
setInterval(() => { if (ui.tab === "orders") render(); }, 60000);

render();
