


$(() => {

  let playedArray = [];
  let ansArray = [];
  let numberOfButtons = 3;
  let highScore = 0;
  let currentScore = 0;




  //function to start game

  function startGame() {
    createAnsArray();
    playAnswer();

  }
  //get array of LIs from DOM and add their ID's to an array
  const $lisArray = $('li').map(function () {
    return this.id;
  }).get();

  //Add click event to each to add ID to user array
  $('li').on('click', (e) => {
    //added audio to each li click event
    new Audio(`./Roland_TB-303/${e.target.id}.mp3`).play();
    // change colour when clicked for short time
    $(e.target).animate({opacity: '1'}, 400, function() {
      $(e.target).animate({opacity: '0.7'}, 150);
    });

    //added function to push each Li's ID into array when clicked
    playedArray.push(e.target.id);
    console.log(playedArray);
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
    console.log(ansArray);
  }

  //function to play the sequence from the ansArray
  function playAnswer(){
    const difficultyLevel = parseInt($('#difficulty').find(':selected').val());
    $('#reset').prop('disabled',true);
    let counter = 0;
    const interval = setInterval(function() {
      if (counter === (ansArray.length - 1)) {
        $('#reset').prop('disabled',false);
        clearInterval(interval);
      }
      console.log(ansArray[counter]);
      $(`#${ansArray[counter]}`).animate({opacity: '1'});
      new Audio(`./Roland_TB-303/${ansArray[counter]}.mp3`).play();

      setTimeout(function() {
        $(`#${ansArray[counter]}`).animate({opacity: '0.7'});
        counter++;
      },50);
    }, difficultyLevel);

  }


  //function to check user answer
  function checkAnswer() {
    if (ansArray.toString() === playedArray.toString()){
      console.log('correct');
      updateScore();
      numberOfButtons++;
      playedArray = [];
      ansArray.push($lisArray[Math.floor(Math.random()*$lisArray.length)]);
      console.log(ansArray);
      playAnswer();

    } else {
      alert('incorrect');
      resetGame();
    }
  }
  //clicking on play button event
  $('#play').on('click', startGame);

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
  $('#reset').on('click', resetGame);

  //reset game function
  function resetGame() {
    playedArray = [];
    ansArray = [];
    numberOfButtons = 3;
    currentScore = 0;
    $('#currentScore').text(`Current Score = ${currentScore}`);
  }




}); // end of waiting for DOM to load function

// add click event to each button to push button id to an array
// add sfx to each button so it makes noise when it clicks
// create an array of all the button IDs (buttons can just have numbers as ID)  do this by pulling them in from DOM using jquery


// game play

//1. User clicks play button to start game
//2. randomly select 4 buttons from the button array and add to play array
//3. run through each button in play array and make it light up and play it's sfx (maybe this repeats 2/3 times?)  use set timeout to switch to light on version and then off for each square
//4. collect the id of each button the user clicks on into an array.
//5. once that has the same number of button ids as the play array stop and check the users array agains the play array
//6. if it is the same update user score to the lenght of that array, add a new button ID to the end of the play array, clear the users array and loop back to step 2.  If incorect stop play and give user their score from the round before (i.e. the last time they got the sequence correct)

// additional features

//1. volume slider to look like mixing deck slider to adjust sound volume of alerts
//2. difficluty selector to look like mixing nob.  difficluty selector adjusts speed which the computer plays through the sequence of buttons harder = quicker



// const liArray = [];
// let counter = 0;
// setInterval(function() {
//   liArray[counter].addClass('light');
//   setTimeout(function() {
//     liArray[counter].removeClass('light');
//     counter++;
//   }, 600);
//
//   if (counter === liArray.length) {
//     clearInterval();
//   }
// }, 1000);
