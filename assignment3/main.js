import Match from "./Match.js"; // Importera Match-klassen från match.js

const innehåll = document.getElementById("tournament-container"); // Platsen på sidan
const startaOmKnapp = document.getElementById("restartBtn"); // Starta om-knappen

let allaRobotar = []; // Listan med alla robotar från filen
let matcherNu = []; // Listan med matcher i just denna runda
let rundaNummer = 0; // 0 = Kvartsfinal, 1 = Semifinal, 2 = Final

// Hämtar robotarna från filen på ett enkelt sätt
function hämtaData() {
  fetch("contestants.json") // 1. Fråga efter filen
    .then((svar) => svar.json()) // 2. Gör om svaret till en lista
    .then((data) => {
      // 3. När det är klart:
      allaRobotar = data; // Spara listan
      startaTurnering(); // Kör igång!
    });
}

function startaTurnering() {
  innehåll.innerHTML = ""; // Töm skärmen helt
  rundaNummer = 0; // Börja på runda 0
  skapaRunda(allaRobotar); // Skapa första rundan
}

function skapaRunda(deltagare) {
  if (deltagare.length < 2) {
    // Om bara en person är kvar:
    visaVinnare(deltagare[0]); // Den personen har vunnit allt!
    return; // Stoppa funktionen här
  }

  const rubrik = document.createElement("h2"); // Skapa en rubrik
  const namn = ["Kvartsfinal", "Semifinal", "Final"]; // Lista på namn
  rubrik.textContent = namn[rundaNummer] ?? "Slutspel"; // Välj rätt namn
  innehåll.appendChild(rubrik); // Lägg till rubriken på sidan

  const rundaLåda = document.createElement("div"); // Skapa en låda för matcherna
  rundaLåda.className = "round"; // Ge den ett namn för CSS
  innehåll.appendChild(rundaLåda); // Lägg till den på sidan

  matcherNu = []; // Nollställ listan med matcher

  // Loopa 2 och 2 (i += 2) för att para ihop robotarna
  for (let i = 0; i < deltagare.length; i += 2) {
    const match = new Match(deltagare[i], deltagare[i + 1]); // Skapa en ny match
    matcherNu.push(match); // Spara matchen i listan
    rundaLåda.appendChild(match.render()); // Rita ut matchen på sidan
  }
}

// Denna körs varje gång en match blir klar
innehåll.addEventListener("matchFinished", () => {
  const allaKlara = matcherNu.every((m) => m.isPlayed); // Är ALLA matcher klara?

  if (allaKlara) {
    const vinnare = matcherNu.map((m) => m.winner); // Samla ihop alla vinnare i en ny lista
    rundaNummer++; // Gå till nästa runda
    setTimeout(() => skapaRunda(vinnare), 1000); // Vänta 1 sekund, skapa sen nästa runda
  }
});

function visaVinnare(vinnaren) {
  const låda = document.createElement("div"); // Skapa en guld-ruta
  låda.className = "champion-box"; // Ge den ett namn
  låda.innerHTML = `<h1>🏆 MÄSTARE: ${vinnaren.name} 🏆</h1>`; // Skriv namnet
  innehåll.appendChild(låda); // Lägg till på sidan
}

startaOmKnapp.onclick = startaTurnering; // Gör så knappen fungerar

hämtaData(); // Kör igång allt direkt!
