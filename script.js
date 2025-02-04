const colorBox = document.getElementById('colorBox');
const optionsContainer = document.getElementById('options');
const gameStatus = document.getElementById('gameStatus');
const scoreDisplay = document.getElementById('score');
const newGameButton = document.getElementById('newGameButton');

let score = 0;
let targetColor;
let totalTrials = 0; 
const maxTrials = 10; 
let wrongAttempts = 0; 

const congratulatoryMessages = [
  " Great job! You're amazing at this! 🎉",
  " Correct! You nailed it! ",
  " Awesome work! Keep it up! 🎊",
  " Spot on! You're a color master! ✨"
];

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function startNewGame() {
    score = 0; 
    totalTrials = 0; 
    wrongAttempts = 0; 
    scoreDisplay.textContent = score;
    gameStatus.textContent = '';
    setupGame();
}

function setupGame() {
    if (totalTrials >= maxTrials) {
        gameStatus.textContent = `Game Over! You completed ${totalTrials} trials with a score of ${score}.`;
        optionsContainer.innerHTML = ''; 
        return; 
    }

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

    totalTrials++;
    if (selectedColor === targetColor) {
        score++;
        scoreDisplay.textContent = score;

        const message = congratulatoryMessages[Math.floor(Math.random() * congratulatoryMessages.length)];
        gameStatus.textContent = message;

        setTimeout(setupGame, 1500);
    } else {
        wrongAttempts++;
        if (wrongAttempts === 1) {
            gameStatus.textContent = 'Oooops, not quite. Try again!';
        } else if (wrongAttempts === 2) {
            gameStatus.textContent = 'Still not it! Keep trying!';
        } else {
            gameStatus.textContent = 'Nope, that wasn’t it. One more go!';
        }
    }

    if (totalTrials >= maxTrials) {
        setTimeout(() => {
            gameStatus.textContent = `Game Over! You completed ${maxTrials} trials with a score of ${score}.`;
            optionsContainer.innerHTML = ''; 
        }, 1500); 
    }
}

newGameButton.addEventListener('click', startNewGame);

startNewGame();

