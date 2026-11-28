
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

const cards = document.querySelectorAll(".feature-card");
const grid = document.querySelector(".feature-grid");
const latest = document.getElementById("latest");

function closeMenu() {
  if (nav && menu) {
    nav.classList.remove("active");
    menu.setAttribute("aria-expanded", "false");
    menu.textContent = "☰";
  }
}

// Mobile navigation
if (menu && nav) {
  menu.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");

    menu.setAttribute("aria-expanded", isOpen);
    menu.textContent = isOpen ? "✕" : "☰";
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !menu.contains(event.target)) {
      closeMenu();
    }
  });
}

// Article filtering
function filterArticles(category) {
  let visibleCount = 0;

  cards.forEach((card) => {
    const matches =
      category === "all" ||
      card.dataset.category === category;

    card.style.display = matches ? "" : "none";

    if (matches) visibleCount++;
  });

  let emptyMessage = document.getElementById("empty-message");

  if (!emptyMessage && grid) {
    emptyMessage = document.createElement("p");
    emptyMessage.id = "empty-message";
    emptyMessage.textContent = "New stories in this category are coming soon.";
    emptyMessage.style.color = "#9ba4b5";
    emptyMessage.style.padding = "25px 0";
    grid.appendChild(emptyMessage);
  }

  if (emptyMessage) {
    emptyMessage.style.display = visibleCount === 0 ? "block" : "none";
  }

  closeMenu();

  if (latest) {
    latest.scrollIntoView({ behavior: "smooth" });
  }
}

// Main navigation
if (nav) {
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const name = link.textContent.trim().toLowerCase();

      const categories = {
        "latest": "all",
        "technology": "technology",
        "science": "science",
        "money": "money",
        "world": "world",
        "mysteries": "mysteries"
      };

      if (categories[name]) {
        event.preventDefault();
        filterArticles(categories[name]);
      }

      closeMenu();
    });
  });
}

// Category tiles
document.querySelectorAll(".category-tile").forEach((tile) => {
  tile.addEventListener("click", (event) => {
    event.preventDefault();

    const name = tile.querySelector("b")?.textContent.trim().toLowerCase();

    const categories = {
      "technology": "technology",
      "science": "science",
      "money": "money",
      "world": "world",
      "mysteries": "mysteries"
    };

    if (categories[name]) {
      filterArticles(categories[name]);
    }
  });
});
