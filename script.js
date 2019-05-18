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
  
  startMusic() {
    this.bgMusic.play();
  }
  stopMusic() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  }
  flip() {
    this.flipSound.play();
  }
  match() {
    this.matchSound.play();
  }
  victory() {
    this.stopMusic();
    this.victorySound.play();
  }
  gameOver() {
    this.stopMusic();
    this.gameOverSound.play();
  }
}


class MixOrMatch {
  constructor(totalTime, cards) {
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById("time-remaining");
    this.ticker = document.getElementById("flips");
    this.audioController = new AudioController();
  }
  
  startGame() {
    this.cardToCheck = null;
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.matchedCards = [];
    this.busy = true;
    setTimeout(() => {
      this.audioController.startMusic();
      this.shuffleCards();
      this.countDown = this.startCountDown();
      this.busy = false;
    }, 500);
    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
  }
   hideCards() {
    this.cardsArray.forEach(card => {
      card.classList.remove("visible");
      card.classList.remove("matched");
    });
  }
  
   flipCard(card) {
    if (this.canFlipCard(card)) {
      this.audioController.flip();
      this.totalClicks++;
      this.ticker.innerText = this.totalClicks;
      card.classList.add("visible");

      if (this.cardToCheck) this.checkForCardMatch(card);
      else this.cardToCheck = card;
    }
  }

 shuffleCards() {
    for (let i = this.cardsArray.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      this.cardsArray[randomIndex].style.order = i;
      this.cardsArray[i].style.order = randomIndex;
    }
  }

 canFlipCard(card) {
    return (
      !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck
    );
  }
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

