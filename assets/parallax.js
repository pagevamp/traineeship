document.addEventListener("scroll", () => {
  let scrollY = window.scrollY;
  let viewportHeight = window.innerHeight;

  let startGlobal = viewportHeight * 0;
  let stopPosition = viewportHeight * 0.35;
  let startProject = viewportHeight * 0.6;

  let globalY = Math.min(startGlobal + scrollY * 1.25, stopPosition);
  let projectY = Math.max(startProject - scrollY * 1, stopPosition);

  document.querySelector(".global").style.top = `${globalY}px`;
  document.querySelector(".project").style.top = `${projectY}px`;
});
