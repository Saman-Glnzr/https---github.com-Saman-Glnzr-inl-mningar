document.addEventListener("DOMContentLoaded", function () {

    generateNavigation("site-header");

    const main = document.getElementById("content");

    assignments.forEach(function(item) {

        if (item.id === "assignment1") {

            const h2 = document.createElement("h2");
            h2.textContent = item.title;

            const p = document.createElement("p");
            p.textContent = item.description;

            const a = document.createElement("a");
            a.href = "../index.html";
            a.textContent = "Tillbaka till startsidan";

            main.appendChild(h2);
            main.appendChild(p);
            main.appendChild(a);
        }
    });

    document.getElementById("site-footer").innerHTML = "<p>Inlämningsuppgifter</p>";
});
