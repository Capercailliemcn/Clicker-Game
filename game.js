// Game Variables
let clickCounter = 0;
let clickMultiplier = 1;
let tabTitleCost = 10;
let tabTitleBought = false;
let autoClickerCost = 50;
let autoClickerBought = false;
let autoClickerInterval = null;
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
const items = [
    { name: "Click Booster", cost: 20, effect: () => (clickMultiplier += 1) },
    { name: "Double Clicks", cost: 40, effect: () => (clickMultiplier *= 2) },
    { name: "Super Clicker", cost: 100, effect: () => (clickMultiplier += 5) },
    { name: "Auto Click Speed", cost: 150, effect: () => increaseAutoClickSpeed(500) },
    { name: "Golden Clicks", cost: 200, effect: () => (clickMultiplier += 10) },
    { name: "Click Storm", cost: 300, effect: () => stormClicks(10) },
    { name: "Half Upgrade Costs", cost: 400, effect: halveUpgradeCosts },
    { name: "Background Theme", cost: 50, effect: () => changeBackgroundTheme() },
    { name: "Confetti Clicks", cost: 600, effect: () => console.log("Confetti!") },
    { name: "Lucky Charm", cost: 500, effect: () => (clickMultiplier += 3) },
    ...Array.from({ length: 40 }, (_, i) => ({
        name: `Mystic Item ${i + 11}`,
        cost: (i + 11) * 100,
        effect: () => console.log(`Mystic Item ${i + 11} effect activated!`),
    })),
];

// Event Listeners
clickButton.addEventListener("click", handleClick);
buyTabTitleButton.addEventListener("click", handleTabTitleUpgrade);
buyAutoClickerButton.addEventListener("click", handleAutoClickerUpgrade);
shopButton.addEventListener("click", openShopModal);
closeModal.addEventListener("click", closeShopModal);

// Functions
function handleClick() {
    clickCounter += clickMultiplier;
    updateUI();
}

function handleTabTitleUpgrade() {
    if (clickCounter >= tabTitleCost && !tabTitleBought) {
        clickCounter -= tabTitleCost;
        tabTitleBought = true;
        updateUI();

        // Change tab name to "Well Done!" for 10 seconds
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
        startAutoClicker();
    }
}

function startAutoClicker() {
    if (autoClickerInterval) return;
    autoClickerInterval = setInterval(() => {
        clickCounter += clickMultiplier;
        updateUI();
    }, 1000);
}

function increaseAutoClickSpeed(newSpeed) {
    if (!autoClickerBought) return;
    clearInterval(autoClickerInterval);
    autoClickerInterval = setInterval(() => {
        clickCounter += clickMultiplier;
        updateUI();
    }, newSpeed);
}

function openShopModal() {
    shopModal.style.display = "block";
    populateShopItems();
}

function closeShopModal() {
    shopModal.style.display = "none";
}

function populateShopItems() {
    shopItemsContainer.innerHTML = "";
    items.forEach((item, index) => {
        const itemButton = document.createElement("button");
        itemButton.textContent = `${item.name} - ${item.cost} Clicks`;
        itemButton.className = "shop-item";
        itemButton.disabled = clickCounter < item.cost;
        itemButton.onclick = () => unlockItem(item, index);
        shopItemsContainer.appendChild(itemButton);
    });
}

function unlockItem(item, index) {
    if (clickCounter >= item.cost) {
        clickCounter -= item.cost;
        item.effect();
        items.splice(index, 1); // Remove item from shop
        updateUI();
        alert(`${item.name} unlocked!`);
    }
}

function halveUpgradeCosts() {
    tabTitleCost = Math.ceil(tabTitleCost / 2);
    autoClickerCost = Math.ceil(autoClickerCost / 2);
}

function changeBackgroundTheme() {
    document.body.style.background = "linear-gradient(135deg, #89ff7e, #00b4ff)";
}

function stormClicks(amount) {
    clickCounter += amount * clickMultiplier;
    updateUI();
}

function updateUI() {
    clickCounterElement.textContent = clickCounter;
    updateProgressBar();
    buyTabTitleButton.disabled = clickCounter < tabTitleCost || tabTitleBought;
    buyAutoClickerButton.disabled = clickCounter < autoClickerCost || autoClickerBought;
    populateShopItems();
}

function updateProgressBar() {
    const progress = Math.min((clickCounter / maxClicks) * 100, 100);
    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${Math.round(progress)}%`;
}

