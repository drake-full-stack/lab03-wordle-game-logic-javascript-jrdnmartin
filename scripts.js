// ===== GAME STATE VARIABLES =====
const TARGET_WORD = "WORDS";  // Our secret word for testing
let currentRow = 0;           // Which row we're filling (0-5)
let currentTile = 0;          // Which tile in the row (0-4)
let gameOver = false;         // Is the game finished?

// DOM element references (set up on page load)
let gameBoard, rows, debugOutput;

// ===== HELPER FUNCTIONS (PROVIDED) =====

// Debug/Testing Functions
function logDebug(message, type = 'info') {
    // Log to browser console
    console.log(message);
    
    // Also log to visual testing area
    if (!debugOutput) {
        debugOutput = document.getElementById('debug-output');
    }
    
    if (debugOutput) {
        const entry = document.createElement('div');
        entry.className = `debug-entry ${type}`;
        entry.innerHTML = `
            <span style="color: #666; font-size: 12px;">${new Date().toLocaleTimeString()}</span> - 
            ${message}
        `;
        
        // Add to top of debug output
        debugOutput.insertBefore(entry, debugOutput.firstChild);
        
        // Keep only last 20 entries for performance
        const entries = debugOutput.querySelectorAll('.debug-entry');
        if (entries.length > 20) {
            entries[entries.length - 1].remove();
        }
    }
}

function clearDebug() {
    const debugOutput = document.getElementById('debug-output');
    if (debugOutput) {
        debugOutput.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">Debug output cleared - ready for new messages...</p>';
    }
}

// Helper function to get current word being typed
function getCurrentWord() {
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    let word = '';
    tiles.forEach(tile => word += tile.textContent);
    return word;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    gameBoard = document.querySelector('.game-board');
    rows = document.querySelectorAll('.row');
    debugOutput = document.getElementById('debug-output');
    
    logDebug("🎮 Game initialized successfully!", 'success');
    logDebug(`🎯 Target word: ${TARGET_WORD}`, 'info');
    logDebug("💡 Try typing letters, pressing Backspace, or Enter", 'info');
});

// ===== YOUR CHALLENGE: IMPLEMENT THESE FUNCTIONS =====

// TODO: Add keyboard event listener
document.addEventListener("keydown", (event) => {
    // Your code here!
    if (gameOver) {
        logDebug("Game is over. Please refresh to play again.", 'warning');
        return;  // Stop processing if game is over
    }

    // Handle other key events (e.g., letter input, backspace, enter)
    console.log(event.key);

    if (event.key === "Enter") {
        submitGuess();
    }
    else if (event.key === "Backspace") {
        deleteLetter();
    }
    else if (/^[a-zA-Z]$/.test(event.key)) {
        addLetter(event.key.toUpperCase());
    }
    else {
        logDebug(`Ignored key: ${event.key}`, 'info');
    }
});

// TODO: Implement addLetter function
function addLetter(letter) {
    // Your code here!
    logDebug(`🎯 addLetter("${letter}") called`, 'info');

    if (currentTile < 5) {
        const currentRowElement = rows[currentRow];
        const tiles = currentRowElement.querySelectorAll('.tile');
        tiles[currentTile].textContent = letter;
        currentTile++;
    }
    else {
        logDebug("Row is full. Press Enter to submit your guess.", 'warning');
    }

    logDebug(`Letter "${letter}" added to position ${currentTile - 1}`, 'success');
    logDebug(`Current word: ${getCurrentWord()}`, 'info');
}

// TODO: Implement deleteLetter function  
// function deleteLetter() {
//     // Your code here!
// }

// TODO: Implement submitGuess function
// function submitGuess() {
//     // Your code here!
// }

// TODO: Implement checkGuess function (the hardest part!)
// function checkGuess(guess, tiles) {
//     // Your code here!
//     // Remember: handle duplicate letters correctly
//     // Return the result array
// }