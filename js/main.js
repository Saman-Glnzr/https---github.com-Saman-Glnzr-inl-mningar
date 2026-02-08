document.addEventListener("DOMContentLoaded", function () {

    // Generera navigation
    generateNavigation("site-header");

    // Huvudcontainer
    const main = document.getElementById("content");

    // Skapa sektion för korten
    const section = document.createElement("section");

    // Loopar igenom assignments (hoppa över "home")
    assignments.forEach(function(item) {
        if (item.id !== "home") {

            // Skapa kort
            const card = document.createElement("div");
            card.className = "assignment-card"; // använd samma klass som i CSS

            // Titel
            const h2 = document.createElement("h2");
            h2.textContent = item.title;

            // Beskrivning
            const p = document.createElement("p");
            p.textContent = item.description;

            // Länk-knapp
            const a = document.createElement("a");
            a.href = item.link;
            a.textContent = "Gå till uppgift";

            // Lägg allt i kortet
            card.appendChild(h2);
            card.appendChild(p);
            card.appendChild(a);

            // Lägg kortet i sektionen
            section.appendChild(card);
        }
    });

    // Sektion för info om dig själv
    const info = document.createElement("section");
    info.id = "about-me"; // så CSS från landing.css funkar
    info.innerHTML = `
        <h2>Om mig</h2>
        <p>Namn: Saman Gulnezer</p>
        <p>Kurs: Webbutveckling 3</p>
        <p>Användarnamn: Saman-GLNZR</p>
    `;

    // Lägg sektionerna i main
    main.appendChild(section);
    main.appendChild(info);

    // Footer
    document.getElementById("site-footer").innerHTML = "<p>Inlämningsuppgifter</p>";
});
