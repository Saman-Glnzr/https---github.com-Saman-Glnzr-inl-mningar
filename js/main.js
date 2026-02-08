document.addEventListener("DOMContentLoaded", function () {

    generateNavigation("site-header");

    const main = document.getElementById("content");

    const section = document.createElement("section");

    assignments.forEach(function(item) {

        if (item.id !== "home") {

            const div = document.createElement("div");
            div.className = "card";

            const h2 = document.createElement("h2");
            h2.textContent = item.title;

            const p = document.createElement("p");
            p.textContent = item.description;

            const a = document.createElement("a");
            a.href = item.link;
            a.textContent = "Gå till uppgift";

            div.appendChild(h2);
            div.appendChild(p);
            div.appendChild(a);

            section.appendChild(div);
        }
    });

    const info = document.createElement("section");

    info.innerHTML = `
        <h2>Om mig</h2>
        <p>Namn: DITT NAMN</p>
        <p>Kurs: Webbutveckling</p>
        <p>Användarnamn: DITT_GITHUB_NAMN</p>
    `;

    main.appendChild(section);
    main.appendChild(info);

    document.getElementById("site-footer").innerHTML = "<p>Inlämningsuppgifter</p>";
});
