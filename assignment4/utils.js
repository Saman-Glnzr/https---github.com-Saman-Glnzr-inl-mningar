export function getScareText(level) {
  const levels = {
    1: "Mysigt",
    2: "Lite läskigt",
    3: "Obehagligt",
    4: "Skräckinjagande",
    5: "Ren terror",
  };

  return levels[level] || "Okänd skräcknivå";
}

export async function fetchHouses() {
  const response = await fetch("./houses.json");

  if (!response.ok) {
    throw new Error("Kunde inte hämta husdatan.");
  }

  return await response.json();
}

export function createErrorBox(message) {
  return `<div class="error-box">${message}</div>`;
}

export function formatPrice(price) {
  return `${price} kr`;
}

export function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getAllGhostTypes(houses) {
  const allGhosts = [];

  houses.forEach((house) => {
    house.ghostTypes.forEach((ghost) => {
      if (!allGhosts.includes(ghost)) {
        allGhosts.push(ghost);
      }
    });
  });

  return allGhosts.sort();
}
