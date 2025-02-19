// Add event listener that fires on every scroll
document.addEventListener("scroll", () => {
  // Get current scroll position from top of page
  let scrollY = window.scrollY;
  // Get current height of the viewport/window
  let viewportHeight = window.innerHeight;

  // Starting position for global element (0% of viewport height)
  let startGlobal = viewportHeight * 0;
  // Stop position for both elements (23% of viewport height)
  let stopPosition = viewportHeight * 0.23;
  // Starting position for project element (40% of viewport height)
  let startProject = viewportHeight * 0.4;

  // Calculate global element's Y position:
  // Moves down 1.25x faster than scroll until reaching stopPosition
  let globalY = Math.min(startGlobal + scrollY * 1.25, stopPosition);
  // Calculate project element's Y position:
  // Moves up 0.8x scroll speed until reaching stopPosition
  let projectY = Math.max(startProject - scrollY * 0.8, stopPosition);

  // Apply calculated positions to the elements
  document.querySelector(".global").style.top = `${globalY}px`;
  document.querySelector(".project").style.top = `${projectY}px`;
});
