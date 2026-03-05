// [Punkt 0]: Filen exporterar Match-klassen så att main.js kan använda den.
export class Match {
  // [Punkt 2.1]: Privata fält (#).
  // Dessa kan inte ändras utifrån, vilket skyddar matchens tillstånd.
  #player1;
  #player2;
  #winner = null;
  #isPlayed = false;
  #element = null; // Sparar HTML-elementet för att kunna ändra det när matchen spelas.

  // [Punkt 2.1]: Konstruktorn tar emot de två deltagar-objekten från  JSON.
  constructor(p1, p2) {
    this.#player1 = p1;
    this.#player2 = p2;
  }

  // [Punkt 2.1]: Getters för att main.js ska kunna läsa vem som vann eller om det är spelat.
  get player1() {
    return this.#player1;
  }
  get player2() {
    return this.#player2;
  }
  get winner() {
    return this.#winner;
  }
  get isPlayed() {
    return this.#isPlayed;
  }

  // [Punkt 2.1]: Metod som skapar själva HTML-boxen för matchen.
  render() {
    const container = document.createElement("div");
    container.className = "match-card";

    // [Punkt 2.2]: Här hanterar vi din JSON-data.
    // Vi använder ?? (nullish coalescing) för att sätta standardvärden.
    // Exempel: Mystiska Molnet har null som catchphrase, då visas "..." istället.
    const p1Name = this.#player1.name ?? "Okänd";
    const p1Skill = this.#player1.skillLevel ?? 4; // Om skillLevel saknas sätter vi 4.
    const p1Phrase = this.#player1.catchphrase ?? "...";

    const p2Name = this.#player2.name ?? "Okänd";
    const p2Skill = this.#player2.skillLevel ?? 4;
    const p2Phrase = this.#player2.catchphrase ?? "...";

    // [Punkt 2.2]: Skapar det visuella .
    // Vi struntar i bilderna nu och fokuserar på namn, styrka och catchphrase.
    container.innerHTML = `
            <div class="player p1">
                <h4>${p1Name}</h4>
                <p>Skill: ${p1Skill}</p>
                <small>"${p1Phrase}"</small>
                <button class="win-btn">Välj som vinnare</button>
            </div>
            <div class="vs">VS</div>
            <div class="player p2">
                <h4>${p2Name}</h4>
                <p>Skill: ${p2Skill}</p>
                <small>"${p2Phrase}"</small>
                <button class="win-btn">Välj som vinnare</button>
            </div>
        `;

    // Sparar referensen till elementet så setWinner() kan hitta det sen.
    this.#element = container;

    // [Punkt 3.2]: Kopplar knapparna till setWinner-metoden.
    const buttons = container.querySelectorAll(".win-btn");
    buttons[0].onclick = () => this.setWinner(this.#player1);
    buttons[1].onclick = () => this.setWinner(this.#player2);

    return container;
  }

  // [Punkt 3.2]: Metod för att manuellt sätta en vinnare.
  setWinner(player) {
    // Om matchen redan är avgjord ska inget hända.
    if (this.#isPlayed) return;

    this.#winner = player;
    this.#isPlayed = true;

    // [Punkt 2.2]: Markera vinnaren visuellt.
    // Vi letar upp de två spelar-divarna inuti matchen.
    const players = this.#element.querySelectorAll(".player");

    // Om spelare 1 vann, lägg till klassen 'loser' på spelare 2, och vice versa.
    if (player === this.#player1) {
      players[1].classList.add("loser");
    } else {
      players[0].classList.add("loser");
    }

    // Ta bort knapparna så användaren inte kan ändra sig.
    this.#element.querySelectorAll(".win-btn").forEach((btn) => btn.remove());

    // Skicka ett dolt meddelande (event) till main.js att matchen är klar.
    this.#element.dispatchEvent(
      new CustomEvent("matchFinished", { bubbles: true }),
    );
  }
}
