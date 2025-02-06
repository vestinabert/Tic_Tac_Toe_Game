import { TicTacToe } from './game.js';

export class UI {
    constructor(game) {
        this.game = game;
        this.board = document.getElementById('board');
    }

    createBoard() {
        this.board.innerHTML = '';
        for (let i = 0; i < this.game.size * this.game.size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            this.board.appendChild(cell);
        }
    }

    updateUI() {
        const cells = this.board.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = this.game.boardState[index] || '';
        });
    }

    updateStatus() {
        if (this.game.currentMode === "random") {
            if (this.game.currentPlayer === "X") {
                this.game.statusElement.textContent = "Your turn (X)";
            } else {
                this.game.statusElement.textContent = "Random's turn (O)";
            }
        } else {
            this.game.statusElement.textContent = "Player " + this.game.currentPlayer + "'s turn";
        }
    }

    handleCellClick(event) {
        const cell = event.target;
        if (!cell.classList.contains('cell')) return;

        const index = parseInt(cell.dataset.index);
        if (!this.game.makeMove(index)) return;

        this.updateUI();

        const winner = this.game.checkWin();
        if (winner) {
            alert(`${winner} Wins!`);
            return;
        }

        this.game.switchPlayer();
        this.updateStatus();

        if (this.game.currentMode === "random" && this.game.currentPlayer === "O") {
            this.game.getRandomMove();
            this.updateUI();
            this.game.switchPlayer();
            this.updateStatus();
        }

    }

    changeMode(mode) {
        this.resetGame();
        this.game.setMode(mode);
        console.log("Mode changed to: " + this.game.currentMode);
    }

    resetGame() {
        this.game = new TicTacToe();
        this.createBoard();
        this.updateUI();
        this.updateStatus();
    }
}
