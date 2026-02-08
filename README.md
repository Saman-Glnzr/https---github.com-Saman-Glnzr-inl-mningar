# Inlämningar – Webbutveckling 3

Detta repository innehåller mina inlämningsuppgifter för kursen **Webbutveckling 3**.  

## Struktur

- `index.html` – Startsida / landningssida för alla inlämningsuppgifter. Kort för varje uppgift genereras dynamiskt med JavaScript.
- `assignment1/` – Första uppgiften, innehåller en egen HTML-sida med en rubrik och beskrivning samt en egen js.
- `css/` – Global CSS och specifik CSS för landningssidan:
  - `global.css` – Styling som används på alla sidor (navigation, active link osv.)
  - `kort.css` – Styling för landningssidans kort och info-sektion.
- `js/` – JavaScript-filer:
  - `assignments.js` – Datastruktur med alla uppgifter (titel, länk, beskrivning)
  - `navigation.js` – Genererar navigation dynamiskt och markerar aktiv sida
  - `main.js` – Genererar landningssidans kort och info om mig själv

## Funktioner

- Dynamisk navigation som markerar aktuell sida (Funkar ej för tillfället)
- Landningssida med “kort” för varje uppgift, genererade via JavaScript
- Enkel CSS-styling för kort och navigering
- Undersidor för varje uppgift, med samma globala styling

## Publicering

- Sidan publiceras via **GitHub Pages** från `uppgifter`-branchen då main branchen funkade ej.
