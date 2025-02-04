const colorBox = document.getElementById('colorBox');
const optionsContainer = document.getElementById('options');
const gameStatus = document.getElementById('gameStatus');
const scoreDisplay = document.getElementById('score');
const newGameButton = document.getElementById('newGameButton');

let score = 0;
let targetColor;
let successfulTrials = 0; // Counter for successful trials
let wrongAttempts = 0; // Counter for wrong attempts

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function startNewGame() {
    score = 0; // Reset score on new game
    successfulTrials = 0; // Reset successful trials count
    wrongAttempts = 0; // Reset wrong attempts count
    scoreDisplay.textContent = score;
    gameStatus.textContent = '';
    setupGame();
}

function setupGame() {
    gameStatus.textContent = '';
    optionsContainer.innerHTML = '';
    targetColor = generateRandomColor();
    colorBox.style.backgroundColor = targetColor;

    const correctOption = Math.floor(Math.random() * 6);

    for (let i = 0; i < 6; i++) {
        const colorButton = document.createElement('button');
        colorButton.classList.add('colorOption');

        const color = i === correctOption ? targetColor : generateRandomColor();
        colorButton.style.backgroundColor = color;
        colorButton.dataset.color = color;
        colorButton.addEventListener('click', handleColorClick);

        optionsContainer.appendChild(colorButton);
    }
}

function handleColorClick(event) {
    const selectedColor = event.target.dataset.color;

    if (selectedColor === targetColor) {
        score++;
        successfulTrials++;
        scoreDisplay.textContent = score;

        if (successfulTrials >= 5) {
            gameStatus.textContent = 'Game Over! You won after 5 successful trials!';
            return; // Stop the game after 5 successful trials
        }

        setupGame(); // Immediately reset the game after a correct answer
    } else {
        wrongAttempts++;
        if (wrongAttempts === 1) {
            gameStatus.textContent = 'Oooops, not quite. Try again!';
        } else if (wrongAttempts === 2) {
            gameStatus.textContent = 'Still not it! Give it another shot!';
        } else {
            gameStatus.textContent = 'Oops! One more try!';
        }
    }
}

// Event listener for new game button
newGameButton.addEventListener('click', startNewGame);

// Start the first game
startNewGame();
