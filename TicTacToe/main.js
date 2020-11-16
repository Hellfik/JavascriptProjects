let player = "X";
let scores = {
    x: 0,
    o: 0
};

const winCombinaisons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const scoreX = document.getElementById('scoreX');

const scoreO = document.getElementById('scoreO');

const cells = document.getElementsByTagName('td');

const closeBtn = document.getElementById('closeModal');

const modal = document.getElementById('modal');

const darkBg = document.getElementById('darkBackground');

let winMessage = document.getElementById('winMessage');


for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.addEventListener('click', function(e) {
        if (e.target.innerText === "") {
            e.target.innerText = player;
            checkWinner();
            switchPlayer();
        }
    });
}

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    darkBg.style.display = "none";
    winMessage.innerText = "";
});

function switchPlayer() {
    player = player === "X" ? "O" : "X";
}

function resetGame() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
    }
}

function checkWinner() {
    const matched = winCombinaisons.some((comb) => comb.every((ci) => cells[ci].innerText == player));
    if (matched) {
        winMessage.innerText = `Player ${player}: You won !!`;
        if (player == "X") {
            scores.x++;
            scoreX.innerText = scores.x;
        } else {
            scores.o++;
            scoreO.innerText = scores.o;
        }
        openModal();
        resetGame();

    } else {
        const cellsArray = Array.from(cells);
        if (cellsArray.every((cell) => cell.innerText != "")) {
            winMessage.innerText = "Match Draw !!";
            openModal();
            resetGame();
        }
    }
}

function resetParty() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
    }
    scores.x = 0;
    scores.o = 0;
    scoreX.innerText = scores.x;
    scoreO.innerText = scores.o;
}



function openModal() {
    modal.style.display = "flex";
    darkBg.style.display = "block";

}