document.addEventListener("DOMContentLoaded", function () {
  if (typeof Vimeo === "undefined") {
    console.error("Vimeo API is not loaded");
    return;
  }

  const iframe = document.querySelector(".video__iframe");
  if (!iframe) {
    console.error("Video iframe not found");
    return;
  }

  const player = new Vimeo.Player(iframe);
  const playBtn = document.querySelector(".video__btn--play");
  const muteBtn = document.querySelector(".video__btn--mute");
  const playIcon = playBtn.querySelector(".video__btn-icon--play");
  const pauseIcon = playBtn.querySelector(".video__btn-icon--pause");
  let isPlaying = true;
  let isMuted = true;

  function updatePlayButton() {
    playIcon.classList.toggle("is-active", !isPlaying);
    pauseIcon.classList.toggle("is-active", isPlaying);
  }

  function updateMuteButton() {
    muteBtn.querySelector(".video__btn-icon").textContent = isMuted
      ? "🔇"
      : "🔊";
  }

  updatePlayButton();
  updateMuteButton();

  player
    .ready()
    .then(() => {
      player.getPaused().then((paused) => {
        isPlaying = !paused;
        updatePlayButton();
      });
    })
    .catch((error) => {
      console.error("Error initializing Vimeo player:", error);
    });

  player.on("play", () => {
    isPlaying = true;
    updatePlayButton();
  });

  player.on("pause", () => {
    isPlaying = false;
    updatePlayButton();
  });

  const videoWrapper = document.querySelector(".video__wrapper");
  let hideTimeout;

  // Show controls when mouse enters the video area
  videoWrapper.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout);
    playBtn.style.opacity = "1";
    muteBtn.style.opacity = "1";
    playBtn.style.pointerEvents = "auto";
    muteBtn.style.pointerEvents = "auto";
  });

  // Hide controls when mouse leaves the video area
  videoWrapper.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
      if (!videoWrapper.matches(":focus-within")) {
        playBtn.style.opacity = "0";
        muteBtn.style.opacity = "0";
        playBtn.style.pointerEvents = "none";
        muteBtn.style.pointerEvents = "none";
      }
    }, 2000); // 2 second delay before hiding
  });

  // Keep controls visible when focused
  playBtn.addEventListener("focus", () => {
    clearTimeout(hideTimeout);
    playBtn.style.opacity = "1";
    playBtn.style.pointerEvents = "auto";
  });

  playBtn.addEventListener("click", function () {
    if (isPlaying) {
      player.pause().catch((error) => {
        console.error("Error pausing video:", error);
      });
    } else {
      player.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  });

  muteBtn.addEventListener("click", function () {
    if (isMuted) {
      player
        .setVolume(1)
        .then(() => {
          isMuted = false;
          updateMuteButton();
        })
        .catch((error) => {
          console.error("Error unmuting video:", error);
        });
    } else {
      player
        .setVolume(0)
        .then(() => {
          isMuted = true;
          updateMuteButton();
        })
        .catch((error) => {
          console.error("Error muting video:", error);
        });
    }
  });

  const videoSections = document.querySelectorAll(".video-section");

  videoSections.forEach((section) => {
    const video = section.querySelector(".video-section__player");
    const playButton = section.querySelector(".video-section__control--play");
    const pauseIcon = playButton.querySelector(".video-section__icon-pause");
    const playIcon = playButton.querySelector(".video-section__icon-play");

    playButton.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        pauseIcon.classList.add("is-visible");
        playIcon.classList.remove("is-visible");
      } else {
        video.pause();
        pauseIcon.classList.remove("is-visible");
        playIcon.classList.add("is-visible");
      }
    });

    // Set initial state
    pauseIcon.classList.add("is-visible");
    playIcon.classList.remove("is-visible");
  });
});
