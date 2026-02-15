// Importerar produktdatan och navigationen
import { products } from "./products.js";
import { generateNavigation } from "../js/navigation.js";

// Hämtar HTML-element vi ska jobba med
const productGridEl = document.getElementById("productGrid");
const cartRootEl = document.getElementById("cart");

// Nyckel för localStorage 
const STORAGE_KEY = "assignment2_cart_v1";

// cart är ett objekt som sparar antal produkter
// exempel: { "prod-001": 2, "prod-003": 1 }
let cart = loadCart();


// =====================
// START
// =====================

// Skapar navigationen i headern
generateNavigation("site-header");

// Bygger HTML-strukturen för kundvagnen
buildCartShell();

// Renderar produkter och kundvagn
renderProducts();
renderCart();


// =====================
// PRODUKTER
// =====================

// Denna funktion skapar alla produktkort från products-arrayen
function renderProducts() {
  if (!productGridEl) return;

  // Töm grid först
  productGridEl.innerHTML = "";

  // Loopar igenom alla produkter
  products.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product-card";

    // HTML för ett produktkort
    // Här använder vi samma klasser som i CSS
    card.innerHTML = `
      <div class="product-media">
        <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy">
      </div>

      <div class="product-body">
        <div class="product-top">
          <h3>${escapeHtml(p.name)}</h3>
          <span class="price">${formatPrice(p.price)}</span>
        </div>

        <p class="desc">${escapeHtml(p.description)}</p>

        <div class="meta">
          ${renderCategoryTags(p.category)}
        </div>

        <button class="btn add-to-cart" type="button">Lägg i kundvagn</button>
      </div>
    `;

    // När man klickar på knappen läggs produkten i kundvagnen
    card.querySelector("button").addEventListener("click", () => addToCart(p.id));

    // Lägg kortet i gridet
    productGridEl.appendChild(card);
  });
}


// Gör om category till små "taggar"
// category kan vara en sträng eller en array
function renderCategoryTags(category) {
  if (!category) return "";

  const categories = Array.isArray(category) ? category : [category];

  return categories
    .map((c) => `<span class="tag">${escapeHtml(c)}</span>`)
    .join("");
}


// =====================
// KUNDVAGN UI
// =====================

// Skapar HTML-strukturen för kundvagnen
function buildCartShell() {
  if (!cartRootEl) return;

  cartRootEl.innerHTML = `
    <div class="cart-header">
      <h2>Kundvagn</h2>
      <p class="cart-subtitle">Sparas i localStorage.</p>
    </div>

    <div class="cart-body">
      <div class="cart-empty" id="cartEmpty">
        <p>Din kundvagn är tom.</p>
      </div>
      <ul class="cart-list" id="cartList"></ul>
    </div>

    <div class="cart-footer">
      <div class="cart-total">
        <span>Totalt</span>
        <strong id="cartTotal">0 kr</strong>
      </div>
      <button class="btn btn-danger" id="clearCart" type="button">Töm kundvagn</button>
    </div>
  `;

  // Kopplar knapp till clearCart-funktionen
  document.getElementById("clearCart").addEventListener("click", clearCart);
}


// =====================
// KUNDVAGN LOGIK
// =====================

// Lägger till en produkt i kundvagnen
function addToCart(productId) {
  // Om produkten inte finns än → börja på 0
  // annars öka med 1
  cart[productId] = (cart[productId] || 0) + 1;

  saveCart();
  renderCart();
}


// Tömmer kundvagnen
function clearCart() {
  cart = {};
  saveCart();
  renderCart();
}


// Renderar innehållet i kundvagnen
function renderCart() {
  const listEl = document.getElementById("cartList");
  const emptyEl = document.getElementById("cartEmpty");
  const totalEl = document.getElementById("cartTotal");

  if (!listEl || !emptyEl || !totalEl) return;

  const ids = Object.keys(cart);

  // Om kundvagnen är tom
  if (ids.length === 0) {
    emptyEl.style.display = "block";
    listEl.style.display = "none";
    listEl.innerHTML = "";
    totalEl.textContent = "0 kr";
    return;
  }

  emptyEl.style.display = "none";
  listEl.style.display = "block";
  listEl.innerHTML = "";

  let total = 0;

  ids.forEach((id) => {
    const qty = cart[id];

    // Hittar produkten i products-arrayen
    const p = products.find((x) => x.id === id);
    if (!p) return;

    const lineTotal = p.price * qty;
    total += lineTotal;

    const li = document.createElement("li");
    li.className = "cart-item";

    li.innerHTML = `
      <div class="left">
        <div class="name">${escapeHtml(p.name)}</div>
        <div class="qty">Antal: ${qty}</div>
      </div>
      <div class="right">${formatPrice(lineTotal)}</div>
    `;

    listEl.appendChild(li);
  });

  totalEl.textContent = formatPrice(total);
}


// =====================
// LOCAL STORAGE
// =====================

// Hämtar kundvagnen från localStorage
function loadCart() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

// Sparar kundvagnen i localStorage
function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}


// =====================
// HJÄLPFUNKTIONER
// =====================

// Formaterar pris
function formatPrice(n) {
  return `${Number(n) || 0} kr`;
}

// Skyddar text som skrivs in i HTML
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
