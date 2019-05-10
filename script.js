class AudioController {
  constructor() {
    this.bgMusic = new Audio("Assets/Audio/creepy-background-daniel_simon.mp3");
    this.flipSound = new Audio("Assets/Audio/cardTakeOutPackage2.wav");
    this.matchSound = new Audio("Assets/Audio/Jingle_Achievement_01.mp3");
    this.victorySound = new Audio("Assets/Audio/Jingle_Win_00.mp3");
    this.gameOverSound = new Audio("Assets/Audio/game_over.mp3");
    this.bgMusic.volume = 0.5;
    this.bgMusic.loop = true;
  }


function ready() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  let cards = Array.from(document.getElementsByClassName("card"));
  let game = new MixOrMatch(100, cards);

  overlays.forEach(overlay => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      game.startGame();
      let audioController = new AudioController();
      audioController.startMusic();
    });
  });
  cards.forEach(card => {
    card.addEventListener("click", () => {
      game.flipCard(card);
    });
  });
}


if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready());
} else {
  ready();
}

