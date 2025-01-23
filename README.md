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
## This is gonna be server side and added into the server. (NOT CLIENT SIDE!!!)

Also the crash point
"    function generateCrashPoint() {
        const e = Math.pow(2, 32);
        const h = Math.random() * e;
        return Math.floor((100 * e - h) / (e - h)) / 100;
    }"
    