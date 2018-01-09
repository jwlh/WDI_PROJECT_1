![](https://www.coindesk.com/wp-content/themes/coindesk2/images/events/consensus-2015/sponsors-and-partners/general-assembly.png)

# WDI 30, PROJECT 1 - SIMON THE SYNTH
For our first project on the WDI course at General Assembly we were tasked with making a game using the knowledge of HTML, CSS, Javascript & JQuery we had learnt in the first two weeks of our course.

<img src="https://i.imgur.com/BSLwnEK.png" width="400">

For my game, I decided to create a SIMON game based on a retro synth pad.  In fact the sound effects for the game come from a Roland TB-303 an 80's Bassline synth that I used to use myself to write music back in my teenage years.

Link to app:  [https://simon-the-synth.herokuapp.com/](https://simon-the-synth.herokuapp.com/) 


I felt pretty confident with game logic and the Javascript side of things going into the project and I really wanted to make sure the styling was spot on as I wasn't as confident with CSS as I was with Javascript at this stage.

One thing I wanted to be absolutely buttoned down on was responsive design, making sure my game worked as well on a mobile or tablet as it did on a laptop.

<img src="https://i.imgur.com/VHvZVb9.png?1" width="200">




##Gameplay

To play the game you first select a level of difficulty (the default is medium), this will affect how quickly the sequence is played back to you, and press Play.

The starting sequence of 3 squares will light up, you then have to copy the sequence.  If you get it correct you will then be played the same sequence but with an extra square lit up at the end and so it continues as you guess correctly the sequence gets longer and longer.  

If you get the sequence wrong it resets to the beginning and you start again with a new sequence of 3 squares.

Your score is the length of the longest sequence you have repeated correctly.

The scrolling dot matrix style screen above the buttons displays various messages as you go through the game, from a welcome message when you first land on the page with instructions on how to play to various random messages as you get the sequence right or wrong and comments on the difficulty level you select and so on.

<img src="https://i.imgur.com/zUc9dY6.png?1" width="400">




##Improvements

In the future I would look at adding the ability to save you score, either by storing it in the browser's memory or via adding a backend element to the game.