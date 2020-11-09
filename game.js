let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;

function playPattern() {

  // Generates new random color and adds it to the game pattern
  nextSeq();

  // Plays the entire pattern from beginning
  for (var i = 0; i < gamePattern.length; i++) {
    setTimeout(function(i) {
      $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
      playSound(gamePattern[i]);
    }, 600 * i, i)

  }

}

// Genrates a random color (next sequence in pattern)
function nextSeq() {
  let randomNumber = Math.round(Math.random() * 3);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  level++;
  $("#level-title").text("Level " + level);
}

// No longer used
function nextSequence() {

  let randomNumber = Math.round(Math.random() * 3);
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
  }, 100);
}

// Checks if the user answer matches the specified pattern
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    console.log("succes");

    if (currentLevel + 1 === gamePattern.length) {

      setTimeout(function() {
        // nextSequence();
        playPattern()
      }, 1000);

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

// Future implementation of leaderboard ---------------------------
function addElement() {
  console.log("I WAS PRESSED");
  $(".list-group").append("<li>THIS IS THE NEW ROW</li>");
}

class Player {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
}

let timmy = new Player("Timmy", 1);
let tommy = new Player("Tommy", 10);
let jack = new Player("Jack", 100);

let listOfPlayers = [timmy, tommy, jack];

function createLeaderboard() {

  for (let i = 0; i < listOfPlayers.length; i++) {
    $(".list-group").append("<li>" + listOfPlayers[i].name + " - " + listOfPlayers[i].level + "</li>");
  }

}

// Future implementation of leaderboard ---------------------------
