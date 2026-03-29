import {
  fetchHouses,
  getScareText,
  createErrorBox,
  formatPrice,
  getTodayString,
} from "utils.js";
import { Booking } from "./booking.js";

const houseDetails = document.getElementById("house-details");
const houseError = document.getElementById("house-error");

const weatherSection = document.getElementById("weather-section");
const weatherContent = document.getElementById("weather-content");

const bookingSection = document.getElementById("booking-section");
const bookingForm = document.getElementById("booking-form");
const totalPriceEl = document.getElementById("total-price");
const bookingErrors = document.getElementById("booking-errors");
const bookingConfirmation = document.getElementById("booking-confirmation");

function getHouseIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

function renderHouse(house) {
  houseDetails.innerHTML = `
    <article class="house-detail-card">
      <img src="images/${house.image}" alt="${house.name}">
      <h2>${house.name}</h2>
      <div class="detail-meta">
        <p><strong>Plats:</strong> ${house.location}</p>
        <p><strong>Beskrivning:</strong> ${house.description}</p>
        <p><strong>Pris per natt:</strong> ${formatPrice(house.pricePerNight)}</p>
        <p><strong>Skräcknivå:</strong> ${getScareText(house.scareLevel)}</p>
        <p><strong>Spöktyper:</strong> ${house.ghostTypes.join(", ")}</p>
        <p><strong>WiFi:</strong> ${house.hasWifi ? "Ja" : "Nej"}</p>
      </div>
    </article>
  `;
}

async function fetchWeather(lat, lng) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,weather_code`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Kunde inte hämta väderdata.");
  }

  return await response.json();
}

function renderWeather(weatherData) {
  const current = weatherData.current;

  weatherContent.innerHTML = `
    <div class="message">
      <p><strong>Temperatur:</strong> ${current.temperature_2m} °C</p>
      <p><strong>Vind:</strong> ${current.wind_speed_10m} km/h</p>
      <p><strong>Väderkod:</strong> ${current.weather_code}</p>
    </div>
  `;

  weatherSection.classList.remove("hidden");
}

function renderInvalidIdMessage() {
  houseError.innerHTML = createErrorBox(`
    Kunde inte hitta något hus med det angivna id:t.
    <br>
    <a href="index.html">Tillbaka till översiktssidan</a>
  `);
}

async function init() {
  try {
    const houseId = getHouseIdFromUrl();

    if (!houseId) {
      renderInvalidIdMessage();
      return;
    }

    const houses = await fetchHouses();
    const house = houses.find((item) => item.id === houseId);

    if (!house) {
      renderInvalidIdMessage();
      return;
    }

    renderHouse(house);

    document.getElementById("checkin").min = getTodayString();

    bookingSection.classList.remove("hidden");

    const booking = new Booking(house, bookingForm, {
      totalPriceEl,
      errorsEl: bookingErrors,
      confirmationEl: bookingConfirmation,
    });

    booking.updatePrice();

    bookingForm.addEventListener("input", () => {
      booking.renderErrors([]);
      booking.updatePrice();
    });

    bookingForm.addEventListener("submit", (event) => {
      booking.handleSubmit(event);
    });

    try {
      const weatherData = await fetchWeather(
        house.coordinates.lat,
        house.coordinates.lng,
      );
      renderWeather(weatherData);
    } catch (apiError) {
      weatherSection.classList.remove("hidden");
      weatherContent.innerHTML = createErrorBox(apiError.message);
    }
  } catch (error) {
    houseError.innerHTML = createErrorBox(error.message);
  }
}

init();
