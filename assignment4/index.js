import {
  fetchHouses,
  getScareText,
  createErrorBox,
  formatPrice,
  getAllGhostTypes,
} from "./utils.js";

const housesContainer = document.getElementById("houses-container");
const errorBox = document.getElementById("error-box");
const noResults = document.getElementById("no-results");

const filterForm = document.getElementById("filter-form");
const maxPriceInput = document.getElementById("max-price");
const minScareInput = document.getElementById("min-scare");
const scareLabel = document.getElementById("scare-label");
const ghostTypeSelect = document.getElementById("ghost-type");
const wifiOnlyInput = document.getElementById("wifi-only");

let houses = [];

function renderGhostOptions(houses) {
  const ghostTypes = getAllGhostTypes(houses);

  ghostTypes.forEach((ghost) => {
    const option = document.createElement("option");
    option.value = ghost;
    option.textContent = ghost;
    ghostTypeSelect.append(option);
  });
}

function renderHouses(houseList) {
  housesContainer.innerHTML = "";

  if (houseList.length === 0) {
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");

  houseList.forEach((house) => {
    const article = document.createElement("article");
    article.className = "house-card";

    article.innerHTML = `
      <img src="images/${house.image}" alt="${house.name}">
      <h3>${house.name}</h3>
      <div class="card-meta">
        <p><strong>Plats:</strong> ${house.location}</p>
        <p><strong>Pris:</strong> ${formatPrice(house.pricePerNight)} / natt</p>
        <p><strong>Skräcknivå:</strong> ${getScareText(house.scareLevel)}</p>
      </div>
      <a class="btn" href="house.html?id=${house.id}">Läs mer och boka</a>
    `;

    housesContainer.append(article);
  });
}

function filterHouses() {
  const maxPrice = Number(maxPriceInput.value);
  const minScare = Number(minScareInput.value);
  const ghostType = ghostTypeSelect.value;
  const wifiOnly = wifiOnlyInput.checked;

  scareLabel.textContent = getScareText(minScare);

  const filtered = houses.filter((house) => {
    const matchesPrice = !maxPrice || house.pricePerNight <= maxPrice;
    const matchesScare = house.scareLevel >= minScare;
    const matchesGhost =
      ghostType === "all" || house.ghostTypes.includes(ghostType);
    const matchesWifi = !wifiOnly || house.hasWifi === true;

    return matchesPrice && matchesScare && matchesGhost && matchesWifi;
  });

  renderHouses(filtered);
}

async function init() {
  try {
    houses = await fetchHouses();

    renderGhostOptions(houses);
    renderHouses(houses);
    scareLabel.textContent = getScareText(Number(minScareInput.value));

    maxPriceInput.addEventListener("input", filterHouses);
    minScareInput.addEventListener("input", filterHouses);
    ghostTypeSelect.addEventListener("change", filterHouses);
    wifiOnlyInput.addEventListener("change", filterHouses);
    filterForm.addEventListener("submit", (event) => event.preventDefault());
  } catch (error) {
    errorBox.innerHTML = createErrorBox(error.message);
  }
}

init();
