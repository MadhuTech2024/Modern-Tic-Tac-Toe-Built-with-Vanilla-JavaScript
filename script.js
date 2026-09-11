const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector("#msg-container");
const msg = document.querySelector("#msg");
const turnDisplay = document.querySelector("#turn-display");

let turnX = true;
let count = 0; // Tracks moves for draw detection

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    turnDisplay.innerText = "Player X";
    turnDisplay.className = "player-x";
};

const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x-val", "o-val");
    });
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = `It's a Draw! 🤝`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            box.classList.add("x-val");
            turnDisplay.innerText = "Player O";
            turnDisplay.className = "player-o";
            turnX = false;
        } else {
            box.innerText = "O";
            box.classList.add("o-val");
            turnDisplay.innerText = "Player X";
            turnDisplay.className = "player-x";
            turnX = true;
        }

        box.disabled = true;
        count++;

        const isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            showDraw();
        }
    });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);