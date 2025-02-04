const colorBox = document.getElementById('colorBox');
const optionsContainer = document.getElementById('options');
const gameStatus = document.getElementById('gameStatus');
const scoreDisplay = document.getElementById('score');
const newGameButton = document.getElementById('newGameButton');

let score = 0;
let targetColor;

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function startNewGame() {
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
      gameStatus.textContent ='Spot on! You guessed right.';
        score++; 
    } else {
        gameStatus.textContent = 'Oooops, not quite. Give it another shot!';
    }

    scoreDisplay.textContent = score;
}

newGameButton.addEventListener('click', startNewGame);
startNewGame();
