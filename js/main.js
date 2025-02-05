import { TicTacToe } from './game.js';
import { UI } from './ui.js';

document.addEventListener('DOMContentLoaded', function () {
    const game = new TicTacToe();
    const ui = new UI(game);

    ui.createBoard();
    ui.board.addEventListener('click', (event) => ui.handleCellClick(event));
});
