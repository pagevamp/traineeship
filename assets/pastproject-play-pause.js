document.addEventListener("DOMContentLoaded", function () {
  const pauseButton = document.querySelector(".pause-button");
  const playButton = document.querySelector(".play-button");
  const marqueeContents = document.querySelectorAll(".marquee__content");

  pauseButton.addEventListener("click", function () {
    marqueeContents.forEach((content) => {
      content.classList.add("paused");
    });
    pauseButton.classList.remove("active");
    playButton.classList.add("active");
  });

  playButton.addEventListener("click", function () {
    marqueeContents.forEach((content) => {
      content.classList.remove("paused");
    });
    playButton.classList.remove("active");
    pauseButton.classList.add("active");
  });
});
