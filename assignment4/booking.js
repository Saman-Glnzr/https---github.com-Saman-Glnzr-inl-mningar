import { getTodayString } from "./utils.js";

export class Booking {
  constructor(house, form, outputElements) {
    this.house = house;
    this.form = form;
    this.totalPriceEl = outputElements.totalPriceEl;
    this.errorsEl = outputElements.errorsEl;
    this.confirmationEl = outputElements.confirmationEl;

    this.promoCode = "GHOST20";

    this.extraPrices = {
      breakfast: 100,
      ghostTour: 300,
      seance: 500,
    };
  }

  getFormData() {
    const checkin = document.getElementById("checkin").value;
    const days = Number(document.getElementById("days").value);
    const promo = document.getElementById("promo").value.trim();

    const extras = [];
    const checkedExtras = this.form.querySelectorAll(
      'input[name="extras"]:checked',
    );

    checkedExtras.forEach((checkbox) => {
      extras.push(checkbox.value);
    });

    return {
      checkin,
      days,
      extras,
      promo,
    };
  }

  validate() {
    const data = this.getFormData();
    const errors = [];

    if (!data.checkin) {
      errors.push("Du måste välja ett incheckningsdatum.");
    }

    if (data.checkin && data.checkin < getTodayString()) {
      errors.push("Incheckningsdatum kan inte vara tidigare än idag.");
    }

    if (!data.days || data.days < 1) {
      errors.push("Antal dagar måste vara minst 1.");
    }

    return errors;
  }

  calculateTotal() {
    const data = this.getFormData();

    let total = this.house.pricePerNight * data.days;

    data.extras.forEach((extra) => {
      if (extra === "breakfast") {
        total += this.extraPrices.breakfast * data.days;
      } else {
        total += this.extraPrices[extra];
      }
    });

    if (data.promo.toUpperCase() === this.promoCode) {
      total = total * 0.8;
    }

    return Math.round(total);
  }

  updatePrice() {
    const total = this.calculateTotal();
    this.totalPriceEl.textContent = `${total} kr`;
  }

  renderErrors(errors) {
    if (errors.length === 0) {
      this.errorsEl.innerHTML = "";
      return;
    }

    const listItems = errors.map((error) => `<li>${error}</li>`).join("");

    this.errorsEl.innerHTML = `
      <div class="error-box">
        <ul>${listItems}</ul>
      </div>
    `;
  }

  getExtraLabels(extraValues) {
    const labels = {
      breakfast: "Frukost",
      ghostTour: "Spökvandring",
      seance: "Nattlig seans",
    };

    if (extraValues.length === 0) {
      return "Inga tillägg valda";
    }

    return extraValues.map((extra) => labels[extra]).join(", ");
  }

  generateConfirmationHTML() {
    const data = this.getFormData();
    const total = this.calculateTotal();
    const extrasText = this.getExtraLabels(data.extras);

    return `
      <div class="success-box">
        <h3>Tack för din bokning!</h3>
        <p><strong>Hus:</strong> ${this.house.name}</p>
        <p><strong>Incheckning:</strong> ${data.checkin}</p>
        <p><strong>Antal dagar:</strong> ${data.days}</p>
        <p><strong>Tillägg:</strong> ${extrasText}</p>
        <p><strong>Totalpris:</strong> ${total} kr</p>
        <p>Vi ser fram emot att skrämma... förlåt, välkomna dig.</p>
      </div>
    `;
  }

  handleSubmit(event) {
    event.preventDefault();

    const errors = this.validate();
    this.renderErrors(errors);

    if (errors.length > 0) {
      this.confirmationEl.innerHTML = "";
      return;
    }

    this.confirmationEl.innerHTML = this.generateConfirmationHTML();
  }
}
