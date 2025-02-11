document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".header__nav-menu-link");

  // Add this new function to set active state based on current URL
  const setActiveMenuLink = () => {
    const currentPath = window.location.pathname;
    menuLinks.forEach((link) => {
      const linkPath = link.getAttribute("href");
      if (linkPath === currentPath) {
        link.classList.add("active");
        link.querySelector(".header__nav-menu-dot").classList.add("active");
      } else {
        link.classList.remove("active");
        link.querySelector(".header__nav-menu-dot").classList.remove("active");
      }
    });
  };

  // Call it when page loads
  setActiveMenuLink();

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
