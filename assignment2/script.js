
import { products } from "./products.js";
import { generateNavigation } from "../js/navigation.js";
console.log("script.js laddad ✅");

const productGridEl = document.getElementById("productGrid");
const cartRootEl = document.getElementById("cart");

const STORAGE_KEY = "assignment2_cart_v1";
let cart = loadCart();

initNavigation();
buildCartShell();
renderProducts();
renderCart();

function initNavigation() {
  // din navigation.js kan heta olika saker, så vi försöker smart:
  const headerId = "site-header";

  if (typeof generateNavigation === "function") generateNavigation(headerId);
  else if (typeof createNavigation === "function") createNavigation(headerId);
  else if (typeof renderNavigation === "function") renderNavigation(headerId);
  else {
    // fallback så du ser att headern inte är trasig
    document.getElementById(headerId).innerHTML = `<div style="padding:1rem"><strong>Header</strong> (navigation.js laddad men ingen känd funktion hittad)</div>`;
  }
}

function renderProducts() {
  if (!productGridEl) return;

  if (typeof products === "undefined") {
    productGridEl.innerHTML = "<p> products är undefined (products.js laddades inte).</p>";
    return;
  }

  productGridEl.innerHTML = "";

  products.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product-card";
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
          ${(p.category || []).map(c => `<span class="tag">${escapeHtml(c)}</span>`).join("")}
        </div>
        <button class="btn add-to-cart" type="button">Lägg i kundvagn</button>
      </div>
    `;

    card.querySelector("button").addEventListener("click", () => addToCart(p.id));
    productGridEl.appendChild(card);
  });
}

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

  document.getElementById("clearCart").addEventListener("click", clearCart);
}

function addToCart(productId) {
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart();
  renderCart();
}

function clearCart() {
  cart = {};
  saveCart();
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cartList");
  const empty = document.getElementById("cartEmpty");
  const totalEl = document.getElementById("cartTotal");
  if (!list || !empty || !totalEl) return;

  const entries = Object.entries(cart);

  if (entries.length === 0) {
    empty.style.display = "block";
    list.style.display = "none";
    list.innerHTML = "";
    totalEl.textContent = "0 kr";
    return;
  }

  empty.style.display = "none";
  list.style.display = "block";
  list.innerHTML = "";

  let total = 0;

  entries.forEach(([id, qty]) => {
    const p = products.find(x => x.id === id);
    if (!p) return;

    const line = p.price * qty;
    total += line;

    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <div class="left">
        <div class="name">${escapeHtml(p.name)}</div>
        <div class="qty">Antal: ${qty}</div>
      </div>
      <div class="right">${formatPrice(line)}</div>
    `;
    list.appendChild(li);
  });

  totalEl.textContent = formatPrice(total);
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function formatPrice(n) {
  return `${(Number(n) || 0).toLocaleString("sv-SE")} kr`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
