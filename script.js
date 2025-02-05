document.addEventListener('DOMContentLoaded', function() {
    createBoard();
});

function createBoard() {
    const board = document.getElementById('board');
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        board.appendChild(cell);
    }
};