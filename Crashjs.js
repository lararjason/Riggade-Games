document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    const graphContainer = document.querySelector('.graph-container');
    canvas.width = graphContainer.clientWidth;
    canvas.height = graphContainer.clientHeight;

    let multiplier = 1.0;
    let crashPoint = generateCrashPoint();
    let isCrashed = false;
    let interval = null;
    let entranceAmount = 0;
    let cashOutAmount = 0;
    let balance = 100.0;
    let autoCashOutMultiplier = null;
    let autoCashOutTriggered = false;
    let time = 0;
    const dataPoints = [];

    function generateCrashPoint() {
        const e = Math.pow(2, 32);
        const h = Math.random() * e;
        return Math.floor((100 * e - h) / (e - h)) / 100;
    }

    function startGame() {
        if (balance <= 0) {
            showNotification("Insufficient balance to start the game!");
            return;
        }

        entranceAmount = 10.0;
        balance -= entranceAmount;
        updateDisplay();

        multiplier = 1.0;
        crashPoint = generateCrashPoint();
        isCrashed = false;
        autoCashOutTriggered = false;
        time = 0;
        dataPoints.length = 0;

        document.getElementById('multiplierDisplay').textContent = '1.00x';
        document.getElementById('startButton').disabled = true;
        document.getElementById('cashOutButton').disabled = false;
        document.getElementById('autoCashOutButton').disabled = false;

        interval = setInterval(updateGame, 100);
    }

    function updateGame() {
        if (multiplier >= crashPoint) {
            endGame();
        } else {
            time += 0.1;
            multiplier += 0.01;
            dataPoints.push({ x: time, y: multiplier });

            document.getElementById('multiplierDisplay').textContent = `${multiplier.toFixed(2)}x`;
            drawGraph();

            if (autoCashOutMultiplier !== null && multiplier >= autoCashOutMultiplier && !autoCashOutTriggered) {
                autoCashOutTriggered = true;
                cashOut();
            }
        }
    }

    function drawGraph() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(40, canvas.height - 40);
        dataPoints.forEach(point => {
            const x = 40 + (point.x / 20) * (canvas.width - 80);
            const y = canvas.height - 40 - (point.y / 10) * (canvas.height - 80);
            ctx.lineTo(x, y);
        });
        ctx.lineTo(canvas.width - 40, canvas.height - 40);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 123, 255, 0.2)';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(40, canvas.height - 40);
        dataPoints.forEach(point => {
            const x = 40 + (point.x / 20) * (canvas.width - 80);
            const y = canvas.height - 40 - (point.y / 10) * (canvas.height - 80);
            ctx.lineTo(x, y);
        });
        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (dataPoints.length > 0) {
            const lastPoint = dataPoints[dataPoints.length - 1];
            const x = 40 + (lastPoint.x / 20) * (canvas.width - 80);
            const y = canvas.height - 40 - (lastPoint.y / 10) * (canvas.height - 80);
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#007bff';
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.fill();
            ctx.stroke();
        }

        drawAxes();
    }

    function drawAxes() {
        ctx.beginPath();
        ctx.moveTo(40, canvas.height - 40);
        ctx.lineTo(canvas.width - 40, canvas.height - 40);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(40, 40);
        ctx.lineTo(40, canvas.height - 40);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.stroke();

        const xLabels = [0, 5, 10, 15, 20];
        xLabels.forEach(label => {
            const x = 40 + (label / 20) * (canvas.width - 80);
            ctx.fillStyle = '#333';
            ctx.fillText(`${label}s`, x, canvas.height - 20);
        });

        const yLabels = [0, 2, 4, 6, 8, 10];
        yLabels.forEach(label => {
            const y = canvas.height - 40 - (label / 10) * (canvas.height - 80);
            ctx.fillStyle = '#333';
            ctx.fillText(`${label}x`, 20, y);
        });
    }

    function cashOut() {
        if (!isCrashed) {
            cashOutAmount = entranceAmount * multiplier;
            balance += cashOutAmount;
            updateDisplay();
            showNotification(`You cashed out at ${multiplier.toFixed(2)}x and won $${cashOutAmount.toFixed(2)}!`);
            document.getElementById('cashOutButton').disabled = true;
            document.getElementById('autoCashOutButton').disabled = true;
        } else {
            showNotification("The game has already crashed!");
        }
    }

    function updateSpeed() {
        if (this.multiplier >= 5) {
            this.speed = 4;
        } else if (this.multiplier >= 3) {
            this.speed = 10;
        } else if (this.multiplier >= 2) {
            this.speed = 5;
        } else if (this.multiplier >= 1) {
            this.speed = 100;
        }
    }
    function endGame() {
        isCrashed = true;
        clearInterval(interval);
        cashOutAmount = 0;
        updateSpeed();
        updateDisplay();
        showNotification(`Game Crashed at ${crashPoint.toFixed(2)}x! You lost $${entranceAmount.toFixed(2)}.`);
        document.getElementById('startButton').disabled = false;
        document.getElementById('cashOutButton').disabled = true;
        document.getElementById('autoCashOutButton').disabled = true;
    }

    function updateDisplay() {
        document.getElementById('entranceAmount').textContent = entranceAmount.toFixed(2);
        document.getElementById('cashOutAmount').textContent = cashOutAmount.toFixed(2);
        document.getElementById('balance').textContent = balance.toFixed(2);

        const autoCashOutStatus = document.getElementById('autoCashOutStatus');
        if (autoCashOutMultiplier !== null) {
            autoCashOutStatus.textContent = `Auto Cash Out: ${autoCashOutMultiplier.toFixed(2)}x`;
            if (autoCashOutTriggered) {
                autoCashOutStatus.textContent += " (Triggered)";
            }
        } else {
            autoCashOutStatus.textContent = "Auto Cash Out: Not Set";
        }
    }

    function setAutoCashOut() {
        const multiplierInput = parseFloat(prompt("Enter the multiplier for auto cash out (e.g., 2.00):"));
        if (!isNaN(multiplierInput) && multiplierInput > 1.0) {
            autoCashOutMultiplier = multiplierInput;
            autoCashOutTriggered = false;
            updateDisplay();
            showNotification(`Auto Cash Out set at ${multiplierInput.toFixed(2)}x!`);
        } else {
            showNotification("Invalid multiplier. Please enter a number greater than 1.00.");
        }
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.getElementById('notificationContainer').appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('cashOutButton').addEventListener('click', cashOut);
    document.getElementById('autoCashOutButton').addEventListener('click', setAutoCashOut);
});