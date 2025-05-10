// Wait for the HTML document to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
  // Select the pause button element with class "pause-button"
  const pauseButton = document.querySelector(".pause-button");
  // Select the play button element with class "play-button"
  const playButton = document.querySelector(".play-button");
  // Select all elements with class "marquee__content" (returns a NodeList)
  const marqueeContents = document.querySelectorAll(".marquee__content");

  // Add click event listener to the pause button
  pauseButton.addEventListener("click", function () {
    // Loop through each marquee content element
    marqueeContents.forEach((content) => {
      // Add "paused" class to stop the animation
      content.classList.add("paused");
    });
    // Remove "active" class from pause button (visual state)
    pauseButton.classList.remove("active");
    // Add "active" class to play button (visual state)
    playButton.classList.add("active");
  });

  // Add click event listener to the play button
  playButton.addEventListener("click", function () {
    // Loop through each marquee content element
    marqueeContents.forEach((content) => {
      // Remove "paused" class to resume the animation
      content.classList.remove("paused");
    });
    // Remove "active" class from play button (visual state)
    playButton.classList.remove("active");
    // Add "active" class to pause button (visual state)
    pauseButton.classList.add("active");
  });
});
