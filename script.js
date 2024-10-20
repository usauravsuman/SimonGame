var buttonColours = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(".btn-start").click(() => {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});
$(".btn").click(function () {
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor);
    animatePress(userChoosenColor);

    checkAnswer(userClickedPattern.length - 1);
})
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }

    else {
        console.log("Wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            var audio = new Audio('Resources/lose.mp3');
            audio.play();
        }, 100)
        setTimeout(() => { $("body").removeClass('game-over') }, 3000);
        $("#level-title").text("Game Over! Press Start to Begin");
        startOver();
    }
}
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('.' + 'randomChosenColour').fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);

}


function playSound(name) {
    var audio = new Audio("Resources/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(() => { $('#' + currentColour).removeClass('pressed') }, 100);
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}