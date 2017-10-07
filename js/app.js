$(() => {
  let chosenLi;
  let playedArray = [];
  let ansArray = [];
  let numberOfButtons = 3;
  //get array of LIs from DOM and add their ID's to an array
  const $lisArray = $('li').map(function () {
    return this.id;
  }).get();

  //Add click event to each to add ID to user array
  $('li').on('click', (e) => {
    //added audio to each li click event
    new Audio(`./Roland_TB-303/${e.target.id}.mp3`).play();
    // change colour when clicked for short time
    $(e.target).animate({opacity: '1'}, {
      duration: 5,
      complete: function(){
        $(`#${chosenLi}`).animate({opacity: '0.6'},50);
      }
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
    createAnsArray();

    for (let i=0; i<ansArray.length; i++) {

      setTimeout(function(){
        chosenLi = ansArray[i];
        $(`#${chosenLi}`).animate({opacity: '1'}, {
          duration: 50,
          complete: function(){
            $(`#${chosenLi}`).animate({opacity: '0.6'},50);
          }
        });
      });

    }
  }




  function checkAnswer() {
    if (ansArray.toString() === playedArray.toString()){
      console.log('correct');
      numberOfButtons++;
      playedArray = [];
      ansArray.push($lisArray[Math.floor(Math.random()*$lisArray.length)]);
      console.log(ansArray);

    } else {
      console.log('incorrect');
    }
  }
  //clicking on play button event
  $('#play').on('click', playAnswer);








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
