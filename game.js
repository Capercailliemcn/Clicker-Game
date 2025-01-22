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

// Create 50 Shop Items
const totalItems = 50;
const items = Array.from({ length: totalItems }, (_, index) => ({
    id: index + 1,
    cost: (index + 1) * 10, // Cost increases with each item
    unlocked: false,
    name: `Item ${index + 1}`
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
    if (clickCounter >= tabTitleCost) {
        clickCounter -= tabTitleCost;
        tabTitleBought = true;
        updateUI();
        changeTabTitle();
    }
}

function handleAutoClickerUpgrade() {
    if (clickCounter >= autoClickerCost) {
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
    populateShopItems();
}

// Update Progress Bar
function updateProgressBar() {
    const progress = (clickCounter / maxClicks) * 100;
    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${Math.round(progress)}%`;
}

// Tab Title Upgrade Effect
function changeTabTitle() {
    document.title = "You've unlocked the Tab Title!";
}

// Auto Clicker Effect
function activateAutoClicker() {
    setInterval(() => {
        clickCounter++;
        updateUI();
    }, 1000);
}

// Populate Shop Items
function populateShopItems() {
    shopItemsContainer.innerHTML = "";
    items.forEach(item => {
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
        updateUI();
        alert(`You unlocked ${item.name}!`);
    }
}

