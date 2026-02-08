function generateNavigation(containerId) {

    const header = document.getElementById(containerId);

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");

    const currentPage = window.location.pathname.split("/").pop();

    assignments.forEach(function(item) {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = item.link;
    a.textContent = item.title;

    const currentPage = window.location.pathname.split("/").pop();
    const itemPage = item.link.split("/").pop();

    if (itemPage === currentPage) {
    }

    li.appendChild(a);
    ul.appendChild(li);
});


    header.innerHTML = "<h1>Webbutveckling 3 – 1ME323</h1>";

    header.appendChild(nav);
    nav.appendChild(ul);
}
