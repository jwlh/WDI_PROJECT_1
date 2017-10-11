
//things to do today
//add mode where you can just play around with the synth
//remove blue highlighting around play and rest buttons when you click


$(() => {

  let playedArray = [];
  let ansArray = [];
  let numberOfButtons = 3;
  let highScore = 0;
  let currentScore = 0;
  let difficultyLevel = 600;

  enablePlay();
  animateTicker();
  enableLiClicks();


  //function to start game
  function startGame() {
    updateTicker('Let\'s Play!');
    disableLiClicks();
    disablePlay();
    disableReset();
    createAnsArray();
    playAnswer();

  }

  //get array of LIs from DOM and add their ID's to an array
  const $lisArray = $('li').map(function () {
    return this.id;
  }).get();

  //add click event to difficulty selectors
  $('h4').on('click', (e) => {
    $('h4').removeClass('neon');
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

  //Add click event to each li
  function enableLiClicks(){
    $('li').on('click', (e) => {
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
    $('li').off('click');
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

      updateTicker('CORRECT! On to the next level!');
      updateScore();
      numberOfButtons++;
      playedArray = [];
      ansArray.push($lisArray[Math.floor(Math.random()*$lisArray.length)]);
      disableReset();
      disableLiClicks();
      setTimeout(playAnswer, 2000);
    } else {
      updateTicker('WRONG!!! Press play to start again');
      resetGame();
    }
  }

  //clicking on play button event
  function enablePlay(){
    $('#play').on('click', startGame);
  }

  //disable clicking on play button event
  function disablePlay(){
    $('#play').off('click');
  }


  //function to update score
  function updateScore() {
    currentScore = ansArray.length;
    $('#currentScore').text(`Current Score = ${currentScore}`);

    if (parseInt(highScore) === 0) {
      highScore = currentScore;
      $('#highScore').text(`High Score = ${highScore}`);
    } else if (parseInt(currentScore) > parseInt(highScore)) {
      highScore = currentScore;
      $('#highScore').text(`High Score = ${highScore}`);
    }
  }

  //click event for reset button
  function enableReset(){
    $('#reset').on('click', resetGame);
    $('#reset').on('click', displayResetMessage);
  }

  //click event to disable reset button
  function disableReset(){
    $('#reset').off('click');
  }



  //reset game function
  function resetGame() {

    enablePlay();
    playedArray = [];
    ansArray = [];
    numberOfButtons = 3;
    currentScore = 0;
    $('#currentScore').text(`Current Score = ${currentScore}`);
  }

  // function to update text in ticker-wrap
  function updateTicker(sample) {
    $('.ticker-text').stop(true,true);
    $('.ticker-text').html(sample);
    animateTicker();
  }

  //animation of ticker text
  function animateTicker() {
    $('.ticker-text').animate({
      left: '420px'},1);
    $('.ticker-text').animate({
      left: '-600px'
    }, 6000,'linear', animateTicker);
  }

  function displayResetMessage() {
    updateTicker('Game has been reset...Press Play to start');
  }
}); // end of waiting for DOM to load function
