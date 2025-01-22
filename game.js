let clickCounter = 0;
let tabTitleCost = 10;
let tabTitleBought = false;
let autoClickerCost = 50;
let autoClickerBought = false;

const clickButton = document.getElementById("clickButton");
const clickCounterElement = document.getElementById("clickCounter");
const buyTabTitleButton = document.getElementById("buyTabTitle");
const tabTitleCostElement = document.getElementById("tabTitleCost");
const buyAutoClickerButton = document.getElementById("buyAutoClicker");
const progressBar = document.getElementById("progressBar");
const progressPercentage = document.getElementById("progressPercentage");

clickButton.addEventListener("click", () => {
    clickCounter++;
    clickCounterElement.textContent = clickCounter;
    
    // Enable buying the Tab Title upgrade if enough clicks are earned
    if (clickCounter >= tabTitleCost && !tabTitleBought) {
        buyTabTitleButton.disabled = false;
    }

    // Enable buying the Auto Clicker upgrade if enough clicks are earned
    if (clickCounter >= autoClickerCost && !autoClickerBought) {
        buyAutoClickerButton.disabled = false;
    }

    // Update Progress Bar based on clicks
    updateProgressBar();
});

buyTabTitleButton.addEventListener("click", () => {
    if (clickCounter >= tabTitleCost) {
        clickCounter -= tabTitleCost;
        tabTitleBought = true;
        clickCounterElement.textContent = clickCounter;
        buyTabTitleButton.disabled = true;
        changeTabTitle();
    }
});

buyAutoClickerButton.addEventListener("click", () => {
    if (clickCounter >= autoClickerCost) {
        clickCounter -= autoClickerCost;
        clickCounterElement.textContent = clickCounter;
        autoClickerBought = true;
        buyAutoClickerButton.disabled = true;
        activateAutoClicker();
    }
});

function changeTabTitle() {
    document.title = "Congratulations! You've bought the tab title!";
}

function activateAutoClicker() {
    setInterval(() => {
        clickCounter++;
        clickCounterElement.textContent = clickCounter;
        updateProgressBar();
    }, 1000); // Adds 1 click every second
}

function updateProgressBar() {
    const maxClicks = 1000; // Max number of clicks to complete the game
    const percentage = Math.min((clickCounter / maxClicks) * 100, 100); // Calculates the percentage progress
    progressBar.style.width = `${percentage}%`;
    progressPercentage.textContent = `${Math.round(percentage)}%`;

    // Optionally, change the color of the progress bar based on completion percentage
    if (percentage > 80) {
        progressBar.style.backgroundColor = "#4caf50";
    } else if (percentage > 50) {
        progressBar.style.backgroundColor = "#ffeb3b";
    } else {
        progressBar.style.backgroundColor = "#76c7c0";
    }
}
