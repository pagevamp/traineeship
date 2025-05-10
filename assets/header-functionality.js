// Wait for DOM to be fully loaded before running script
document.addEventListener("DOMContentLoaded", () => {
  // Select all navigation menu links
  const menuLinks = document.querySelectorAll(".header__nav-menu-link");

  // Function to highlight the current page in the navigation
  const setActiveMenuLink = () => {
    // Get current page path
    const currentPath = window.location.pathname;
    // Check each menu link
    menuLinks.forEach((link) => {
      const linkPath = link.getAttribute("href");
      if (linkPath === currentPath) {
        // If link matches current path, add active states
        link.classList.add("active");
        link.querySelector(".header__nav-menu-dot").classList.add("active");
      } else {
        // Remove active states from non-matching links
        link.classList.remove("active");
        link.querySelector(".header__nav-menu-dot").classList.remove("active");
      }
    });
  };
  // Run the function immediately
  setActiveMenuLink();

  // Select drawer-related elements
  const drawerTrigger = document.querySelector(".drawer-trigger");
  const drawer = document.querySelector(".drawer");
  const drawerClose = document.querySelector(".drawer__close");
  // Select elements to be blurred when drawer is open
  const drawerBlur = document.querySelectorAll(
    "#MainContent, #shopify-section-footer"
  );

  // Function to handle drawer open/close states
  function handleDrawer(action) {
    if (action === "open") {
      // Open drawer and add blur effect
      drawer.classList.add("active");
      drawerBlur.forEach((element) => element.classList.add("blur"));
    } else if (action === "close") {
      // Close drawer and remove blur effect
      drawer.classList.remove("active");
      drawerBlur.forEach((element) => element.classList.remove("blur"));
    }
  }

  // Open drawer when trigger is clicked
  drawerTrigger.addEventListener("click", function (e) {
    e.preventDefault();
    handleDrawer("open");
  });

  // Close drawer when close button is clicked
  drawerClose.addEventListener("click", () => handleDrawer("close"));

  // Close drawer when clicking outside (but not on trigger)
  document.addEventListener("click", function (e) {
    if (
      drawer.classList.contains("active") &&
      !drawer.contains(e.target) &&
      !drawerTrigger.contains(e.target)
    ) {
      handleDrawer("close");
    }
  });

  // Close drawer when pressing Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      handleDrawer("close");
    }
  });

  // Update cart count
  function updateCartCount() {
    fetch("/cart.js")
      .then((response) => response.json())
      .then((cart) => {
        const cartCountElements =
          document.querySelectorAll("[data-cart-count]");
        cartCountElements.forEach((element) => {
          element.textContent = cart.item_count;
        });
      })
      .catch((error) => console.error("Error:", error));
  }

  document.addEventListener("cart:updated", updateCartCount);
  document.addEventListener("cart:refresh", updateCartCount);
  document.addEventListener("cart_update", updateCartCount);
  document.addEventListener("ajaxProduct:added", updateCartCount);
  document.addEventListener("product:added", updateCartCount);

  const originalFetch = window.fetch;
  window.fetch = function (url, options) {
    const response = originalFetch(url, options);
    if (
      url.includes("/cart/add") ||
      url.includes("/cart/update") ||
      url.includes("/cart/change")
    ) {
      response.then(() => {
        setTimeout(updateCartCount, 1);
      });
    }
    return response;
  };
});
