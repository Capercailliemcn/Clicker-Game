// Variables
let clickCounter = 0;
let clickMultiplier = 1;
const shopItems = [
    { name: "Click Booster", cost: 50, effect: () => { clickMultiplier += 1; } },
    { name: "Auto Clicker", cost: 100, effect: () => { startAutoClicker(); } },
];
let autoClickerInterval;

// DOM Elements
const clickButton = document.getElementById("clickButton");
const clickCounterElement = document.getElementById("clickCounter");
const progressBar = document.getElementById("progressBar");
const shopModal = document.getElementById("shopModal");
const shopItemsContainer = document.getElementById("shopItems");
const closeModal = document.getElementById("closeModal");
const toggleMusicButton = document.getElementById("toggleMusic");
const lofiMusic = document.getElementById("lofiMusic");

// Click Handler
clickButton.addEventListener("click", () => {
    clickCounter += clickMultiplier;
    updateUI();
});

// Populate Item Shop
function populateShop() {
    shopItemsContainer.innerHTML = ""; // Clear existing items
    shopItems.forEach((item, index) => {
        const itemCard = document.createElement("div");
        itemCard.className = "shop-item";
        itemCard.innerHTML = `
            <h4>${item.name}</h4>
            <p>Cost: ${item.cost} clicks</p>
            <button id="shop-item-${index}">Buy</button>
        `;
        shopItemsContainer.appendChild(itemCard);

        document.getElementById(`shop-item-${index}`).addEventListener("click", () => {
            if (clickCounter >= item.cost) {
                clickCounter -= item.cost;
                item.effect();
                updateUI();
            } else {
                alert("Not enough clicks!");
            }
        });
    });
}

// Auto Clicker
function startAutoClicker() {
    if (!autoClickerInterval) {
        autoClickerInterval = setInterval(() => {
            clickCounter++;
            updateUI();
        }, 1000);
    }
}

// Open and Close Modals
document.getElementById("shopButton").addEventListener("click", () => {
    populateShop();
    shopModal.style.display = "block";
});
closeModal.addEventListener("click", () => {
    shopModal.style.display = "none";
});

// Update UI
function updateUI() {
    clickCounterElement.textContent = clickCounter;
    progressBar.style.width = `${Math.min((clickCounter / 100) * 100, 100)}%`;
}

// Music Controls
toggleMusicButton.addEventListener("click", () => {
    if (lofiMusic.paused) {
        lofiMusic.play();
        toggleMusicButton.textContent = "Pause Lofi Music";
    } else {
        lofiMusic.pause();
        toggleMusicButton.textContent = "Play Lofi Music";
    }
});

// Initialize Game
updateUI();
