
//things to do today
//add mode where you can just play around with the synth
//remove blue highlighting around play and rest buttons when you click
// make buttons look grey by adding a class called hidden to all of them that makes the colour grey then remove that class when they are added and add it back in after a certain period of time

$(() => {

  let playedArray = [];
  let ansArray = [];
  let numberOfButtons = 3;
  let highScore = 0;
  let currentScore = 0;
  let difficultyLevel = 750;

  enablePlay();
  animateTicker();


  //function to start game
  function startGame() {
    updateTicker('Let\'s play !!');
    disablePlay();
    createAnsArray();
    disableReset();
    playAnswer();
    enableReset();
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
    console.log(e.target.id);
    if (e.target.id === '1000') {
      updateTicker('Easy...Oh was it too hard for you?????');
    } else if (e.target.id === '750') {
      updateTicker('Medium...So you are calling yourself average basically');
    } else if (e.target.id === '500') {
      updateTicker('Hard...Pretty confident are we???');
    }
  });

  //Add click event to each li
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
    //then check if players array is the smae length as the answer array, if it is check they are the same or not
    if (ansArray.length === playedArray.length) {
      checkAnswer();
    }
  });


  //randomly select 3 li id's from the array of all id's
  function createAnsArray(){
    for (let i=0; i<numberOfButtons; i++) {
      ansArray.push($lisArray[Math.floor(Math.random()*$lisArray.length)]);
    }
  }

  //function to play the sequence from the ansArray
  function playAnswer(){
    $('#reset').prop('disabled',true);
    let counter = 0;
    const interval = setInterval(function() {
      if (counter === (ansArray.length - 1)) {
        $('#reset').prop('disabled',false);
        clearInterval(interval);
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
      setTimeout(playAnswer, 2000);
      enableReset();
    } else {
      updateTicker('WRONG!!! WRONG!!! WRONG!!!');
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
  }

  //click event to disable reset button
  function disableReset(){
    $('#reset').off('click');
  }



  //reset game function
  function resetGame() {
    updateTicker('Game is reset, press play to go again');
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
    }, 10000,'linear', animateTicker);
  }
}); // end of waiting for DOM to load function
