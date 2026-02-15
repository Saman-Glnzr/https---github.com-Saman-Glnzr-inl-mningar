import { assignments } from "./assignments.js";

export function generateNavigation(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let currentAssignment = document.body.id

  const nav = document.createElement("nav");
  const ul = document.createElement("ul");

  assignments.forEach(a => { 
    const li = document.createElement("li");
    const link = document.createElement("a");

    link.href = a.link;
    link.textContent = a.title;
    li.appendChild(link);
    ul.appendChild(li);
            if (currentAssignment === assignments.id){link.classList.add('active')

    }
  });

  nav.appendChild(ul);
  container.appendChild(nav);
}
