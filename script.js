let player = 'X';
document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    createBoard(board);
    board.addEventListener("click", handleCellClick);
});

function createBoard(board) {
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        board.appendChild(cell);
    }
};
function handleCellClick(event) {
    const cell = event.target;
    console.log(cell.dataset.index);
    if (cell.textContent !== '') return;
    cell.textContent = player;
    player = (player === 'X') ? 'O' : 'X';
}