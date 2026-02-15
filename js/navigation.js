import { assignments } from "./assignments.js";

export function generateNavigation(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const inSubfolder = window.location.pathname.includes("/assignment");
  const base = inSubfolder ? "../" : "./";

  const currentPath = window.location.pathname.split("/").slice(-2).join("/");

  const nav = document.createElement("nav");
  const ul = document.createElement("ul");

  assignments.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.textContent = item.title;
    a.href = base + item.link;

    if (currentPath === item.link) {
      a.classList.add("active");
    }

    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  container.appendChild(nav);
}
