class VideoSection {
  constructor() {
    this.video = document.querySelector(".video-section__player");
    this.playButton = document.querySelector(".video-section__control--play");
    this.muteButton = document.querySelector(".video-section__control--mute");

    if (!this.video || !this.playButton || !this.muteButton) {
      console.error("Missing required elements");
      return;
    }

    // Force load the video
    this.video.load();

    // Set initial states
    this.isPlaying = false;
    this.updatePlayState();

    this.addEventListeners();
  }

  addEventListeners() {
    this.playButton.addEventListener("click", () => {
      if (this.isPlaying) {
        this.pauseVideo();
      } else {
        this.playVideo();
      }
    });

    this.muteButton.addEventListener("click", () => this.toggleMute());

    // Video state listeners
    this.video.addEventListener("playing", () => {
      this.isPlaying = true;
      this.updatePlayState();
    });

    this.video.addEventListener("pause", () => {
      this.isPlaying = false;
      this.updatePlayState();
    });
  }

  async playVideo() {
    try {
      await this.video.play();
      this.isPlaying = true;
      this.updatePlayState();
    } catch (error) {
      console.error("Error playing video:", error);
      this.isPlaying = false;
      this.updatePlayState();
    }
  }

  pauseVideo() {
    this.video.pause();
    this.isPlaying = false;
    this.updatePlayState();
  }

  updatePlayState() {
    this.playButton.classList.toggle("is-paused", !this.isPlaying);
    this.video.classList.toggle("is-playing", this.isPlaying);
    this.playButton.setAttribute(
      "aria-label",
      this.isPlaying ? "Pause" : "Play"
    );
  }

  toggleMute() {
    this.video.muted = !this.video.muted;
    this.muteButton.querySelector(".video-section__icon").textContent = this
      .video.muted
      ? "🔇"
      : "🔊";
    this.muteButton.classList.toggle("is-muted", this.video.muted);
  }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  const videoSections = document.querySelectorAll(".video-section");
  videoSections.forEach(() => new VideoSection());
});
