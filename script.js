
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

if (menu && nav) {
  menu.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");

    menu.setAttribute("aria-expanded", isOpen);
    menu.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menu.setAttribute("aria-expanded", "false");
      menu.textContent = "☰";
    });
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !menu.contains(event.target)) {
      nav.classList.remove("active");
      menu.setAttribute("aria-expanded", "false");
      menu.textContent = "☰";
    }
  });
}
