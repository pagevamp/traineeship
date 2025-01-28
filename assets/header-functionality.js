document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".header__nav-menu-link");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      menuLinks.forEach((link) => link.classList.remove("active"));
      link.classList.add("active");
    });
  });

  const drawerTrigger = document.querySelector(".drawer-trigger");
  const drawer = document.querySelector(".drawer");
  const drawerClose = document.querySelector(".drawer__close");

  drawerTrigger.addEventListener("click", function (e) {
    e.preventDefault();
    drawer.classList.add("active");
  });

  drawerClose.addEventListener("click", function () {
    drawer.classList.remove("active");
  });

  // Close drawer when clicking outside
  document.addEventListener("click", function (e) {
    if (
      drawer.classList.contains("active") &&
      !drawer.contains(e.target) &&
      !drawerTrigger.contains(e.target)
    ) {
      drawer.classList.remove("active");
    }
  });
});
