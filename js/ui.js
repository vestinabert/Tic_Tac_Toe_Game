import { TicTacToe } from './game.js';

export class UI {
    constructor(game) {
        this.game = game;
        this.board = document.getElementById('board');
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
            this.game.status.textContent = this.game.currentPlayer === "X" ? "Your turn (X)" : "Random's turn (O)";
        } else {
            this.game.status.textContent = `Player ${this.game.currentPlayer}'s turn`;
        }
    }

    handleCellClick(event) {
        const cell = event.target;
        if (!cell.classList.contains('cell')) return;

        const index = parseInt(cell.dataset.index);
        if (this.game.gameOver || this.game.boardState[index]) return;

        this.game.boardState[index] = this.game.currentPlayer;
        cell.textContent = this.game.currentPlayer;

        const win = this.game.checkWin();
        if (win) {
            this.game.gameOver = true;
            if (this.game.currentMode === "random" && this.game.currentPlayer === "O") {
                this.game.status.textContent = "Random wins!";
            } else {
                this.game.status.textContent = "Player " + this.game.currentPlayer + " wins!";
            }
            return;
        }

        this.game.switchPlayer();
        this.updateStatus();

        if (this.game.currentMode === "random" && this.game.currentPlayer === "O" && !this.game.gameOver) {
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
        this.game.currentPlayer = "X";
        this.game.gameOver = false;
        const cells = this.board.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("winning-cell");
        });
        this.updateStatus();
    }

}
