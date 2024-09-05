var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColumns;

var col = 7;
var row = 6;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    for (let r = 0; r < row; r++) {
        let row = [];
        for (let c = 0; c < col; c++) {
            // JS
            row.push(" ");

            //HTML
            let tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
            tile.addEventListener("click", changeTurn);
        }
        board.push(row);
    }
}

function changeTurn() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); // returns an arr = ["r","c"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if (r < 0) {
        return;
    }

    let tile = document.getElementById(`${r}-${c}`);
    board[r][c] = currPlayer;
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        tile.style = "pointer-events: none;";
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        tile.style = "pointer-events: none;";
        currPlayer = playerRed;
    }
    r--;
    currColumns[c] = r;
    checkWinner();
}

function checkWinner() {
    // horizontal 
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col - 3; c++) {
            if (board[r][c] != " ") {
                if (
                    board[r][c] == board[r][c + 1] &&
                    board[r][c + 1] == board[r][c + 2] &&
                    board[r][c + 2] == board[r][c + 3]
                ) {
                    setWinner(r, c);
                }
            }
        }
    }

    // vertical 
    for (let c = 0; c < col; c++) {
        for (let r = 0; r < row - 3; r++) {
            if (board[r][c] != " ") {
                if (
                    board[r][c] == board[r + 1][c] &&
                    board[r + 1][c] == board[r + 2][c] &&
                    board[r + 2][c] == board[r + 3][c]

                ) {
                    setWinner(r, c);
                }
            }

        }
    }

    // for diagonal(1)
    for (let r = 0; r < row - 3; r++) {
        for (let c = 0; c < col - 3; c++) {
            if (board[r][c] != " ") {
                if (
                    board[r][c] == board[r + 1][c + 1] &&
                    board[r + 1][c + 1] == board[r + 2][c + 2] &&
                    board[r + 2][c + 2] == board[r + 3][c + 3]
                ) {
                    setWinner(r, c);
                }
            }
        }
    }

    // for diabonal(2)
    for (let r = (row - 1); r > (row - 4); r--) {
        for (let c = 0; c < col - 3; c++) {
            if (board[r][c] != " ") {
                if (
                    board[r][c] == board[r - 1][c + 1] &&
                    board[r - 1][c + 1] == board[r - 2][c + 2] &&
                    board[r - 2][c + 2] == board[r - 3][c + 3]
                ) {
                    setWinner(r, c);
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {

        winner.innerText = "Red Wins";
    }
    else {
        winner.innerText = "Yellow Wins";
    }
    gameOver = true;
}