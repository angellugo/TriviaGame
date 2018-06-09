var debug = true;

var numberOfMilisecondsToPlay = 10000;
var correctTally;
var incorrectTally;
var unansweredTally;
var clockRunning;
var intervalId;
var questions = [ 
    // format: [question, answer-1, answer-2, answer-3, answer-4, number of correct answer]
    ["What is Neo's last name?", "Anderson", "Alderson", "Smith", "Wachowski", 1],
    ["Who does Neo love?", "Smith", "Trinity", "Himself", "Nobody", 2],
    ["Who was the first choice to play Neo?", "Tom Cruise", "Bruce Willis", "Will Smith", "Samuel L. Jackson", 3]
];
var questionNumber;

$(document).ready(function () {
    showStartButton();

    $("#start-button").click(function () {
        $(this).remove();// remove the start button when it's clicked
        debug && console.log(" ------------------------------------- start-button removed");

        resetGame();
        playGame();
        
        
    });// end $("#start-button").click(function(){
});// end $(document).ready(function () {

var clock = {
    timer: 0,

    reset: function () {
        clock.timer = numberOfMilisecondsToPlay / 1000;
        clockRunning = false;
        $("#timer").text("Time remaining: " + clock.timer + " seconds");
        debug && console.log(" ------------------------------------- Clock reset ");
    }, // end  reset: function(){

    start: function () {

        if (!clockRunning) {
            intervalId = setInterval(clock.countdown, 1000);
            clockRunning = true;
        }
        debug && console.log(" ------------------------------------- Clock started ");
    }, // end start: function () {

    stop: function () {

        clearInterval(intervalId);
        clockRunning = false;
        debug && console.log(" ------------------------------------- Clock stopped ");
    },// end stop: function () {

    countdown: function () {
        clock.timer--;
        debug && console.log("clock.timer:", clock.timer);
        $("#timer").text("Time remaining: " + clock.timer + " seconds");

        if (clock.timer === 0) {
            clock.stop();
            unansweredTally++;
            playGame();
        }

    }// end countdown: function () {

};//end var clock = {

function resetGame() {
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    questionNumber = 0;
    clock.reset();
    debug && console.log(" ------------------------------------- Game reset ");
};// end function resetGame() {

function showStartButton() {
    var startButton = $("<button>");
    startButton.attr("id", "start-button");
    startButton.text("Start Trivia Game");
    $("#buttons").append(startButton);
    debug && console.log(" ------------------------------------- start-button added");
};// end function addStartButton(){

function playGame() {
    if (questionNumber < questions.length) showNextQuestion();
    $(".answers").click(function () {
        debug && console.log("pressed answers class");        
        var pressedButton = parseInt(this.id);
        var answer = questions[questionNumber-1][5];
        debug && console.log("pressed button with id=%d", pressedButton);
        if (pressedButton === answer){
            debug && console.log("You're correct!");
            correctTally++;
        }
        else{
            debug && console.log("You're wrong!");
            incorrectTally++;
        }
        clock.stop();
  
       
        if (questionNumber < questions.length) playGame();
    });
  
    debug && console.log("correctTally:", correctTally);
    debug && console.log("incorrectTally:", incorrectTally);
    debug && console.log("unansweredTally:", unansweredTally);
  
};// end function playGame(){

function showNextQuestion() {
    debug && console.log("Showing question %d", questionNumber);
    clock.reset();
    clock.start();
    $('#buttons').empty();

    $('#question').text(questions[questionNumber][0]);
    for (var index = 1; index <= 4; index++) {
        var button = $("<button>");
        button.addClass("answers");
        button.attr("id", index);
        button.attr("data-name", questions[questionNumber][index]);
        button.text(questions[questionNumber][index]);
        $('#buttons').append(button);
    }
    questionNumber++;
}; // end function showNextQuestion(){