const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
const wrapper = document.querySelector(".wrapper");
const startScreen = document.querySelector(".initial-screen");
const timerDisplay = document.querySelector(".timer");
const heading = document.createElement("h1");

// Flipping and Matching Cards

function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    let audio = document.querySelector(".audio");
    audio.play();
    matched++;
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);
  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

// Shuffling Cards

function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  heading.textContent = "";
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}
shuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".wrapper");
  const startButton = document.querySelector(".start-btn");
  const againButton = document.querySelector(".again-btn");
  const startScreen = document.querySelector(".initial-screen");
  const timerDisplay = document.querySelector(".timer");
  const countDownTimer = document.querySelector(".game-timer");
  const gameOutcomeWon = document.querySelector(".game-outcome-won");
  const gameOutcomeLost = document.querySelector(".game-outcome-lost");

  wrapper.style.display = "none";
  countDownTimer.style.display = "none";
  gameOutcomeWon.style.display = "none";
  gameOutcomeLost.style.display = "none";
  againButton.style.display = "none";

  // Start button

  startButton.addEventListener("click", function () {
    let timeLeft = 3;
    startScreen.style.display = "none";
    timerDisplay.textContent = timeLeft;

    // Countdown timer before the game starts
    const timerId = setInterval(function () {
      timeLeft--;
      if (timeLeft === 0) {
        clearInterval(timerId);
        wrapper.style.display = "block";
        countDownTimer.style.display = "block";
        timerDisplay.textContent = "";
        let seconds = 60;
        countDownTimer.innerHTML =
          "0:" + (seconds < 10 ? "0" : "") + String(seconds);
      
        function tick() {
          seconds--;
          countDownTimer.innerHTML =
            "0:" + (seconds < 10 ? "0" : "") + String(seconds);
          if (seconds === 0 || matched == 8) {
            countDownTimer.style.display = "none";
            wrapper.style.display = "none";
            if (matched == 8) {
              gameOutcomeWon.style.display = "block";
            } else {
              gameOutcomeLost.style.display = "block";
              gameOutcomeWon.style.display = "none";
            }
            setTimeout(function () {
              againButton.style.display = "block";
            }, 3000);
          }

          if (seconds > 0) {
            setTimeout(tick, 1000);
          }
        }

        setTimeout(tick, 1000);
      } else {
        timerDisplay.textContent = timeLeft;
      }
    }, 1000);
  });

  // Reset the game
  function resetGame() {
    startScreen.style.display = "block";
    againButton.style.display = "none";
    gameOutcomeWon.style.display = "none";
    gameOutcomeLost.style.display = "none";
    wrapper.style.display = "none";
    countDownTimer.style.display = "none";
  }
  // Again button
  againButton.addEventListener("click", function () {
    location.reload();
  });
});
