export class Match {
  #spelare1; // Privat variabel för första roboten
  #spelare2; // Privat variabel för andra roboten
  #vinnare = null; // Startar som tom (null)
  #ärSpelad = false; // Startar som falskt (inte spelad än)
  #element = null; // Här sparar vi HTML-boxen senare

  constructor(p1, p2) {
    this.#spelare1 = p1; // Sparar robot 1 i matchen
    this.#spelare2 = p2; // Sparar robot 2 i matchen
  }

  // "Getters" låter main.js titta på värdena utan att ändra dem
  get player1() {
    return this.#spelare1;
  }
  get player2() {
    return this.#spelare2;
  }
  get winner() {
    return this.#vinnare;
  }
  get isPlayed() {
    return this.#ärSpelad;
  }

  render() {
    const låda = document.createElement("div"); // Skapar en ny <div>
    låda.className = "match-card"; // Ger den ett namn för CSS

    // Om namn eller catchphrase saknas, använd standard-text (??)
    const namn1 = this.#spelare1.name ?? "Okänd";
    const prat1 = this.#spelare1.catchphrase ?? "...";
    const namn2 = this.#spelare2.name ?? "Okänd";
    const prat2 = this.#spelare2.catchphrase ?? "...";

    // Här skriver vi HTML-koden för matchen
    låda.innerHTML = `
            <div class="player">
                <h4>${namn1}</h4>
                <p>Skill: ${this.#spelare1.skillLevel ?? 4}</p>
                <small>"${prat1}"</small>
                <button class="win-btn">Vinnare</button>
            </div>
            <div class="vs">VS</div>
            <div class="player">
                <h4>${namn2}</h4>
                <p>Skill: ${this.#spelare2.skillLevel ?? 4}</p>
                <small>"${prat2}"</small>
                <button class="win-btn">Vinnare</button>
            </div>
        `;

    this.#element = låda; // Kom ihåg hur lådan ser ut

    const knappar = låda.querySelectorAll(".win-btn"); // Hitta båda knapparna
    knappar[0].addEventListener("click", () => {
      this.setWinner(this.#spelare1); // Kör funktionen för att sätta spelare 1 som vinnare
    });

    // Vi hämtar den andra knappen (index 1) och gör samma sak för spelare 2
    knappar[1].addEventListener("click", () => {
      this.setWinner(this.#spelare2); // Kör funktionen för att sätta spelare 2 som vinnare
    });
    return låda; // Skicka tillbaka den färdiga lådan
  }

  setWinner(robot) {
    if (this.#ärSpelad) return; // Om matchen redan är klar, gör inget

    this.#vinnare = robot; // Sätt roboten som vinnare
    this.#ärSpelad = true; // Markera matchen som klar

    const deltagare = this.#element.querySelectorAll(".player"); // Hitta spelar-rutorna
    if (robot === this.#spelare1) {
      deltagare[1].classList.add("loser"); // Gör spelare 2 blek om spelare 1 vann
    } else {
      deltagare[0].classList.add("loser"); // Gör spelare 1 blek om spelare 2 vann
    }

    this.#element
      .querySelectorAll(".win-btn")
      .forEach((knapp) => knapp.remove()); // Ta bort knapparna
    this.#element.dispatchEvent(
      new CustomEvent("matchFinished", { bubbles: true }),
    ); // Ropa: "Klar!"
  }
}
