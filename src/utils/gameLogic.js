
const SIZE = 4;

export const generateEmptyBoard = () => {
    return Array(SIZE * SIZE).fill(null);
};

export const getIndex = (r, c) => r * SIZE + c;
export const getCoordinate = (index) => ({ r: Math.floor(index / SIZE), c: index % SIZE });

export const addRandomTile = (board) => {
    const emptyIndices = board.map((cell, index) => cell === null ? index : null).filter(i => i !== null);
    if (emptyIndices.length === 0) return board;

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newValue = Math.random() < 0.9 ? 2 : 4;

    const newBoard = [...board];
    newBoard[randomIndex] = {
        id: Date.now().toString() + Math.random().toString(),
        value: newValue,
        isNew: true,
    };
    return newBoard;
};

// Rotate board clockwise 90 degrees to reuse logic
const rotateRight = (board) => {
    const newBoard = Array(SIZE * SIZE).fill(null);
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            const index = getIndex(r, c);
            const newR = c;
            const newC = SIZE - 1 - r;
            newBoard[getIndex(newR, newC)] = board[index];
        }
    }
    return newBoard;
};

const rotateLeft = (board) => {
    const newBoard = Array(SIZE * SIZE).fill(null);
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            const index = getIndex(r, c);
            const newR = SIZE - 1 - c;
            const newC = r;
            newBoard[getIndex(newR, newC)] = board[index];
        }
    }
    return newBoard;
};

const shiftLeft = (board) => {
    const newBoard = Array(SIZE * SIZE).fill(null);
    let score = 0;

    for (let r = 0; r < SIZE; r++) {
        let row = [];
        for (let c = 0; c < SIZE; c++) {
            const cell = board[getIndex(r, c)];
            if (cell) row.push({ ...cell, merged: false, isNew: false });
        }

        for (let i = 0; i < row.length - 1; i++) {
            if (row[i].value === row[i + 1].value) {
                row[i].value *= 2;
                row[i].merged = true;
                score += row[i].value;
                row.splice(i + 1, 1);
            }
        }

        while (row.length < SIZE) {
            row.push(null);
        }

        for (let c = 0; c < SIZE; c++) {
            const newIndex = getIndex(r, c);
            newBoard[newIndex] = row[c];
        }
    }

    return { board: newBoard, score };
};

export const move = (board, direction) => {
    let workingBoard = [...board];
    let score = 0;

    if (direction === 'right') workingBoard = rotateRight(rotateRight(workingBoard));
    if (direction === 'up') workingBoard = rotateLeft(workingBoard);
    if (direction === 'down') workingBoard = rotateRight(workingBoard);

    const result = shiftLeft(workingBoard);
    score = result.score;
    workingBoard = result.board;

    if (direction === 'right') workingBoard = rotateRight(rotateRight(workingBoard));
    if (direction === 'up') workingBoard = rotateRight(workingBoard);
    if (direction === 'down') workingBoard = rotateLeft(workingBoard);

    let isChanged = false;
    for (let i = 0; i < board.length; i++) {
        const v1 = board[i] ? board[i].value : null;
        const v2 = workingBoard[i] ? workingBoard[i].value : null;
        if (v1 !== v2) {
            isChanged = true;
            break;
        }
    }

    return { board: workingBoard, score, moved: isChanged };
};

export const isGameOver = (board) => {
    if (board.includes(null)) return false;

    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            const idx = getIndex(r, c);
            const val = board[idx].value;

            if (c < SIZE - 1) {
                if (board[getIndex(r, c + 1)].value === val) return false;
            }
            if (r < SIZE - 1) {
                if (board[getIndex(r + 1, c)].value === val) return false;
            }
        }
    }
    return true;
};

export const hasWon = (board) => {
    return board.some(cell => cell && cell.value === 2048);
};
