document.addEventListener("DOMContentLoaded", function() {
    var game = document.body;

    var bunny = document.createElement("img");
    game.appendChild(bunny);
    bunny.classList = "imgStyle"
    bunny.src = "https://i.ibb.co/1nJzcMf/image.png";
    bunny.style.transform = "rotate(0deg)"


    var inputTimes = 1;
    var inputBet = 0;
    var balance = 200;

    var balanceDiv = document.createElement("div");
    game.appendChild(balanceDiv);
    balanceDiv.classList = "balanceContainer";

    var balanceText = document.createElement("h1");
    balanceDiv.appendChild(balanceText);
    balanceText.innerHTML = balance;
    balanceText.classList = "balanceText";

    var balanceImg = document.createElement("img");
    balanceDiv.appendChild(balanceImg);
    balanceImg.classList = "balanceImg";
    balanceImg.src = "media/kjellbuck.png"

    var settings = document.createElement("div");
    game.appendChild(settings);
    settings.classList = "settingsStyle"

    var inputBetTitle = document.createElement("p");
    settings.appendChild(inputBetTitle);
    inputBetTitle.classList = "";
    inputBetTitle.id = "input-title"
    inputBetTitle.innerHTML = "Dina " + balance + " KjellBucks multipliceras med " + inputTimes;

    var inputTitle = document.createElement("p");
    inputTitle.innerHTML = "Placera Ditt Bett Här";
    inputTitle.classList = "inputTitle";
    settings.appendChild(inputTitle);

    
    var startButton = document.createElement("button");
    settings.appendChild(startButton);
    startButton.id = "start-button";
    startButton.classList = "startButton";
    startButton.innerHTML = "Start Game";
    startButton.style.display = "";
    startButton.style.display = "none";

    var winLose = document.createElement("h1");

    winLose.classList = "winLoseText";
    winLose.style.display = "none";

    game.appendChild(winLose);

    var inputContainer = document.createElement("div");
    settings.appendChild(inputContainer);
    inputContainer.classList = "inputContainer"

    var input1 = document.createElement("button");
    inputContainer.appendChild(input1);
    input1.innerHTML = "1";

    var input10 = document.createElement("button");
    inputContainer.appendChild(input10);
    input10.innerHTML = "10";

    var input100 = document.createElement("button");
    inputContainer.appendChild(input100);
    input100.innerHTML = "100";

    var clearInput = document.createElement("button");
    inputContainer.appendChild(clearInput);
    clearInput.innerHTML = "Ta tillbaka";

    var inputAmount = document.createElement("p")
    inputAmount.innerHTML = inputBet;
    inputContainer.appendChild(inputAmount);

    input1.addEventListener("click", function() {
        if (balance >= 0) {
            inputBet++;
            balanceText.innerHTML = balance-inputBet;
            inputAmount.innerHTML = inputBet;
        }
        if (bulletList.includes("active") ) {
            startButton.style.display = "";
        } else {
            startButton.style.display = "none";
        }
    })

    input10.addEventListener("click", function() {
        if (balance >= 10) {
            inputBet+=10;
            balanceText.innerHTML = balance-inputBet;
            inputAmount.innerHTML = inputBet;
        }
        if (bulletList.includes("active") ) {
            startButton.style.display = "";
        } else {
            startButton.style.display = "none";
        }
    })

    input100.addEventListener("click", function() {
        if (balance >= 100) {
            inputBet+=100;
            balanceText.innerHTML = balance-inputBet;
            inputAmount.innerHTML = inputBet;
        }
        if (bulletList.includes("active") ) {
            startButton.style.display = "";
        } else {
            startButton.style.display = "none";
        }
    })

    clearInput.addEventListener("click", function() {
        inputBet = 0;
        balanceText.innerHTML = balance+inputBet;
        inputAmount.innerHTML = inputBet;
    })


    var flashBang = document.createElement("div");
    game.appendChild(flashBang);
    flashBang.style.width = "100vw";
    flashBang.style.height = "100vh";
    flashBang.style.zIndex = "2";

    var ranNum;

    var list = ["hole0", "hole6", "hole5", "hole4", "hole3", "hole2", "hole1"];

    var bulletList = ["blank", "blank", "blank", "blank", "blank", "blank", "blank"];
    
    var cylinderDiv = document.createElement("div");
    cylinderDiv.classList = "cylinder";
    cylinderDiv.id = "cylinderId";
    game.appendChild(cylinderDiv);

    var barrel = document.createElement("div");
    barrel.classList = "barrel";
    game.appendChild(barrel);

    for (let i = 0; i < 7; i++) {
        var bulletHoleDiv = document.createElement("div");
        bulletHoleDiv.classList = "bulletHole " + "number" + i.toString();

        if (i == 0) {
            bulletHoleDiv.id = "2";
        } else if (i == 1) {
            bulletHoleDiv.id = "3";
        } else if (i == 2) {
            bulletHoleDiv.id = "4";
        } else if (i == 3) {
            bulletHoleDiv.id = "5";
        } else if (i == 4) {
            bulletHoleDiv.id = "6";
        } else if (i == 5) {
            bulletHoleDiv.id = "0";
        } else if (i == 6) {
            bulletHoleDiv.id = "1";
        }

        bulletHoleDiv.style.position = "absolute";
        bulletHoleDiv.style.top = Math.sin(2 * Math.PI / 7 * i + 0.23) * 40 + 45 + "%";
        bulletHoleDiv.style.left = Math.cos(2 * Math.PI / 7 * i + 0.23) * 40 + 45 + "%";

        cylinderDiv.appendChild(bulletHoleDiv);

        

        bulletHoleDiv.addEventListener("click", function() {
            if (this.style.backgroundColor != "orange") {
                this.style.backgroundColor = "orange";
                bulletList[Number(this.id)] = "active";
                inputTimes+=0.5;
                inputBetTitle.innerHTML = "Dina " + balance + " KjellBucks multipliceras med " + inputTimes;
            } else {
                this.style.backgroundColor = "white";
                bulletList[Number(this.id)] = "blank";
                inputTimes-=0.5;
                inputBetTitle.innerHTML = "Dina " + balance + " KjellBucks multipliceras med " + inputTimes;
            }

            if (bulletList.includes("active") && inputBet > 0) {
                startButton.style.display = "";
            } else {
                startButton.style.display = "none";
            }
        });
    }

    startButton.addEventListener("click", function() {
        console.log("inputBet" + inputBet)
        console.log("inputTimes" + inputTimes)
        console.log("balance" + balance)
        if (inputBet <= balance && inputBet > 0) {
            balance-= inputBet;
            balanceText.innerHTML = balance
            bunny.src = "https://i.ibb.co/1nJzcMf/image.png";
            bunny.style.transform = "rotate(0deg)"
            document.getElementById("start-button").style.backgroundColor == "red";
            ranNum = Math.floor(Math.random()*7);
            console.log(ranNum)
            startButton.style.display = "none";

            winLose.style.display = "none";

            cylinderDiv.style.animationName = list[ranNum];
            cylinderDiv.style.animationDuration = "3s";
            cylinderDiv.style.animationTimingFunction = "ease-out"
            cylinderDiv.style.animationFillMode = "forwards"

            setTimeout(function() {
                cylinderDiv.style.animationName = "";
                if (bulletList[ranNum] == "active") {
                    winLose.style.display = "";
                    winLose.innerHTML = "Du Förlorade!";
                    flashBang.style.animationName = "flash";
                    flashBang.style.animationDuration = "0.05s";
                    winLose.style.color = "red";
                    bunny.src = "https://i.ibb.co/h9p2j3W/image.png";
                    bunny.style.transform = "rotate(180deg)";
                } else {
                    winLose.style.display = "";
                    winLose.innerHTML = "Du Vann!";
                    winLose.style.color = "green";
                    balance += inputBet*inputTimes;
                    console.log(inputBet)
                    balanceText.innerHTML = balance;
                }
                inputBet = 0;
                inputAmount.innerHTML = inputBet;

                inputBet = "";
                inputTimes = 1;
                inputBetTitle.innerHTML = "Dina " + balance + " KjellBucks multipliceras med " + inputTimes;

                bulletList = ["blank", "blank", "blank", "blank", "blank", "blank", "blank"];

                setTimeout(function() {
                    flashBang.style.animationName = "";
                }, 500)

                winLose.style.display = "";

                for (var i = 0; i < 7; i++) {
                    document.getElementById(i).style.backgroundColor = "white"
                }
            }, 3000)
        } else {
            winLose.innerHTML = "Du har inte tillräckligt";
        }
    })
});