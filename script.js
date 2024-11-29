document.addEventListener("DOMContentLoaded", function() {
    game = document.querySelector(".game");
    let currentPlayer = 0;
    const wins = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 5, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [3, 5, 7]
    ];

    const notPlayer = document.querySelector(".step");

    let answersX = [];
    let answersO = [];

    const winX = document.querySelector(".winX");
    const loseX = document.querySelector(".loseX");
    const loseO = document.querySelector(".loseO");
    const winO = document.querySelector(".winO");
    const draws = document.querySelector(".draws");

    function createCells() {
        for (let i = 0; i < 9; i++) {
            const item = document.createElement('div')
            item.classList.add('cell');
            item.setAttribute("data-index", `${i + 1}`);
            game.appendChild(item)
        }
    }
    createCells();

    function checkState() {
        const move = document.querySelector(".currentPlayer");
        move.innerHTML = currentPlayer === 1 ? "O" : "X";
        notPlayer.innerHTML = currentPlayer === 1 ? "X" : "O";
    }
    checkState();

    function changePlayer() {
        if (currentPlayer === 0) {
            currentPlayer = 1;
            notPlayer.innerHTML = "X";
        } else if (currentPlayer === 1) {
            currentPlayer = 0;
            notPlayer.innerHTML = "O";
        }
        checkState();
    }
    notPlayer.addEventListener("click", changePlayer);

    function checkWinner() {
        for (let i = 0; i < wins.length; i++) {
            const winCombination = wins[i];
            const xWin = winCombination.every(index => answersX.includes(index.toString()));
            const oWin = winCombination.every(index => answersO.includes(index.toString()));

            if (xWin) {
                winX.textContent = (parseInt(winX.textContent) || 0) + 1;
                loseO.textContent = (parseInt(loseO.textContent) || 0) + 1;
                setTimeout(() => alert('X wins!'), 100);
                game.removeEventListener('click', сellClick);
                return;
            }

            if (oWin) {
                winO.textContent = (parseInt(winO.textContent) || 0) + 1;
                loseX.textContent = (parseInt(loseX.textContent) || 0) + 1;
                setTimeout(() => alert('O wins!'), 100);
                game.removeEventListener('click', сellClick);
                return;
            }
        }

        if (answersX.length + answersO.length === 9) {
            setTimeout(() => alert('It\'s a draw!'), 100);
            draws.textContent = (parseInt(draws.textContent) || 0) + 1;
        }
    }

    function сellClick(event) {
        const cell = event.target;

        if (cell.classList.contains("cell") && !cell.classList.contains("x") && !cell.classList.contains("o")) {
            if (currentPlayer === 0) {
                cell.classList.add("x");
                currentPlayer = 1;
                const cellIndex = cell.getAttribute('data-index');
                answersX.push(cellIndex);
                notPlayer.style.cursor = "default";
                notPlayer.removeEventListener("click", changePlayer);
            } else {
                cell.classList.add("o");
                currentPlayer = 0;
                const cellIndex = cell.getAttribute('data-index');
                answersO.push(cellIndex);
                notPlayer.setAttribute('disabled', 'true');
                notPlayer.style.cursor = "default";
                notPlayer.removeEventListener("click", changePlayer);
            }

            checkState();
            checkWinner();
        }
    }

    game.addEventListener("click", сellClick);

    function reset() {
        const resetBtn = document.querySelector(".reset");

        resetBtn.addEventListener("click", () => {
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.classList.remove("x", "o");
            });
            answersX = [];
            answersO = [];

            currentPlayer = 0;
            notPlayer.style.cursor = "pointer";
            notPlayer.addEventListener("click", changePlayer);
            checkState();

            game.addEventListener("click", сellClick);
        });
    }
    reset();

    function resetStat() {
        const resetStat = document.querySelector(".reset-stat");
        resetStat.addEventListener("click", () => {
            winX.textContent = 0;
            loseO.textContent = 0;
            loseX.textContent = 0;
            winO.textContent = 0;
            draws.textContent = 0;

            winX.innerHTML = '';
            loseO.innerHTML = '';
            loseX.innerHTML = '';
            winO.innerHTML = '';
            draws.innerHTML = '';

        })
    }
    resetStat();
});