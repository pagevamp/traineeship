class VideoController {
  static instance = null;
  static vimeoInstance = null;

  static initialize() {
    if (VideoController.instance) return;
    VideoController.instance = new VideoController();
  }

  constructor() {
    this.initializeVimeoPlayer();
    this.initializeHTMLVideo();
  }

  initializeVimeoPlayer() {
    if (typeof Vimeo === "undefined") {
      console.error("Vimeo API is not loaded");
      return;
    }

    const iframe = document.querySelector(".video__iframe");
    if (!iframe) return;

    const player = new Vimeo.Player(iframe);
    const playBtn = document.querySelector(".video__btn--play");
    const muteBtn = document.querySelector(".video__btn--mute");
    const playIcon = playBtn?.querySelector(".video__btn-icon--play");
    const pauseIcon = playBtn?.querySelector(".video__btn-icon--pause");
    let isPlaying = false;
    let isMuted = true;

    VideoController.vimeoInstance = player;

    const updatePlayButton = () => {
      playIcon?.classList.toggle("is-active", !isPlaying);
      pauseIcon?.classList.toggle("is-active", isPlaying);
    };

    const updateMuteButton = () => {
      if (muteBtn) {
        muteBtn.querySelector(".video__btn-icon").textContent = isMuted
          ? "🔇"
          : "🔊";
      }
    };

    updatePlayButton();
    updateMuteButton();

    player.ready().then(() => {
      player.pause();
      player.setVolume(0);
      isPlaying = false;
      updatePlayButton();
    });

    player.on("play", () => {
      isPlaying = true;
      updatePlayButton();
      this.pauseHTMLVideo();
    });

    player.on("pause", () => {
      isPlaying = false;
      updatePlayButton();
    });

    if (playBtn) {
      playBtn.addEventListener("click", () => {
        if (isPlaying) {
          player.pause();
        } else {
          player.setVolume(isMuted ? 0 : 1).then(() => {
            player.play();
            this.pauseHTMLVideo();
          });
        }
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener("click", () => {
        if (isMuted) {
          player.setVolume(1).then(() => {
            isMuted = false;
            updateMuteButton();
          });
        } else {
          player.setVolume(0).then(() => {
            isMuted = true;
            updateMuteButton();
          });
        }
        if (isPlaying) {
          player.play();
        }
      });
    }

    const videoWrapper = document.querySelector(".video__wrapper");
    let hideTimeout;

    if (videoWrapper) {
      videoWrapper.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
        playBtn.style.opacity = "1";
        muteBtn.style.opacity = "1";
        playBtn.style.pointerEvents = "auto";
        muteBtn.style.pointerEvents = "auto";
      });
    }
  }

  initializeHTMLVideo() {
    const videoSection = document.querySelector(".video-section");
    if (!videoSection) return;

    const video = videoSection.querySelector(".video-section__player");
    const playButton = videoSection.querySelector(
      ".video-section__control--play"
    );
    const muteButton = videoSection.querySelector(
      ".video-section__control--mute"
    );
    const pauseIcon = playButton?.querySelector(".video-section__icon-pause");
    const playIcon = playButton?.querySelector(".video-section__icon-play");

    if (!video || !playButton || !muteButton) return;

    video.pause();
    let isPlaying = false;

    const updatePlayState = () => {
      if (pauseIcon && playIcon) {
        pauseIcon.style.display = isPlaying ? "block" : "none";
        playIcon.style.display = isPlaying ? "none" : "block";
      }
    };

    updatePlayState();

    video.addEventListener("play", () => {
      isPlaying = true;
      updatePlayState();
    });

    video.addEventListener("pause", () => {
      isPlaying = false;
      updatePlayState();
    });

    playButton.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        isPlaying = true;
        if (VideoController.vimeoInstance) {
          VideoController.vimeoInstance.pause();
        }
      } else {
        video.pause();
        isPlaying = false;
      }
      updatePlayState();
    });

    muteButton.addEventListener("click", () => {
      video.muted = !video.muted;
      muteButton.querySelector(".video-section__icon").textContent = video.muted
        ? "🔇"
        : "🔊";
    });

    updatePlayState();
  }

  pauseHTMLVideo() {
    const video = document.querySelector(".video-section__player");
    if (video) {
      video.pause();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  VideoController.initialize();
});
