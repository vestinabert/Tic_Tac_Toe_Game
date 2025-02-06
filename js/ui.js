import { TicTacToe } from './game.js';

export class UI {
    constructor() {
        this.game = new TicTacToe();
        this.board = document.getElementById("board");
        this.player1IconSelect = document.getElementById("player1Icon");
        this.player2IconSelect = document.getElementById("player2Icon");
    }

    init() {
        this.createBoard();
        this.addEventListeners();
        this.updateStatus();
    }

    updatePlayerIcons() {
        const player1Icon = this.player1IconSelect.value;
        const player2Icon = this.player2IconSelect.value;
        this.game.setPlayerIcons(player1Icon, player2Icon);
        this.restartGame();
    }

    addEventListeners() {
        this.board.addEventListener("click", (event) => this.handleCellClick(event));

        document.querySelectorAll('input[name="mode"]').forEach((radio) => {
            radio.addEventListener("change", (event) => {
                this.game.changeMode(event.target.value);
                this.restartGame();
            });
        });

        document.getElementById("restart").addEventListener("click", () => {
            this.restartGame();
        });
        this.player1IconSelect.addEventListener("change", () => this.updatePlayerIcons());
        this.player2IconSelect.addEventListener("change", () => this.updatePlayerIcons());
    }

    createBoard() {
        while (this.board.firstChild) {
            this.board.removeChild(this.board.firstChild);
        }

        for (let i = 0; i < this.game.size * this.game.size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            this.board.appendChild(cell);
        }
    }

    updateStatus() {
        if (this.game.gameOver) return;

        if (this.game.currentMode === "random") {
            this.game.status.textContent = this.game.currentPlayer === "player1"
                ? `${this.game.playerIcons[this.game.currentPlayer]} turn`
                : `Random ${this.game.playerIcons[this.game.currentPlayer]} turn`;
        } else {
            this.game.status.textContent = `Player ${this.game.playerIcons[this.game.currentPlayer]}'s turn`;
        }
    }


    highlightWinningCells(win) {
        win.forEach(i => {
            const winningCell = board.querySelector('[data-index="' + i + '"]');
            if (winningCell) winningCell.classList.add("winning-cell");
        });
    }

    handleCellClick(event) {
        const cell = event.target;
        if (!cell.classList.contains('cell')) return;

        const index = parseInt(cell.dataset.index);
        if (this.game.gameOver || this.game.boardState[index]) return;

        this.game.boardState[index] = this.game.currentPlayer;
        cell.textContent = this.game.playerIcons[this.game.currentPlayer];

        const win = this.game.checkWin();
        if (win) {
            this.game.gameOver = true;
            this.highlightWinningCells(win);
            if (this.game.currentMode === "random" && this.game.currentPlayer === "player2") {
                this.game.status.textContent = `Random ${this.game.playerIcons[this.game.currentPlayer]} wins`;
            } else {
                this.game.status.textContent = `${this.game.playerIcons[this.game.currentPlayer]} wins`;
            }
            return;
        }
        this.game.checkDraw();

        this.game.switchPlayer();
        this.updateStatus();

        if (this.game.currentMode === "random" && this.game.currentPlayer === "player2" && !this.game.gameOver) {
            setTimeout(this.getRandomMove.bind(this), 500);
        }
    }

    getRandomMove() {
        if (this.game.gameOver) return;
        const emptyCells = this.game.boardState
            .map((cell, index) => cell === null ? index : null)
            .filter(index => index !== null);
        if (emptyCells.length === 0) return;
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const cell = this.board.querySelector('[data-index="' + randomIndex + '"]');
        if (cell) {
            cell.click();
        }
    }

    restartGame() {
        this.game.boardState = new Array(16).fill(null);
        this.game.currentPlayer = "player1";
        this.game.gameOver = false;
        const cells = this.board.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("winning-cell");
        });
        this.updateStatus();
    }

}
