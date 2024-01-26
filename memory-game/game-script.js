// Get the container for the game
const gameContainer = document.getElementById("game");

// Initialize variables
let firstCard = null;
let secondCard = null;
let totalCardsFlipped = 0;
let canClick = true;

// Array of colors for the cards
const COLORS = [
    "red", "blue", "green", "orange", "purple",
    "red", "blue", "green", "orange", "purple"
];

// Function to shuffle the colors
function shuffleColors(colorList) {
    let numberOfColors = colorList.length;

    while (numberOfColors > 0) {
        // Pick a random position
        let randomPosition = Math.floor(Math.random() * numberOfColors);

        // Decrease the number of colors by 1
        numberOfColors--;

        // Swap the color with the random position
        let temporary = colorList[numberOfColors];
        colorList[numberOfColors] = colorList[randomPosition];
        colorList[randomPosition] = temporary;
    }

    return colorList;
}

let mixedColors = shuffleColors(COLORS);

// Function to create divs for each color
function makeDivsForColors(colorList) {
    for (let color of colorList) {
        // Create a new div for each color
        const newDiv = document.createElement("div");
        newDiv.classList.add(color);
        newDiv.addEventListener("click", onCardClick);
        gameContainer.appendChild(newDiv);
    }
}

// Function to handle card clicks
function onCardClick(event) {
    if (!canClick) return;
    if (event.target.classList.contains("flipped")) return;

    let clickedCard = event.target;
    clickedCard.style.backgroundColor = clickedCard.classList[0];

    if (!firstCard || !secondCard) {
        clickedCard.classList.add("flipped");
        firstCard = firstCard || clickedCard;
        secondCard = clickedCard === firstCard ? null : clickedCard;
    }

    if (firstCard && secondCard) {
        canClick = false;

        let colorOfFirstCard = firstCard.className;
        let colorOfSecondCard = secondCard.className;

        if (colorOfFirstCard === colorOfSecondCard) {
            totalCardsFlipped += 2;
            firstCard.removeEventListener("click", onCardClick);
            secondCard.removeEventListener("click", onCardClick);
            resetCards();
        } else {
            setTimeout(function () {
                hideCards();
                resetCards();
            }, 1000);
        }
    }

    if (totalCardsFlipped === COLORS.length) alert("Game over!");
}

// Function to reset card variables
function resetCards() {
    firstCard = null;
    secondCard = null;
    canClick = true;
}

// Function to hide unmatched cards
function hideCards() {
    firstCard.style.backgroundColor = "";
    secondCard.style.backgroundColor = "";
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
}

// Start the game
makeDivsForColors(mixedColors);
