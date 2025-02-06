export class TicTacToe {
    constructor(size = 4) {
        this.size = size;
        this.boardState = new Array(size * size).fill(null);
        this.status = document.getElementById('status');
        this.currentPlayer = 'player1';
        this.currentMode = 'human';
        this.gameOver = false;
        this.playerIcons = {
            player1: "🎀",
            player2: "💀",
        };
    }
    setPlayerIcons(player1Icon, player2Icon) {
        this.playerIcons.player1 = player1Icon;
        this.playerIcons.player2 = player2Icon;
    }

    checkWin() {
        const { size, boardState } = this;

        // Check rows
        for (let i = 0; i < size * size; i += size) {
            if (boardState[i] &&
                boardState[i] === boardState[i + 1] &&
                boardState[i] === boardState[i + 2] &&
                boardState[i] === boardState[i + 3]) {
                return [i, i + 1, i + 2, i + 3];
            }
        }

        // Check columns
        for (let i = 0; i < size; i++) {
            if (boardState[i] &&
                boardState[i] === boardState[i + size] &&
                boardState[i] === boardState[i + size * 2] &&
                boardState[i] === boardState[i + size * 3]) {
                return [i, i + size, i + size * 2, i + size * 3];
            }
        }

        // Check diagonals
        if (boardState[0] &&
            boardState[0] === boardState[5] &&
            boardState[0] === boardState[10] &&
            boardState[0] === boardState[15]) {
            return [0, 5, 10, 15];
        }
        if (boardState[3] &&
            boardState[3] === boardState[6] &&
            boardState[3] === boardState[9] &&
            boardState[3] === boardState[12]) {
            return [3, 6, 9, 12];
        }

        return null;
    }

    checkDraw() {
        if (this.boardState.every(cell => cell !== null)) {
            this.gameOver = true;
            this.status.textContent = "Draw!";
            return;
        }
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'player1' ? 'player2' : 'player1';
    }

    changeMode(mode) {
        this.currentMode = mode;
    }

}
