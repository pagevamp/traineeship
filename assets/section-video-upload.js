class VideoSection {
  constructor(section) {
    this.video = section.querySelector(".video-section__player");
    this.playButton = section.querySelector(".video-section__control--play");
    this.muteButton = section.querySelector(".video-section__control--mute");

    if (!this.video || !this.playButton || !this.muteButton) {
      console.error("Missing required elements");
      return;
    }

    this.video.load();
    this.isPlaying = false;
    this.updatePlayState();

    this.addEventListeners();
  }

  addEventListeners() {
    this.playButton.addEventListener("click", (e) => {
      e.preventDefault();

      if (!this.video.paused) {
        this.pauseVideo();
      } else {
        this.playVideo();
      }
    });

    this.muteButton.addEventListener("click", () => this.toggleMute());

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

document.addEventListener("DOMContentLoaded", () => {
  const videoSections = document.querySelectorAll(".video-section");
  videoSections.forEach((section) => new VideoSection(section));
});
