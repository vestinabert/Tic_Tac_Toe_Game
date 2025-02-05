export class TicTacToe {
    constructor(size = 4) {
        this.size = size;
        this.boardState = Array(size * size).fill(null);
        this.currentPlayer = 'X';
    }

    makeMove(index) {
        if (this.boardState[index] !== null) return false;
        this.boardState[index] = this.currentPlayer;
        return true;
    }

    checkWin() {
        const { size, boardState } = this;

        // Check rows
        for (let i = 0; i < size * size; i += size) {
            if (boardState[i] &&
                boardState[i] === boardState[i + 1] &&
                boardState[i] === boardState[i + 2] &&
                boardState[i] === boardState[i + 3]) {
                return boardState[i];
            }
        }

        // Check columns
        for (let i = 0; i < size; i++) {
            if (boardState[i] &&
                boardState[i] === boardState[i + size] &&
                boardState[i] === boardState[i + size * 2] &&
                boardState[i] === boardState[i + size * 3]) {
                return boardState[i];
            }
        }

        // Check diagonals
        if (boardState[0] &&
            boardState[0] === boardState[5] &&
            boardState[0] === boardState[10] &&
            boardState[0] === boardState[15]) {
            return boardState[0];
        }
        if (boardState[3] &&
            boardState[3] === boardState[6] &&
            boardState[3] === boardState[9] &&
            boardState[3] === boardState[12]) {
            return boardState[3];
        }

        return null;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
}
