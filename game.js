// Game Variables
let clickCounter = 0;
let clickMultiplier = 1;
let level = 1;
let levelUpThreshold = 100;
let levelReward = 50;
let autoClickerCost = 50;
let autoClickerBought = false;
let autoClickerInterval = null;
let codeManagerActive = false; // Tracks if Code Management Mode is active

// DOM Elements
const clickButton = document.getElementById("clickButton");
const clickCounterElement = document.getElementById("clickCounter");
const buyTabTitleButton = document.getElementById("buyTabTitle");
const buyAutoClickerButton = document.getElementById("buyAutoClicker");
const progressBar = document.getElementById("progressBar");
const progressPercentage = document.getElementById("progressPercentage");
const shopButton = document.getElementById("shopButton");
const settingsButton = document.getElementById("settingsButton");
const shopModal = document.getElementById("shopModal");
const settingsModal = document.getElementById("settingsModal");
const closeModal = document.getElementById("closeModal");
const closeSettings = document.getElementById("closeSettings");
const toggleMusicButton = document.getElementById("toggleMusic");
const lofiMusic = document.getElementById("lofiMusic");
const redeemCodeInput = document.getElementById("redeemCodeInput");
const redeemCodeButton = document.getElementById("redeemCodeButton");
const redeemMessage = document.getElementById("redeemMessage");
const levelCounterElement = document.getElementById("levelCounter");
const levelRewardMessage = document.getElementById("levelRewardMessage");
const confettiContainer = document.getElementById("confettiContainer");

// Promo Codes Storage
const promoCodes = {
    clickboost: { reward: 50, expires: new Date('2025-02-28') },
};

// Redeem Codes Logic
redeemCodeButton.addEventListener("click", () => {
    const code = redeemCodeInput.value.trim().toLowerCase();
    const now = new Date();

    if (code === "brodie") {
        codeManagerActive = true;
        redeemMessage.textContent = "Code Management Mode activated. Add new codes!";
        redeemMessage.classList.remove("error");
        redeemCodeInput.value = "";
        return;
    }

    if (codeManagerActive) {
        const newCode = prompt("Enter the new promo code:");
        const reward = parseInt(prompt("Enter the reward (number of clicks):"), 10);
        const expiration = prompt("Enter the expiration date (YYYY-MM-DD):");

        if (newCode && reward && expiration && !isNaN(reward)) {
            promoCodes[newCode.toLowerCase()] = {
                reward: reward,
                expires: new Date(expiration),
            };
            redeemMessage.textContent = `New code "${newCode}" added!`;
            redeemMessage.classList.remove("error");
            codeManagerActive = false;
        } else {
            redeemMessage.textContent = "Failed to add code. Please provide valid inputs.";
            redeemMessage.classList.add("error");
        }
        redeemCodeInput.value = "";
        return;
    }

    const promo = promoCodes[code];
    if (promo && promo.expires > now) {
        clickCounter += promo.reward;
        updateUI();
        redeemMessage.textContent = `Code accepted! You earned ${promo.reward} clicks!`;
        redeemMessage.classList.remove("error");
        redeemCodeInput.value = "";
    } else if (promo && promo.expires <= now) {
        redeemMessage.textContent = "This code has expired.";
        redeemMessage.classList.add("error");
    } else {
        redeemMessage.textContent = "Invalid code.";
        redeemMessage.classList.add("error");
    }
});

// Level-Up Logic
function checkLevelUp() {
    if (clickCounter >= level * levelUpThreshold) {
        level++;
        levelCounterElement.textContent = level;
        levelRewardMessage.textContent = `Level ${level} reached! Reward: ${levelReward} clicks!`;

        // Award the player and trigger the confetti effect
        clickCounter += levelReward;
        triggerConfetti();
        updateUI();
    }
}

// Confetti Effect
function triggerConfetti() {
    confettiContainer.innerHTML = ""; // Clear previous confetti
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
        confettiContainer.appendChild(confetti);
    }

    // Hide confetti after 10 seconds
    setTimeout(() => {
        confettiContainer.innerHTML = "";
    }, 10000);
}

// Update UI
function updateUI() {
    clickCounterElement.textContent = clickCounter;
    progressBar.style.width = `${(clickCounter / 1000) * 100}%`;
    progressPercentage.textContent = `${Math.min((clickCounter / 1000) * 100, 100)}%`;

    // Check for level-up
    checkLevelUp();
}

// Game Logic for Auto Clicker and Upgrades
function startAutoClicker() {
    autoClickerInterval = setInterval(() => {
        clickCounter += clickMultiplier;
        updateUI();
    }, 1000);
}

// Toggle Music Controls
toggleMusicButton.addEventListener("click", () => {
    if (lofiMusic.paused) {
        lofiMusic.play();
        toggleMusicButton.textContent = "Pause Lofi Music";
    } else {
        lofiMusic.pause();
        toggleMusicButton.textContent = "Play Lofi Music";
    }
});

// Event Listeners for Shop and Settings
shopButton.addEventListener("click", () => {
    shopModal.style.display = "block";
});
settingsButton.addEventListener("click", () => {
    settingsModal.style.display = "block";
});
closeModal.addEventListener("click", () => {
    shopModal.style.display = "none";
});
closeSettings.addEventListener("click", () => {
    settingsModal.style.display = "none";
});
