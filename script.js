


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

