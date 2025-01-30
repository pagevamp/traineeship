document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".header__nav-menu-link");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      menuLinks.forEach((link) => link.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Drawer/mobile menu functionality
  const drawerTrigger = document.querySelector(".drawer-trigger");
  const drawer = document.querySelector(".drawer");
  const drawerClose = document.querySelector(".drawer__close");
  const drawerBlur = document.querySelectorAll(
    "#MainContent, #shopify-section-footer"
  );
  function handleDrawer(action) {
    if (action === "open") {
      drawer.classList.add("active");
      drawerBlur.forEach((element) => element.classList.add("blur"));
    } else if (action === "close") {
      drawer.classList.remove("active");
      drawerBlur.forEach((element) => element.classList.remove("blur"));
    }
  }

  drawerTrigger.addEventListener("click", function (e) {
    e.preventDefault();
    handleDrawer("open");
  });

  drawerClose.addEventListener("click", () => handleDrawer("close"));

  document.addEventListener("click", function (e) {
    if (
      drawer.classList.contains("active") &&
      !drawer.contains(e.target) &&
      !drawerTrigger.contains(e.target)
    ) {
      handleDrawer("close");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      handleDrawer("close");
    }
  });
});

function handleMenuClick(event, element) {
  event.preventDefault();

  document.querySelectorAll(".header__nav-menu-link").forEach((link) => {
    link.classList.remove("active");
  });

  element.classList.add("active");
}
