document.addEventListener("DOMContentLoaded", () => {
    fetch("navbar.html")
      .then(res => res.text())
      .then(html => {
        const nav = document.createElement("div");
        nav.innerHTML = html;
        document.body.prepend(nav);
      });
  });
  