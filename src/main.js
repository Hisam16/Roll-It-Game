'use strict';
//selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEL.classList.add('hidden');
const scores = [0, 0];
let activeplayer = 0;
let currentScore = 0;
let playing = true;
const init = function () {};
const switchPlayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rollong dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. genrating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `images/dice-${dice}.png`;
    //3/check for rolled 1 : if true , switch to next player
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to active player's score
    scores[activeplayer] += currentScore;
    //score[1] = score[1]+ currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];

    //2.check if player's score is greater than 100
    if (scores[activeplayer] >= 20) {
      //finish the game
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
});
