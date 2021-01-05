const gameBox = document.querySelector(".game-box");
const cells = Array.from(document.querySelectorAll(".cell"));
const lightboxContainer = document.querySelector(".lightbox-container");
const restartBtn = document.getElementById("restart");
const winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; // the exact order of cells a player needs mark to win the game
const playerX= "X";
const playerO = "O";
let currentPlayer = playerO;



cells.forEach(cell => cell.addEventListener("click", playerClicked));
restartBtn.addEventListener("click" , restartGame);




function playerClicked(e) {
    if (e.target.innerText === "") {
        e.target.innerText = currentPlayer;
        if (checkWin()) {
            showLightBox(false)
        }
        else if (checkDraw()) {
            showLightBox(true)
        } else {
            currentPlayer = currentPlayer === playerO ? playerX : playerO;
        }
    }
}

function checkWin() {
    // below we loop through all cells in the game and check the player merkes on the cells if it matches any win combination mark
    return winCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].innerText === currentPlayer;
        })
    })
}

function checkDraw() {
    return cells.every(cell => cell.innerText !== "");
}

function restartGame(){
    cells.forEach(cell => cell.innerText = "");
    currentPlayer = "O";
    hideLightBox();
}


function showLightBox(check) {
    if(check){
        lightboxContainer.firstElementChild.firstElementChild.innerText = "Draw";
    }else{
        lightboxContainer.firstElementChild.firstElementChild.innerText = `Player${currentPlayer} Won`;
    }
    lightboxContainer.style.transform = "scale(1,1)";
    lightboxContainer.firstElementChild.style.transform = "scale(1,1)"; 
}

function hideLightBox() {
    lightboxContainer.style.transform = "scale(0,0)";
    lightboxContainer.firstElementChild.style.transform = "scale(0,0)";

}


