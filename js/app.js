let playedArray = [];
let ansArray = [];
let numberOfButtons = 3;
let highestScore = 0;
let score = 0;
let difficultyLevel = 600;
let $h4;
let $li;
let $play;
let $reset;
let $currentScore;
let $highScore;
let $tickerText;
let $lisArray;

$(init);

function init() {

  $h4 = $('h4');
  $li = $('li');
  $play = $('.play');
  $reset = $('.reset');
  $currentScore = $('#currentScore');
  $highScore = $('#highScore');
  $tickerText = $('.ticker-text');

  //get array of LIs from DOM and add their ID's to an array
  $lisArray = $li.map(function () {
    return this.id;
  }).get();

  enablePlay();
  displayWelcome();
  enableLiClicks();
  enableDifficultySelectors();
  enableReset();
}
//function to start game
function startGame() {
  $play.removeClass('symbol-hidden');
  setTimeout(function() {
    $play.addClass('symbol-hidden');
  },500);
  updateTicker('Let\'s Play!');
  disableLiClicks();
  disablePlay();
  disableReset();
  createAnsArray();
  playAnswer();

}
//add click event to difficulty selectors
function enableDifficultySelectors(){

  $h4.on('click', (e) => {
    $h4.removeClass('neon');
    $(e.target).addClass('neon');
    difficultyLevel = parseInt(e.target.id);
    if (e.target.id === '800') {
      updateTicker('Easy...BORING...Press Play to start');
    } else if (e.target.id === '600') {
      updateTicker('Medium...Sensible choice...Press Play to start');
    } else if (e.target.id === '300') {
      updateTicker('Hard...Ballsy...Press Play to start');

    }
    resetGame();
  });
}
//Add click event to each li
function enableLiClicks(){
  $li.on('click', (e) => {
    //added audio to each li click event
    new Audio(`./Roland_TB-303/${e.target.id}.mp3`).play();
    // change colour when clicked for short time
    $(e.target).removeClass('hidden');
    setTimeout(function() {
      $(e.target).addClass('hidden');
    },500);
    //added function to push each Li's ID into array when clicked
    playedArray.push(e.target.id);
    //then check if players array is the samee length as the answer array, if it is check they are the same or not
    if (ansArray.length === playedArray.length) {
      checkAnswer();
    }
  });
}
//remove click events from lis
function disableLiClicks() {
  $li.off('click');
}
//randomly select 3 li id's from the array of all id's
function createAnsArray(){
  for (let i=0; i<numberOfButtons; i++) {
    ansArray.push($lisArray[Math.floor(Math.random()*$lisArray.length)]);
  }
}
//function to play the sequence from the ansArray
function playAnswer(){
  let counter = 0;
  const interval = setInterval(function() {
    if (counter === (ansArray.length - 1)) {
      clearInterval(interval);
      enableReset();
      enableLiClicks();
    }

    $(`#${ansArray[counter]}`).removeClass('hidden');
    new Audio(`./Roland_TB-303/${ansArray[counter]}.mp3`).play();

    setTimeout(function() {
      $(`#${ansArray[counter]}`).addClass('hidden');
      counter++;
    },(difficultyLevel-100));
  }, difficultyLevel);

}
//function to check user answer
function checkAnswer() {
  if (ansArray.toString() === playedArray.toString()){
    correctTicker();
    updateScore();
    numberOfButtons++;
    playedArray = [];
    ansArray.push($lisArray[Math.floor(Math.random()*$lisArray.length)]);
    disableReset();
    disableLiClicks();
    disablePlay();
    setTimeout(playAnswer, 2000);
  } else {
    updateTicker('WRONG!!! Press play to start again');
    resetGame();
  }
}
//function to randomise correct message on ticker
function correctTicker(){
  const messageArray = ['CORRECT! On to the next level!','WOW! You have a great memory!', 'Well that\'s just showing off now!', 'Nice One! On we go!'];
  updateTicker(messageArray[Math.floor(Math.random()*messageArray.length)]);
}
//clicking on play button event
function enablePlay(){
  $play.on('click', startGame);
  $play.on('click', colorPlaySymbol);
}
//function fade colour up and down on play symbol
function colorPlaySymbol(){
  $play.removeClass('symbol-hidden');
  setTimeout(function() {
    $play.addClass('symbol-hidden');
  },1000);
}
//function fade colour up and down on reset symbol
function colorResetSymbol(){
  $reset.removeClass('symbol-hidden');
  setTimeout(function() {
    $reset.addClass('symbol-hidden');
  },1000);
}
//disable clicking on play button event
function disablePlay(){
  $play.off('click');
}
//function to update score
function updateScore() {
  score= ansArray.length;
  $currentScore.text(`Current Score = ${score}`);
}
//function to update High Scor
function updateHighScore() {
  if (parseInt(highestScore) === 0) {
    highestScore = score;
    $highScore.text(`Highest Score = ${highestScore}`);
  } else if (parseInt(score) > parseInt(highestScore)) {
    highestScore = score;
    $highScore.text(`Highest Score = ${highestScore}`);
  }
}
//click event for reset button
function enableReset(){
  $reset.on('click', resetGame);
  $reset.on('click', displayResetMessage);
  $reset.on('click', colorResetSymbol);
}
//click event to disable reset button
function disableReset(){
  $reset.off('click');
}
//reset game function
function resetGame() {
  updateHighScore();
  playedArray = [];
  ansArray = [];
  numberOfButtons = 3;
  score = 0;
  updateScore();
  enablePlay();
}
// function to update text in ticker-wrap
function updateTicker(sample) {
  $tickerText.stop(true,true);
  $tickerText.html(sample);
  animateTicker();
}
//animation of ticker text
function animateTicker() {
  $tickerText.animate({
    left: '420px'},1);
  $tickerText.animate({
    left: '-600px'
  }, 6000,'linear');
}
//special ticker message for welcome
function displayWelcome(){
  $tickerText.stop(true,true);
  $tickerText.html('Hi, Welcome to Simon The Synth. Please press play to start the game.');
  animateLongTicker();
}
//animation of ticker text
function animateLongTicker() {
  $tickerText.animate({
    left: '420px'},1);
  $tickerText.animate({
    left: '-1020px'
  }, 7000,'linear',animateLongTicker);
}
//special ticker message for reset game
function displayResetMessage() {
  updateTicker('Game has been reset...Press Play to start');
}
