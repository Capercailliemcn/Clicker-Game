// Game Variables
let clickCounter = 0;
let tabTitleCost = 10;
let tabTitleBought = false;
let autoClickerCost = 50;
let autoClickerBought = false;
let maxClicks = 1000;

// DOM Elements
const clickButton = document.getElementById("clickButton");
const clickCounterElement = document.getElementById("clickCounter");
const buyTabTitleButton = document.getElementById("buyTabTitle");
const buyAutoClickerButton = document.getElementById("buyAutoClicker");
const progressBar = document.getElementById("progressBar");
const progressPercentage = document.getElementById("progressPercentage");
const shopButton = document.getElementById("shopButton");
const shopModal = document.getElementById("shopModal");
const closeModal = document.getElementById("closeModal");
const shopItemsContainer = document.getElementById("shopItems");

// 50 Unique Items for the Shop
const items = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    cost: (index + 1) * 20, // Cost increases with each item
    unlocked: false,
    effect: () => {
        console.log(`Effect of Item ${index + 1} applied!`);
    },
}));

// Event Listeners
clickButton.addEventListener("click", handleClick);
buyTabTitleButton.addEventListener("click", handleTabTitleUpgrade);
buyAutoClickerButton.addEventListener("click", handleAutoClickerUpgrade);
shopButton.addEventListener("click", openShopModal);
closeModal.addEventListener("click", closeShopModal);

// Functions
function handleClick() {
    clickCounter++;
    updateUI();
}

function handleTabTitleUpgrade() {
    if (clickCounter >= tabTitleCost && !tabTitleBought) {
        clickCounter -= tabTitleCost;
        tabTitleBought = true;
        updateUI();

        // Temporary "Well Done!" Tab Title
        document.title = "Well Done!";
        setTimeout(() => {
            const newTitle = prompt("Enter a new tab name:");
            if (newTitle) document.title = newTitle;
        }, 10000);
    }
}

function handleAutoClickerUpgrade() {
    if (clickCounter >= autoClickerCost && !autoClickerBought) {
        clickCounter -= autoClickerCost;
        autoClickerBought = true;
        updateUI();
        activateAutoClicker();
    }
}

function openShopModal() {
    shopModal.style.display = "block";
    populateShopItems();
}

function closeShopModal() {
    shopModal.style.display = "none";
}

// Update UI Elements
function updateUI() {
    clickCounterElement.textContent = clickCounter;
    updateProgressBar();

    // Enable or disable upgrades
    if (clickCounter >= tabTitleCost && !tabTitleBought) {
        buyTabTitleButton.disabled = false;
    }
    if (clickCounter >= autoClickerCost && !autoClickerBought) {
        buyAutoClickerButton.disabled = false;
    }
}

// Progress Bar
function updateProgressBar() {
    const progress = Math.min((clickCounter / maxClicks) * 100, 100);
    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${Math.round(progress)}%`;
}

// Activate Auto Clicker
function activateAutoClicker() {
    setInterval(() => {
        clickCounter++;
        updateUI();
    }, 1000); // Adds 1 click per second
}

// Populate Shop Items
function populateShopItems() {
    shopItemsContainer.innerHTML = ""; // Clear the shop
    items.forEach((item) => {
        const itemButton = document.createElement("button");
        itemButton.textContent = `${item.name} - ${item.cost} Clicks`;
        itemButton.className = "shop-item";
        itemButton.disabled = item.unlocked || clickCounter < item.cost;
        itemButton.onclick = () => unlockItem(item);
        shopItemsContainer.appendChild(itemButton);
    });
}

// Unlock Item
function unlockItem(item) {
    if (clickCounter >= item.cost) {
        clickCounter -= item.cost;
        item.unlocked = true;
        item.effect(); // Apply the item's unique effect
        updateUI();
  
