const boxNodeList = document.querySelectorAll(".box");
document.querySelector("span").innerHTML = localStorage.getItem("best result");
let i = 90;
let counter = 0;
let compareIndex;
let showMsg;
let activeGame = true;

//ONLOAD

function startGame() {
    if(activeGame) {
        activeGame = false;
        document.querySelector("#btn-start").classList.add("hidden");
        boxNodeList[i].classList.add("green"); 
        generateRandomField();                  
        timer();
        document.querySelector(".timer").style.border = "2px solid rgb(211, 12, 12)";
    }
    //#region Events
    document.querySelector("#up").addEventListener("click", (e) => actionUp());
    document.querySelector("#left").addEventListener("click", (e) => actionLeft());
    document.querySelector("#right").addEventListener("click", (e) => actionRight());
    document.querySelector("#down").addEventListener("click", (e) => actionDown());
    // button events
    window.addEventListener("keydown", (e) => {
    if(e.keyCode == "38") {
        actionUp();
    }
    });
    window.addEventListener("keydown", (e) => {
    if(e.keyCode == "37") {
        actionLeft();
    }
    });
    window.addEventListener("keydown", (e) => {
    if(e.keyCode == "40") {
        actionDown();
    }
    });
    window.addEventListener("keydown", (e) => {
    if(e.keyCode == "39") {
        actionRight();
    }
    });
}

function timer() {
    let t = 58;
    let timerID = setInterval(() => {
        document.querySelector(".timer").innerText = `0:${t}`;
        t --;
        if(t < -1) {
            document.querySelector(".timer").innerText = "0:59";
            endGame(i);
            clearInterval(timerID);

        }
    }, 1000)
}

function endGame(i) {
    showMsg = `You got ${counter} flags !`;
    boxNodeList.forEach(elem => {
        elem.classList.remove("red-flag");
        elem.innerText = "";
    });
    boxNodeList[i].classList.remove("green");
    document.querySelector("#btn-start").classList.remove("hidden");
    alert(showMsg);
    if(document.querySelector("span").innerHTML == "") {
        localStorage.setItem("best result", counter);
        document.querySelector("span").innerHTML = localStorage.getItem("best result");
    } else if (document.querySelector("span").innerHTML < counter) {
        localStorage.setItem("best result", counter);
        document.querySelector("span").innerHTML = localStorage.getItem("best result");
    }
    counter = 0;
    document.querySelector(".counter").innerText = 0;
    activeGame = true;
    location.reload();
}
//tools
function validStep(coordinate) {
    if(coordinate >= 0 && coordinate <= 99) {
        return true;
    }
    return false;
}

function drowing(i, color) {
    boxNodeList[i].classList.add(color);
}

function cleanPrevBox(i, color) {
    boxNodeList[i].classList.remove(color);
    boxNodeList[i].innerText = "";
}

function gotTheFlag() {    
    if(i == compareIndex) {
        counter ++;
        cleanPrevBox(i);
        document.querySelector(".counter").innerText = counter;
        generateRandomField();
    }
}

function clearStorage() {
    localStorage.removeItem("best result");
    document.querySelector("span").innerHTML = "";
}


// Action button functions
function actionUp() {
    let nextStep = (i - 10);

    if(validStep(nextStep)) {
        cleanPrevBox(i, "green");
        i -= 10;
        drowing(i, "green")
    }
    gotTheFlag()
}

function actionLeft() {
    let nextStep = (i - 1);

    if(validStep(nextStep)) {
        cleanPrevBox(i, "green");
        i --;
        drowing(i, "green")
    }
    gotTheFlag()
}

function actionDown() {
    let nextStep = (i + 10);

    if(validStep(nextStep)) {
        cleanPrevBox(i, "green");
        i += 10;
        drowing(i, "green")
    }
    gotTheFlag()
}

function actionRight() {
    let nextStep = (i + 1);

    if(validStep(nextStep)) {
        cleanPrevBox(i, "green");
        i ++;
        drowing(i, "green")
    }
    gotTheFlag()
}

//random flag generator
function generateRandomField() {
    let i = Math.floor(Math.random() * 99);
    if(compareIndex != i) {
        compareIndex = i;
    } else if (compareIndex == i){
        (i != 0) ? compareIndex = --i : compareIndex = ++i;
    }        // for checking has got the flag or not
    drowing(compareIndex, "red-flag");
    boxNodeList[i].innerText = ("X");
}
