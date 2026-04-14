const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status"); //statusText.textContent = "Player O Wins!";

let currentPlayer = "X";//Stores whose turn
let gameActive = true;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];//never chnages

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(cell, index));
});

function handleClick(cell, index) {
    if (cell.textContent !== "" || !gameActive) return; //If box NOT empty So cannot click same box again. game ended Then stop.

    cell.textContent = currentPlayer;  //current player symbol inside box.
    cell.classList.add(currentPlayer);

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if ([...cells].every(cell => cell.textContent !== "")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's Turn";
}