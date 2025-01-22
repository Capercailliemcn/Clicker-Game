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
const clickEffectsContainer = document.getElementById("clickEffectsContainer");

// 50 Unique Shop Items
const items = [
    { name: "Click Booster", cost: 20, effect: () => (clickMultiplier += 1) },
    { name: "Double Clicks", cost: 40, effect: () => (clickMultiplier *= 2) },
    { name: "Golden Clicks", cost: 100, effect: () => (clickMultiplier += 5) },
    { name: "Auto Click Boost", cost: 150, effect: () => increaseAutoClickSpeed(500) },
    ...Array.from({ length: 46 }, (_, i) => ({
        name: `Mystic Item ${i + 5}`,
        cost: (i + 5) * 50,
        effect: () => console.log(`Mystic Item ${i + 5} effect activated!`),
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
    showClickEffect(clickMultiplier);
    updateUI();
}

function handleTabTitleUpgrade() {
    if (clickCounter >= tabTitleCost && !tabTitleBought) {
        clickCounter -= tabTitleCost;
        tabTitleBought = true;
        updateUI();
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
        startAutoClicker();
        updateUI();
    }
}

function showClickEffect(clicks) {
    const effect = document.createElement("span");
    effect.className = "click-effect";
    effect.textContent = `+${clicks}`;
    const randomX = Math.random() * 40 - 20;
    effect.style.left = `${50 + randomX}%`;
    clickEffectsContainer.appendChild(effect);
    setTimeout(() => effect.remove(), 1000);
}

function startAutoClicker() {
    autoClickerInterval = setInterval(() => {
        clickCounter += clickMultiplier;
        updateUI();
    }, 1000);
}

function increaseAutoClickSpeed(newSpeed) {
    if (autoClickerInterval) clearInterval(autoClickerInterval);
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
        const button = document.createElement("button");
        button.className = "shop-item";
        button.textContent = `${item.name} - ${item.cost} Clicks`;
        button.disabled = clickCounter < item.cost;
        button.onclick = () => unlockItem(item, index);
        shopItemsContainer.appendChild(button);
    });
}

function unlockItem(item, index) {
    if (clickCounter >= item.cost) {
        clickCounter -= item.cost;
        item.effect();
        items.splice(index, 1);
        updateUI();
        alert(`${item.name} unlocked!`);
    }
}

function updateUI() {
    clickCounterElement.textContent = clickCounter;
    buyTabTitleButton.disabled = clickCounter < tabTitleCost || tabTitleBought;
    buyAutoClickerButton.disabled = clickCounter < autoClickerCost || autoClickerBought;
    updateProgressBar();
    populateShopItems();
}

function updateProgressBar() {
    const progress = Math.min((clickCounter / maxClicks) * 100, 100);
    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${Math.round(progress)}%`;
}
