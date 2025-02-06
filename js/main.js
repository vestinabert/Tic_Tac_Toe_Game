import { TicTacToe } from './game.js';
import { UI } from './ui.js';

document.addEventListener('DOMContentLoaded', function () {
    const game = new TicTacToe();
    const ui = new UI(game);

    ui.createBoard();
    ui.board.addEventListener('click', (event) => ui.handleCellClick(event));

    document.querySelectorAll('input[name="mode"]').forEach((radio) => {
        radio.addEventListener('change', (event) => {
            game.changeMode(event.target.value);
            ui.restartGame();
        });
    });
    document.getElementById('restart').addEventListener('click', () => {
        ui.restartGame();
    });
});
