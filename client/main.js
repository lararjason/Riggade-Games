const canvas = document.getElementById("scratch-layer");
const ctx = canvas.getContext("2d");
const backgroundCanvas = document.getElementById("background");
const bgCtx = backgroundCanvas.getContext("2d");
const particleCanvas = document.createElement("canvas"); // Separate canvas for particles
const particleCtx = particleCanvas.getContext("2d");
const resultElement = document.getElementById("result");
const scratchSound = new Audio("assets/sounds/Scratch.mp3"); 
const gameContainer = canvas.parentNode;

const prizes = ["10kr", "50kr", "100kr", "200kr", "500kr", "1000kr", "1500kr"];
let gridNumbers = [];
let particles = [];

particleCanvas.id = "particle-layer"; // Add ID for CSS targeting
gameContainer.appendChild(particleCanvas);

// Particle class for debris
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1; // Random size
        this.speedY = Math.random() * 2 + 1; // Random falling speed
        this.speedX = (Math.random() - 0.5) * 2; // Move slightly sideways
        this.opacity = 1; // Start fully visible
        this.color = "#595757"; // Gray color for debris
    }

    update() {
        this.y += this.speedY; // Move down
        this.x += this.speedX; // Move sideways randomly
        this.opacity -= 0.02; // Gradually fade out
        this.size *= 0.98; // Shrink slowly

        // Remove if too small or fully transparent
        if (this.size < 0.5 || this.opacity <= 0) {
            const index = particles.indexOf(this);
            if (index > -1) {
                particles.splice(index, 1);
            }
        }
    }

    draw(ctx) {
        ctx.globalAlpha = this.opacity; // Apply opacity
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1; // Reset alpha
    }
}

// Function to generate the grid of numbers
function generateGridNumbers() {
    gridNumbers = [];
    const riggedLoseRate = 0.9; // Chance to lose

    if (Math.random() < riggedLoseRate) {
        const shuffledPrizes = [...prizes].sort(() => 0.5 - Math.random());
        const maxOccurrences = 2;
        const counts = prizes.reduce((acc, prize) => {
            acc[prize] = 0;
            return acc;
        }, {});

        for (let i = 0; i < 9; i++) {
            const prize = shuffledPrizes[i % prizes.length];
            if (counts[prize] < maxOccurrences) {
                gridNumbers.push(prize);
                counts[prize]++;
            } else {
                const availablePrize = prizes.find((p) => counts[p] < maxOccurrences);
                gridNumbers.push(availablePrize);
                counts[availablePrize]++;
            }
        }
    } else {
        const winningPrize = prizes[Math.floor(Math.random() * prizes.length)];
        for (let i = 0; i < 3; i++) {
            gridNumbers.push(winningPrize);
        }

        const counts = { [winningPrize]: 3 };
        while (gridNumbers.length < 9) {
            const prize = prizes[Math.floor(Math.random() * prizes.length)];
            if (!counts[prize]) counts[prize] = 0;

            if (prize !== winningPrize || counts[prize] < 2) {
                gridNumbers.push(prize);
                counts[prize]++;
            }
        }
    }

    gridNumbers.sort(() => 0.5 - Math.random());
}

// Function to draw the grid of numbers
function drawGrid() {
    const rows = 3;
    const cols = 3;
    const cellWidth = backgroundCanvas.width / cols;
    const cellHeight = backgroundCanvas.height / rows;

    backgroundCanvas.width = canvas.width;
    backgroundCanvas.height = canvas.height;

    bgCtx.fillStyle = "#b3b3b3";
    bgCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    bgCtx.font = "20px Arial";
    bgCtx.textAlign = "center";
    bgCtx.textBaseline = "middle";

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * cellWidth + cellWidth / 2;
            const y = row * cellHeight + cellHeight / 2;
            const index = row * cols + col;
            bgCtx.fillStyle = "#000000";
            bgCtx.fillText(gridNumbers[index], x, y);
        }
    }
}

// Initialize the scratch layer with an image
function initializeScratchLayer() {
    const scratchImage = new Image();
    scratchImage.src = "assets/images/scratchPart.png"; // Scratchable image

    scratchImage.onload = () => {
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(scratchImage, 0, 0, canvas.width, canvas.height);
    };
}

// Scratch functionality with debris
function scratch(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX || e.touches[0]?.clientX) - rect.left;
    const mouseY = (e.clientY || e.touches[0]?.clientY) - rect.top;

    const checkRadius = 10;
    let shouldScratch = false;

    for (let i = -checkRadius; i <= checkRadius; i++) {
        for (let j = -checkRadius; j <= checkRadius; j++) {
            const x = mouseX + i;
            const y = mouseY + j;

            // Check if within bounds of the canvas
            if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
                const imageData = ctx.getImageData(x, y, 1, 1).data;
                const alpha = imageData[3];

                if (alpha !== 0) {
                    shouldScratch = true;
                    break; // No need to check other pixels if one is unscratched
                }
            }
        }
        if (shouldScratch) break; // Optimization: exit outer loop if already decided to scratch
    }

    if (shouldScratch) {
        //scratchSound.currentTime = 0;
        scratchSound.play()
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 20, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();

        for (let i = 0; i < 5; i++) {
            particles.push(new Particle(mouseX, mouseY));
        }
    }

    checkScratchProgress();
}

// Check how much of the scratch layer has been scratched
function checkScratchProgress() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let scratchedPixels = 0;

    for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) scratchedPixels++;
    }

    const scratchedArea = (scratchedPixels / (canvas.width * canvas.height)) * 100;

    if (scratchedArea > 90) {
        canvas.removeEventListener("mousemove", scratch);
        canvas.removeEventListener("touchmove", scratch);
        revealResult();
    }
}

// Reveal the result
function revealResult() {
    const counts = {};
    gridNumbers.forEach((num) => {
        counts[num] = (counts[num] || 0) + 1;
    });

    const winningPrize = Object.keys(counts).find((key) => counts[key] >= 3);
    if (winningPrize) {
        resultElement.textContent = `You win ${winningPrize}!`;
    } else {
        resultElement.textContent = "No win this time.";
    }
}

// Animate debris particles (on separate canvas)
function animateDebris() {
    particleCanvas.width = canvas.width; // Resize the particle canvas if the main canvas is resized
    particleCanvas.height = canvas.height;

    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw(particleCtx);
    });

    requestAnimationFrame(animateDebris);
}

// Event listeners
canvas.addEventListener("mousemove", (e) => {
    if (e.buttons !== 1) return;
    scratch(e);
});

canvas.addEventListener("touchmove", (e) => {
    scratch(e);
});

canvas.addEventListener("mousedown", () => {
    scratchSound.play().catch(() => {}); // Play and handle potential errors
    scratchSound.pause(); // Immediately pause
}, { once: true });

canvas.addEventListener("touchstart", () => {
    scratchSound.play().catch(() => {}); // Play and handle potential errors
    scratchSound.pause(); // Immediately pause
}, { once: true });

// Initialize game
canvas.width = 257;
canvas.height = 182;
backgroundCanvas.width = 257;
backgroundCanvas.height = 182;
scratchSound.volume = 0.5;

generateGridNumbers();
drawGrid();
initializeScratchLayer();
animateDebris();
