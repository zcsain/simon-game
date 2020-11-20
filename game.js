let gamePattern = [];
// let buttonColors = ["red", "blue", "green", "yellow"];
let buttonColors = ["red", "blue", "green", "yellow", "deepskyblue", "fuchsia", "lime", "maroon", "navy"];
let userClickedPattern = [];
let level = 0;
let length = buttonColors.length - 1;

function playPattern() {

  // Generates new random color and adds it to the game pattern
  nextSeq();

  // Plays the entire pattern from beginning
  for (var i = 0; i < gamePattern.length; i++) {
    setTimeout(function(i) {
      $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
      playSound(gamePattern[i]);
    }, 750 * i, i)

  }

}

// Genrates a random color (next sequence in pattern)
function nextSeq() {
  let randomNumber = Math.round(Math.random() * length);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  level++;
  $("#level-title").text("Level " + level);
}

// No longer used
function nextSequence() {

  let randomNumber = Math.round(Math.random() * length);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  level++;
  $("#level-title").text("Level " + level);
}

// Plays the right sound based on the color value of the activated button
function playSound(color) {
  let sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

// Animates the press of a button
function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 110);
}

// Checks if the user answer matches the specified pattern
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    console.log("succes");

    if (currentLevel + 1 === gamePattern.length) {

      setTimeout(function() {
        // nextSequence();
        playPattern()
      }, 1150);

      userClickedPattern = [];

    }

  } else {
    // Dispay game over message
    gameOver();
    console.log("wrong");
  }

}

// Game lost, reset everything and display game over message
function gameOver(flag = 1) {

  level = 0;
  gamePattern = [];
  userClickedPattern = [];

  if (flag) {

    $("#level-title").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 150);

    let sound = new Audio("sounds/wrong.mp3");
    sound.play();

  }

}

// Listen for button press, then add button color value to array
$(".btn").on("click", function() {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);

  if (level) {
    checkAnswer(userClickedPattern.length - 1);
  } else {
    gameOver(flag = 0);
  }

})

// Listen for keyboard press, then start the game
$(document).on("keydown", function() {

  if (!level) {
    // nextSequence();
    setTimeout(function () {
      playPattern();
    }, 400);
    console.log("START");
  }
})

// Changes the title of the page when user leaves tab/returns to tab with the game
let titel = document.title;
let blurMessage = "Don't go, it's lonely here";
let focusMessage = "Simon Game"

window.addEventListener("blur", function() {
  document.title = blurMessage;
});

window.addEventListener("focus", function() {
  $("title").text(focusMessage);
})
