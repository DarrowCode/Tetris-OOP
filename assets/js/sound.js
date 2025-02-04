class Sound {
  constructor(parent) {
    this.parent = parent;
    this.sounds = [];
    this.muted = true;
  }

  create(src, id, loop = false) {
    const audio = document.createElement("audio");
    audio.src = src;
    audio.id = id;
    audio.muted = true;
    this.sounds.push(audio);
    this.parent.append(audio);

    if (loop) {
      audio.setAttribute("loop", "");
    }

    return audio;
  }

  soundSetting() {
    const soundDiv = document.querySelector("#sound-div");
    soundDiv.addEventListener("click", () => {
      this.muteToggle();
    });
  }

  muteToggle() {
    const speakerOn = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"/></svg>`; // Speaker with sound waves
    const speakerOff = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"/></svg>`; // Speaker with cancellation

    this.sounds.forEach((sound) => {
      sound.muted = !this.muted;
    });
    document.querySelector("#sound-speaker").innerHTML = this.muted
      ? speakerOn
      : speakerOff;
    document.querySelector("#sound-description").innerHTML = this.muted
      ? "Sound On"
      : "Sound Off";
    this.muted = !this.muted;
  }

  pause() {
    this.sounds.forEach((sound) => sound.pause());
  }

  play() {
    this.sounds.forEach((sound) => sound.play());
  }
}

const sound = new Sound(document.querySelector("#sound-div"));
const backgroundSound = sound.create(
  "assets/sounds/Dungeon_Theme.mp3",
  "background_sound",
  true
);
const movesSound = sound.create("assets/sounds/moves.mp3", "moves_sound");
const dropSound = sound.create("assets/sounds/drop.mp3", "drop_sound");
const pointsSound = sound.create("assets/sounds/points.mp3", "points_sound");
const finishSound = sound.create("assets/sounds/finish.mp3", "finish_sound");

sound.muteToggle();
sound.soundSetting();