let playerMoney = 10000; 
// Flytta till servern: Spelarens pengar bör hanteras säkert på servern för att förhindra att de manipuleras på klientsidan.

document.getElementById("spinButton").addEventListener("click", playGame);

function updatePlayerMoney() {
    document.getElementById("playerMoney").textContent = `Money: ${playerMoney.toFixed(2)} points`;
}

updatePlayerMoney();

function playGame() {
    const spinButton = document.getElementById("spinButton");
    spinButton.disabled = true;

    let betAmount = parseFloat(document.getElementById("betAmount").value);

    if (!betAmount || betAmount <= 0) {
        document.getElementById("message").textContent = "Please enter a valid bet amount!";
        spinButton.disabled = false;
        spinButton.textContent = "Spin";
        return;
    }

    if (betAmount > playerMoney) {
        document.getElementById("message").textContent = "You don't have enough money to bet that amount!";
        spinButton.disabled = false;
        spinButton.textContent = "Spin";
        return;
    }

    playerMoney -= betAmount; 
    // Flytta till servern: Avdrag för satsningar och uppdatering av saldo bör hanteras på servern för att säkerställa rättvisa.

    let slot1 = Math.floor(Math.random() * 9) + 1;
    let slot2 = Math.floor(Math.random() * 9) + 1;
    let slot3 = Math.floor(Math.random() * 9) + 1;
    // Flytta till servern: Slumptalsgenerering bör ske på servern för att säkerställa att resultatet inte kan manipuleras av klienten.

    document.getElementById("slot1").textContent = "0";
    document.getElementById("slot2").textContent = "0";
    document.getElementById("slot3").textContent = "0";
    document.getElementById("message").textContent = "";

    setTimeout(() => {
        document.getElementById("slot1").textContent = slot1;
    }, 500);

    setTimeout(() => {
        document.getElementById("slot2").textContent = slot2;
    }, 1000);

    setTimeout(() => {
        document.getElementById("slot3").textContent = slot3;

        setTimeout(() => {
            let message = "";
            let winAmount = 0;
            let netResult = 0;

            if (slot1 === 7 || slot2 === 7 || slot3 === 7) {
                winAmount = betAmount * 0.5;
                playerMoney += winAmount;
                // Flytta till servern: Spellogik och beräkning av vinster bör hanteras på servern för att säkerställa rättvisa.
                netResult = winAmount - betAmount;
                message = `Unlucky 7.. Your points are halved ${netResult.toFixed(2)} points`;
            } else if (slot1 === slot2 && slot2 === slot3) {
                winAmount = betAmount * 10;
                playerMoney += winAmount;
                // Flytta till servern: Samma anledning som ovan.
                netResult = winAmount - betAmount;
                message = `JACKPOT! You win ${netResult.toFixed(2)} points!`;
            } else if (slot1 === slot2 || slot1 === slot3 || slot2 === slot3) {
                winAmount = betAmount * 1.5;
                playerMoney += winAmount;
                // Flytta till servern: Samma anledning som ovan.
                netResult = winAmount - betAmount;
                message = `Almost! You get ${netResult.toFixed(2)} points`;
            } else {
                netResult = 0;
                playerMoney += netResult;
                // Flytta till servern: Samma anledning som ovan.
                message = `You lost.. Maybe the next spin! ${netResult.toFixed(2)} points`;
            }

            document.getElementById("message").textContent = message;
            updatePlayerMoney();

            spinButton.disabled = false;
            spinButton.textContent = "Spin";
        }, 500);

    }, 1500);
}
