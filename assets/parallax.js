document.addEventListener("scroll", () => {
  let scrollY = window.scrollY;

  let viewportHeight = window.innerHeight;

  let startGlobal = viewportHeight * 0;

  let stopPosition = viewportHeight * 0.23;

  let startProject = viewportHeight * 0.4;

  let globalY = Math.min(startGlobal + scrollY * 1.25, stopPosition);

  let projectY = Math.max(startProject - scrollY * 0.8, stopPosition);

  if (document.querySelector(".global")) {
    document.querySelector(".global").style.top = `${globalY}px`;
  }
  if (document.querySelector(".project")) {
    document.querySelector(".project").style.top = `${projectY}px`;
  }
});
