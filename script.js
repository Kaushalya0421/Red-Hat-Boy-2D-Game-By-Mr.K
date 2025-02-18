function controller(Event) {
    if (Event.key == "Enter" && runWorkerNumber == 0) {
        run();
        runSound.play();
        moveBackground();
        updateScore();
        flamelocations.forEach(generateFlames);
        document.getElementById("startMessage").style.display = "none";
    }

     if (Event.key == " " && jumpWorkerNumber == 0) {
        if (runWorkerNumber != 0) {
            clearInterval(runWorkerNumber);
            runSound.pause();
            jump();
            jumpSound.play();
        }
    }
}

var runImgNumber = 1;
var runWorkerNumber = 0;
var runSound = new Audio("run.mp3");
runSound.loop = true;

function run() {      
    runWorkerNumber = setInterval(() => {
        runImgNumber++;
        if (runImgNumber == 9) runImgNumber = 1;
        document.getElementById("boy").src = "run" + runImgNumber + ".png";
    }, 150);
}

var jumpWorkerNumber = 0;
var jumpImgNumber = 1;
var jumpMarginTop = 595;
var jumpSound = new Audio("jump.mp3");

function jump() {
    jumpWorkerNumber = setInterval(() => {
        jumpImgNumber++;
        if (jumpImgNumber < 8) {
            jumpMarginTop -= 25;
        } else if (jumpImgNumber > 7) {
            jumpMarginTop += 25;
        }
        document.getElementById("boy").style.marginTop = jumpMarginTop + "px";

        if (jumpImgNumber == 13) {
            jumpImgNumber = 1;
            clearInterval(jumpWorkerNumber);
            jumpWorkerNumber = 0;
            run();
            runSound.play();
        }

        document.getElementById("boy").src = "jump" + jumpImgNumber + ".png";
    }, 100);
}

var backgroundWorker = 0;

var backgroundPosition = 0;

function moveBackground() {
    backgroundWorker = setInterval(() => {
        backgroundPosition -= 10;
        document.getElementById("background").style.backgroundPositionX = backgroundPosition + "px";
    }, 50);
}

var scoreWorker = 0;
var score = 0;

function updateScore() {
    scoreWorker = setInterval(() => {
        if (score == 500) {
            clearInterval(runWorkerNumber);
            runSound.pause();
            clearInterval(scoreWorker);
            clearInterval(backgroundWorker);
            flameWorkers.forEach(clearInterval);
            document.getElementById("youwon").style.visibility = "visible";
        }
        score += 10;
        document.getElementById("score").innerHTML = score;
    }, 200);
}

var flamelocations = ["500", "1000", "1500", "2000", "2500", "3000", "3500"];
var flameWorkers = [];

function generateFlames(x) {
    var i = document.createElement("img");
    i.src = "flame.gif";
    i.className = "flame";
    i.style.marginLeft = x + "px";
    document.getElementById("background").appendChild(i);

    var flameWorker = setInterval(() => {
        if (x == 200 && jumpWorkerNumber == 0) {
            stopGame();
        }
        x -= 10;
        i.style.marginLeft = x + "px";
    }, 50);

    flameWorkers.push(flameWorker);
}

var deadWorker = 0;
var deadImgNumber = 1;
var deadSound = new Audio("dead.mp3");

function stopGame() {
    clearInterval(runWorkerNumber);
    runSound.pause();
    clearInterval(backgroundWorker);
    clearInterval(scoreWorker);
    flameWorkers.forEach(clearInterval);
    dead();
    deadSound.play();
}

function dead() {
    deadWorker = setInterval(() => {
        deadImgNumber++;
        if (deadImgNumber == 11) {  
            deadImgNumber = 1;
            clearInterval(deadWorker);  
            document.getElementById("end").style.visibility = "visible";
            document.getElementById("endScore").innerHTML = score;
        }
        document.getElementById("boy").src = "dead" + deadImgNumber + ".png";
    }, 100);
}


function reload() {
    location.reload();
}
