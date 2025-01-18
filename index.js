let currentPlayer = null;

// Players
const playerOne = document.getElementById('player-one');
const playerTwo = document.getElementById('player-two');

// Squares
const squares = document.querySelectorAll('.square');

// Result message
const result = document.getElementById('result');

// Set current player
playerOne.addEventListener('click', () => setPlayer(1));
playerTwo.addEventListener('click', () => setPlayer(2));

function setPlayer(player) {
    currentPlayer = player;
}

// Handle square clicks
squares.forEach(square => {
    square.addEventListener('click', () => {

           if (square.classList.contains('square') && currentPlayer){
            square.classList.add(currentPlayer === 1 ? 'red-circle' : 'yellow-circle')
            if (determineWinner()) {
                setTimeout(resetBoard, 3000); 
            }
        }
    });
});



// Function to reset the board
function resetBoard() {
    squares.forEach(square => {
        square.classList.remove('red-circle'); 
        square.classList.remove('yellow-circle'); 
    });
    result.textContent = ''; 
    currentPlayer = null; 
}





function determineWinner() {
    const playerClass = currentPlayer === 1 ? 'red-circle' : 'yellow-circle';
    const directions = [
        { rowDir: 0, colDir: 1 },  // Horizontal
        { rowDir: 1, colDir: 0 },  // Vertical
        { rowDir: 1, colDir: 1 },  // Diagonal (bottom-left to top-right)
        { rowDir: 1, colDir: -1 }  // Diagonal (top-left to bottom-right)
    ];

    for (const square of squares) {
        if (square.classList.contains(playerClass)) {
            const squareId = parseInt(square.id.replace('square', ''), 10);
            const row = Math.floor((squareId - 1) / 7);
            const col = (squareId - 1) % 7;

            for (const { rowDir, colDir } of directions) {
                if (checkDirection(row, col, rowDir, colDir, playerClass)) {
                    result.textContent = `Player ${currentPlayer} Wins!`;
                    return true; // Winner found
                }
            }
        }
    }
    return false; // No winner found
}

function checkDirection(startRow, startCol, rowDir, colDir, playerClass) {
    let count = 0;

    for (let i = -3; i <= 3; i++) { // Check 3 steps backward and forward
        const row = startRow + i * rowDir;
        const col = startCol + i * colDir;

        if (row >= 0 && row < 6 && col >= 0 && col < 7) { // Ensure within grid bounds
            const squareId = row * 7 + col + 1; // Convert back to square ID
            const square = document.getElementById(`square${squareId}`);

            if (square && square.classList.contains(playerClass)) {
                count++;
                if (count === 4) {
                    return true; // Four in a row found
                }
            } else {
                count = 0; // Reset count if streak breaks
            }
        }
    }
    return false; // No four in a row
}









