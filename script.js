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
    console.log(cell);
    if (!cell.classList.contains("cell")) return;
    if (cell.textContent !== '') return;
    cell.textContent = player;
    checkWin();
    player = (player === 'X') ? 'O' : 'X';

}
function checkWin() {
    const cells = board.querySelectorAll('.cell');

    //check rows
    for (let i = 0; i < 16; i += 4) {
        if (cells[i].textContent &&
            cells[i].textContent === cells[i + 1].textContent &&
            cells[i].textContent === cells[i + 2].textContent &&
            cells[i].textContent === cells[i + 3].textContent) {
            alert('Win');
            return;
        }
    };
    //check columns
    for (let i = 0; i < 4; i++) {
        if (cells[i].textContent &&
            cells[i].textContent === cells[i + 4].textContent &&
            cells[i].textContent === cells[i + 8].textContent &&
            cells[i].textContent === cells[i + 12].textContent) {
            alert('Win');
            return;
        }
    };
    //check diagonals
    if (cells[0].textContent &&
        cells[0].textContent === cells[5].textContent &&
        cells[0].textContent === cells[10].textContent &&
        cells[0].textContent === cells[15].textContent) {
        alert('Win');
        return;
    }
    if (cells[3].textContent &&
        cells[3].textContent === cells[6].textContent &&
        cells[3].textContent === cells[9].textContent &&
        cells[3].textContent === cells[12].textContent) {
        alert('Win');
        return;
    }
};
