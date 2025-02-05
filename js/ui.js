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

    handleCellClick(event) {
        const cell = event.target;
        if (!cell.classList.contains('cell')) return;

        const index = parseInt(cell.dataset.index);
        if (!this.game.makeMove(index)) return;

        this.updateUI();

        const winner = this.game.checkWin();
        if (winner) {
            alert(`${winner} Wins!`);
            this.resetGame();
            return;
        }

        this.game.switchPlayer();
    }

    resetGame() {
        this.game = new TicTacToe();
        this.createBoard();
        this.updateUI();
    }
}
