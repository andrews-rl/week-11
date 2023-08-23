// Get references to various elements
let nameStatus = document.getElementById("nameStatus"); // Element to display game status
let restartButton = document.getElementById("restartBtn"); // Button to restart the game
let boxes = Array.from(document.getElementsByClassName("box")); // Array of game boxes

// Get the CSS variable value for winner indicator color
let winnerIndicator = getComputedStyle(document.body).getPropertyValue("--winner");

// Constants for player symbols
const X_Player = "X";
const O_Player = "O";

// Initialize the current player as X
let currentPlayer = X_Player;

// Create an array to track the state of each game space
let spaces = Array(9).fill(null);

// Function to start the game by adding click event listeners to boxes
const startGame = () => {
  boxes.forEach(box => box.addEventListener("click", boxClicked));
}

// Function to handle a box click event
function boxClicked(e) {
  const id = e.target.id;

  // Check if the space is empty
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    // Check if the current player has won
    if (playerWon() !== false) {
      nameStatus.innerHTML = `${currentPlayer} is the winner!`
      let winner = playerWon();

      // Apply the winner indicator color to the winning boxes
      winner.map(box => boxes[box].style.backgroundColor = winnerIndicator);
      return;
    }
  }

  // Switch the current player for the next turn
  currentPlayer = currentPlayer === X_Player ? O_Player : X_Player;
}

// Add a click event listener to the restart button
restartButton.addEventListener("click", restart);

// Function to restart the game
function restart() {
  // Clear the spaces array
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });

  // Clear the box contents and background colors
  boxes.forEach(box => {
    box.innerText = "";
    box.style.backgroundColor = ''
  });

  // Reset the game status display
  nameStatus.innerHTML = 'Tic Tac Toe'

  // Reset the current player to X
  currentPlayer = X_Player;
}

// Array of winning combinations
const winningArrayCombos = [
  [0, 4, 8], // diagonal 1
  [2, 4, 6], // diagonal 2
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8] // right column
];

// Function to check if a player has won
function playerWon() {
  for (const condition of winningArrayCombos) {
    let [a, b, c] = condition;
    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      return [a, b, c]; // Return the winning boxes
    }
  }
  return false; // Return false if no player has won yet
}

// Start the game by adding event listeners to the boxes
startGame();
