
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

const cards = document.querySelectorAll(".feature-card");
const grid = document.querySelector(".feature-grid");
const latest = document.getElementById("latest");

function closeMenu() {
  if (!menu || !nav) return;

  nav.classList.remove("active");
  menu.setAttribute("aria-expanded", "false");
  menu.textContent = "☰";
}

// Mobile menu
if (menu && nav) {
  menu.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");
    menu.setAttribute("aria-expanded", String(isOpen));
    menu.textContent = isOpen ? "✕" : "☰";
  });

  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    const categories = {
      "#latest": "all",
      "#technology": "technology",
      "#science": "science",
      "#money": "money",
      "#world": "world",
      "#mysteries": "mysteries"
    };

    const category = categories[link.getAttribute("href")];

    if (category) {
      event.preventDefault();
      filterArticles(category);
    }

    closeMenu();
  });
}

// Filter articles
function filterArticles(category) {
  let visibleCount = 0;

  cards.forEach((card) => {
    const show =
      category === "all" ||
      card.dataset.category === category;

    card.style.display = show ? "" : "none";

    if (show) visibleCount++;
  });

  let message = document.getElementById("empty-message");

  if (!message && grid) {
    message = document.createElement("p");
    message.id = "empty-message";
    message.textContent =
      "New stories in this category are coming soon.";
    message.style.color = "#9ba4b5";
    message.style.padding = "25px 0";
    grid.appendChild(message);
  }

  if (message) {
    message.style.display = visibleCount === 0 ? "block" : "none";
  }

  if (latest) {
    latest.scrollIntoView({ behavior: "smooth" });
  }
}

// Category tiles
document.querySelectorAll(".category-tile").forEach((tile) => {
  tile.addEventListener("click", (event) => {
    event.preventDefault();

    const name = tile.querySelector("b")
      ?.textContent.trim().toLowerCase();

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
