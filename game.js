// Variables
let clickCounter = 0;
let clickMultiplier = 1;
let level = 1;
let levelUpThreshold = 100;
let autoClickerBought = false;
let codeManagerActive = false;

// DOM Elements
const clickButton = document.getElementById("clickButton");
const clickCounterElement = document.getElementById("clickCounter");
const progressBar = document.getElementById("progressBar");
const toggleMusicButton = document.getElementById("toggleMusic");
const lofiMusic = document.getElementById("lofiMusic");
const redeemCodeInput = document.getElementById("redeemCodeInput");
const redeemCodeButton = document.getElementById("redeemCodeButton");
const redeemMessage = document.getElementById("redeemMessage");
const confettiContainer = document.getElementById("confettiContainer");
const levelCounter = document.getElementById("levelCounter");

// Click Handler
clickButton.addEventListener("click", () => {
    clickCounter++;
    updateUI();
    checkLevelUp();
});

// Redeem Code System
const promoCodes = {
    "bonus50": { reward: 50, expires: new Date("2025-12-31") },
};

redeemCodeButton.addEventListener("click", () => {
    const code = redeemCodeInput.value.trim().toLowerCase();
    const promo = promoCodes[code];
    if (promo && promo.expires > new Date()) {
        clickCounter += promo.reward;
        updateUI();
        redeemMessage.textContent = `Code accepted! ${promo.reward} clicks added.`;
    } else {
        redeemMessage.textContent = "Invalid or expired code.";
    }
});

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

// Level Up System
function checkLevelUp() {
    if (clickCounter >= level * levelUpThreshold) {
        level++;
        levelCounter.textContent = level;
        triggerConfetti();
    }
}

function triggerConfetti() {
    confettiContainer.innerHTML = "";
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
        confettiContainer.appendChild(confetti);
    }
    confettiContainer.style.display = "block";
    setTimeout(() => (confettiContainer.style.display = "none"), 5000);
}

function updateUI() {
    clickCounterElement.textContent = clickCounter;
    progressBar.style.width = `${(clickCounter / levelUpThreshold) * 100}%`;
}
