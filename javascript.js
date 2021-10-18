//variables
var playing = false; // keep track if user is playing or not
var score; // score of user
var time; //timeremaining user have
var counter; //loop time counter
var correctAnswer; //correct answer


// when start is pressed
document.getElementById("start").onclick = function() {

    //check if user is paying
    if (playing) { //if playing then reset the game
        location.reload();
    } else {
        //play game
        playing = true; //set user playing true
        score = 0; //initial score = 0

        document.getElementById("scorevalue").innerHTML = score; //set score

        time = 60; //choose initial time
        setTime(time); //set time in html
        show("time"); //showing time remaining
        hide("gameover"); //removing game over 

        document.getElementById("start").innerHTML = "Reset Game"; //start =reset button in html

        startCounter(); //start decreasing time
        GenerateQuestions(); //generate new questions
    }
}

//choices selection (options)
var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");

//if option is clicked
choice1.onclick = function() {

    if (playing) { //check if user is playing
        checkIfTrue(choice1.innerHTML == correctAnswer); //checking answer
    }
}
choice2.onclick = function() {

    if (playing) {
        checkIfTrue(choice2.innerHTML == correctAnswer);
    }
}
choice3.onclick = function() {

    if (playing) {
        checkIfTrue(choice3.innerHTML == correctAnswer);
    }
}
choice4.onclick = function() {

    if (playing) {
        checkIfTrue(choice4.innerHTML == correctAnswer);
    }
}

//check if user has clicked right choice
function checkIfTrue(check) {
    if (check == true) { //if answer is true

        score++; //increase score by 1
        document.getElementById("scorevalue").innerHTML = score; //set score in html

        hide("tryAgain"); //hide try again
        show("correct"); //show correct

        setTimeout(function() { //hide correct after 1s
            hide("correct");
        }, 1000);

        GenerateQuestions(); //create new question

    } else {
        hide("correct"); //hide correct
        show("tryAgain"); //show try again

        setTimeout(function() { //hide try again after 1s
            hide("tryAgain");
        }, 1000);
    }
}

//generate new question
function GenerateQuestions() {

    var x = 1 + Math.round(9 * Math.random()); //first number x
    var y = 1 + Math.round(9 * Math.random()); //second number y
    correctAnswer = x * y; //getting correct answer

    document.getElementById("question").innerHTML = x + "x" + y; // setting question in html

    var position = 1 + Math.round(3 * Math.random()); // making random choice for position of orrect answer
    document.getElementById("choice" + position).innerHTML = correctAnswer; //setting correct option there

    var answers = [correctAnswer]; //making list of answer

    for (i = 1; i < 5; i++) { //making other wrong 4 options
        if (i != position) { //it must not be put on true answer
            var wrongAnswer;
            do {
                //create new answer
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            } while (answers.indexOf(wrongAnswer) > -1); //checking if it is already in other options

            document.getElementById("choice" + i).innerHTML = wrongAnswer; //setting option
            answers.push(wrongAnswer); //appending to list
        }
    }
}

//time counter
function startCounter() {

    counter = setInterval(function() {
        //checking either time is up or not
        if (time >= 0) {

            setTime(time); //setting time in html
            time--; //decreasing time by 1
        } else {

            stopTime(); //time's up so stop timer
            setScore(); //get score from score and set in gameover div
            show("gameover"); //show gameover div
            hide("time"); //hiding time
            hide("correct"); // hiding correct
            hide("tryAgain"); //hiding false
            playing = false; //setting playin to false

            document.getElementById("start").innerHTML = "Start Game"; //making again reset button to start game
        }
    }, 1000);
}

//set remaining time
function setTime(time) {
    document.getElementById("timeRemaining").innerHTML = time;
}

//stop timer
function stopTime() {
    clearInterval(counter);
}

//set score in final game over box
function setScore() {
    var finalScore = document.getElementById("scorevalue").textContent;
    document.getElementById("finalScore").innerHTML = finalScore;
}

//showing corresponding elements
function show(id) {
    document.getElementById(id).style.visibility = "visible";
}

//hiding corresponding elements
function hide(id) {
    document.getElementById(id).style.visibility = "hidden";
}