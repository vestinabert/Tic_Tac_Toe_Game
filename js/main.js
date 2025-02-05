import { TicTacToe } from './game.js';
import { UI } from './ui.js';

document.addEventListener('DOMContentLoaded', function () {
    const game = new TicTacToe();
    const ui = new UI(game);

    ui.createBoard();
    ui.board.addEventListener('click', (event) => ui.handleCellClick(event));

    document.querySelectorAll('input[name="mode"]').forEach((radio) => {
        radio.addEventListener('change', (event) => {
            const selectedMode = event.target.value;
            ui.changeMode(selectedMode);
        });
    });
});
