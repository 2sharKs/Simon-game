//initialise a level.
var currentLevel = 1;
var arrayPattern = "" + (Math.floor(Math.random() * 4) + 1);
var arraySolved = "";
var startit = 0;
var cutoff=0;

//initiate the pattern.
function generatePattern() {
    for (var i = arrayPattern.length; i < currentLevel; i++) {
        arrayPattern += (Math.floor(Math.random() * 4) + 1);
        console.log("arraypattern " + arrayPattern);
        animatePattern(arrayPattern[arrayPattern.length - 1]);
    }

}

//showing level sequence.
function animatePattern(num){
    switch (num) {
        case '1':
            pressAnimation("green");
            break;
        case '2':
            pressAnimation("red");
            break;
        case '3':
            pressAnimation("yellow");
            break;
        case '4':
            pressAnimation("blue");
            break;
        default:
            break;
    }

}

//press a to start.
$(document).keydown(function (event) {
    console.log(event.key);
    if (event.key === "a") {
        $("h1").text("Level " + currentLevel);
        startit = 1;
        if(cutoff==0){
            setTimeout(function(){
                animatePattern(arrayPattern);
            },1000)
            cutoff=1;
        }
    }

});



//button make sound.
//green 1
$(".green").click(function () {
    if (startit == 0) {
        gameOver();
    }
    else {
        pressAnimation("green");
        arraySolved += '1';
        console.log(arraySolved);
        isSolved();
    }


});


//red 2
$(".red").click(function () {
    if (startit == 0) {
        gameOver();
    }
    else {
        pressAnimation("red");
        arraySolved += '2';
        console.log(arraySolved);
        isSolved();
    }
});



//yellow 3
$(".yellow").click(function () {
    if (startit == 0) {
        gameOver();
    }
    else {
        pressAnimation("yellow");
        arraySolved += '3';
        console.log(arraySolved);
        isSolved();
    }
});

//blue 4
$(".blue").click(function () {
    if (startit == 0) {
        gameOver();
    }
    else {
        pressAnimation("blue");
        arraySolved += '4';
        console.log(arraySolved);
        isSolved();
    }
});



function pressAnimation(boxColor) {
    playSound(boxColor);
    $("." + boxColor).addClass("pressed");
    setTimeout(function () { $("." + boxColor).removeClass("pressed") }, 100);
}


function playSound(button) {
    var mp3Source = "sounds/" + button + ".mp3";
    var audio1 = new Audio(mp3Source);
    audio1.play();
}


//checking if patterns match?
function isSolved() {
    if (arraySolved == arrayPattern && arrayPattern != "") {
        $("h1").text("Correct!!");
        setTimeout(function () {
            $("h1").text("Level increased!! " + currentLevel + " -> " + (++currentLevel));
        }, 1000);
        setTimeout(function () {
            $("h1").text("Level " + currentLevel);
        }, 2000);
        arraySolved ="";
        setTimeout(function () {
            generatePattern();
        }, 2000);
        
    }

    else if ((arraySolved != arrayPattern) && (arraySolved.length == arrayPattern.length) && arrayPattern != "") {
        gameOver();
        arraySolved = "000";
        arrayPattern = "0010";
        currentLevel = 1;
        $(document).keydown(function (event) {
            $("h1").text("Level " + currentLevel);
            arraySolved = "";
            arrayPattern = "";
        });
        setTimeout(function () {
            generatePattern();
        }, 2000);
    }
}

function gameOver() {
    $("h1").text("Game Over, Press Any Key to Restart.");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () { $("body").removeClass("game-over") }, 100);
}