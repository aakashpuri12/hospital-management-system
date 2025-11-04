document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");

  toggle.addEventListener("mouseenter", () => {
    links.style.display = "block";
  });

  toggle.addEventListener("mouseleave", () => {
    setTimeout(() => (links.style.display = "none"), 800);
  });

  links.addEventListener("mouseenter", () => {
    links.style.display = "block";
  });

  links.addEventListener("mouseleave", () => {
    links.style.display = "none";
  });
});
