document.addEventListener("DOMContentLoaded", () => {
  // Handle navigation menu link clicks
  // Removes 'active' class from all links and adds it to the clicked link
  const menuLinks = document.querySelectorAll(".header__nav-menu-link");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      menuLinks.forEach((link) => link.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Drawer/mobile menu functionality
  // Opens drawer when trigger button is clicked
  const drawerTrigger = document.querySelector(".drawer-trigger");
  const drawer = document.querySelector(".drawer");
  const drawerClose = document.querySelector(".drawer__close");

  drawerTrigger.addEventListener("click", function (e) {
    e.preventDefault();
    drawer.classList.add("active");
  });

  // Closes drawer when close button is clicked
  drawerClose.addEventListener("click", function () {
    drawer.classList.remove("active");
  });

  // Close drawer when clicking outside of it
  // Checks if drawer is active and click target is not within drawer or trigger
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
