// =============================
// Select Elements
// =============================

const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const newBtn = document.querySelector("#new-btn");

const winnerContainer = document.querySelector(".winner-container");
const msg = document.querySelector("#msg");
const turnText = document.querySelector("#turn");

const scoreO = document.querySelector("#scoreO");
const scoreX = document.querySelector("#scoreX");
const drawScore = document.querySelector("#drawScore");

// =============================
// Game Variables
// =============================

let turnO = true;
let moveCount = 0;

let oWins = 0;
let xWins = 0;
let draws = 0;

// =============================
// Winning Patterns
// =============================

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// =============================
// Enable Boxes
// =============================

function enableBoxes(){

    boxes.forEach(box=>{

        box.disabled = false;
        box.innerText = "";
        box.classList.remove("win");

    });

}

// =============================
// Disable Boxes
// =============================

function disableBoxes(){

    boxes.forEach(box=>{

        box.disabled = true;

    });

}

// =============================
// Reset Board
// =============================

function resetGame(){

    turnO = true;
    moveCount = 0;

    turnText.innerText = "Turn : O";

    enableBoxes();

    winnerContainer.classList.add("hide");

}

// =============================
// Winner Popup
// =============================

function showWinner(winner){

    msg.innerText = `🎉 Winner is ${winner}`;

    winnerContainer.classList.remove("hide");

    if(winner==="O"){

        oWins++;
        scoreO.innerText = oWins;

    }else{

        xWins++;
        scoreX.innerText = xWins;

    }

    disableBoxes();

}

// =============================
// Draw Popup
// =============================

function showDraw(){

    msg.innerText = "🤝 Match Draw";

    winnerContainer.classList.remove("hide");

    draws++;

    drawScore.innerText = draws;

    disableBoxes();

}

// =============================
// Check Winner
// =============================

function checkWinner(){

    for(let pattern of winPatterns){

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){

            if(pos1===pos2 && pos2===pos3){

                boxes[pattern[0]].classList.add("win");
                boxes[pattern[1]].classList.add("win");
                boxes[pattern[2]].classList.add("win");

                showWinner(pos1);

                return true;

            }

        }

    }

    return false;

}

// =============================
// Box Click
// =============================

boxes.forEach(box=>{

    box.addEventListener("click",()=>{

        if(turnO){

            box.innerText="O";

            turnO=false;

            turnText.innerText="Turn : X";

        }

        else{

            box.innerText="X";

            turnO=true;

            turnText.innerText="Turn : O";

        }

        box.disabled=true;

        moveCount++;

        let winnerFound = checkWinner();

        if(!winnerFound && moveCount===9){

            showDraw();

        }

    });

});

// =============================
// Buttons
// =============================

resetBtn.addEventListener("click",resetGame);

newBtn.addEventListener("click",resetGame);