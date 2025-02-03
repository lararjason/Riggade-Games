document.addEventListener("DOMContentLoaded", function() {
    var game = document.body;

    var infoContainer = document.createElement("div");
    infoContainer.classList = "infoContainer";
    game.appendChild(infoContainer);

    infoContainer.addEventListener("click", function() {
        infoContainer.style.visibility = "hidden";
    })

    var infoTitle = document.createElement("h1");
    infoTitle.innerHTML = "Regler:";
    infoContainer.appendChild(infoTitle);

    var infoText = document.createElement("p");
    infoText.innerHTML = "Skriv in hur mycket KjellBucks du vill gambla med. Klicka sedan på minst 4 skott och hoppas att kaninen inte blir skjuten! Klicka vart som för att gå vidare";
    infoContainer.appendChild(infoText);

    var bunny = document.createElement("img");
    game.appendChild(bunny);
    bunny.classList = "imgStyle";
    bunny.src = "https://i.ibb.co/1nJzcMf/image.png";
    bunny.style.transform = "rotate(0deg)";

    var activeBullets = 0;
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
    settings.classList = "settingsStyle";
    
    var betCheck = document.createElement("p");
    betCheck.classList = "betCheck";
    settings.appendChild(betCheck);

    var startRestartButtonContainer = document.createElement("div");
    startRestartButtonContainer.classList = "startRestartButtonContainer";
    settings.appendChild(startRestartButtonContainer);

    var startButton = document.createElement("button");
    startRestartButtonContainer.appendChild(startButton);
    startButton.id = "start-button";
    startButton.classList = "startButtonOff";
    startButton.innerHTML = "Starta Selet";

    var restartButton = document.createElement("button");
    startRestartButtonContainer.appendChild(restartButton);
    restartButton.id = "restart-button";
    restartButton.classList = "restartButton";
    restartButton.innerHTML = "Spela Igen?";

    var inputBetTitle = document.createElement("p");
    settings.appendChild(inputBetTitle);
    inputBetTitle.classList = "";
    inputBetTitle.id = "input-title"
    inputBetTitle.innerHTML = "Dina " + 0 + " KjellBucks multipliceras med " + inputTimes;

    var inputContainer = document.createElement("div");
    settings.appendChild(inputContainer);
    inputContainer.classList = "inputContainer";

    var addContainer = document.createElement("div");
    inputContainer.appendChild(addContainer);
    addContainer.classList = "addContainer";

    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Lägg In Dina KjellBucks Här!";
    addContainer.appendChild(input);

    input.oninput = function() {
        if (isNaN(input.value) || Number(input.value) < 1) {
            startButton.classList= "startButtonOff";
            betCheck.innerHTML = "Lägg In Tal För Att Gambla!";
        } else {
            if (Number(input.value) > balance) {
                startButton.classList= "startButtonOff";
                betCheck.innerHTML = "Du Har Inte Så Mycket KjellBucks!";
            } else {
                betCheck.innerHTML = "";
                inputBet = Math.floor(Number(input.value));
                inputBetTitle.innerHTML = "Dina " + inputBet + " KjellBucks multipliceras med " + inputTimes;
                if (activeBullets > 3 && inputBet > 0) {
                    startButton.classList= "startButtonOn";
                } else {
                    startButton.classList= "startButtonOff";
                }
            }
        }
    }

    var flashBang = document.createElement("div");
    game.appendChild(flashBang);
    flashBang.style.width = "100vw";
    flashBang.style.height = "100vh";
    flashBang.style.zIndex = "2";

    var ranNum;

    var list = ["hole0", "hole6", "hole5", "hole4", "hole3", "hole2", "hole1"];

    var bulletList = ["blank", "blank", "blank", "blank", "blank", "blank", "blank"];
    
    var gunCylinderContainer = document.createElement("div");
    gunCylinderContainer.classList = "gunCylinderContainer";
    game.appendChild(gunCylinderContainer);

    var cylinderDiv = document.createElement("div");
    cylinderDiv.classList = "cylinder";
    cylinderDiv.id = "cylinderId";
    gunCylinderContainer.appendChild(cylinderDiv);

    var gunImg = document.createElement("img");
    gunImg.classList = "gun";
    gunImg.src = "media/revolver-gun-svgrepo-com.png"
    gunCylinderContainer.appendChild(gunImg);

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
                activeBullets++;
                if (activeBullets > 3) {
                    inputTimes+=0.5;
                }
                this.style.backgroundColor = "orange";
                this.style.backgroundImage = "url(Media/bullet.png)";
                bulletList[Number(this.id)] = "active";
                inputBetTitle.innerHTML = "Dina " + Number(input.value) + " KjellBucks multipliceras med " + inputTimes;
            } else {
                activeBullets--;
                if (activeBullets > 2) {
                    inputTimes-=0.5;
                }
                this.style.backgroundColor = "";
                this.style.backgroundImage = ""
                bulletList[Number(this.id)] = "blank";
                inputBetTitle.innerHTML = "Dina " + Number(input.value) + " KjellBucks multipliceras med " + inputTimes;
            }

            if (activeBullets > 3 && inputBet > 0) {
                startButton.classList= "startButtonOn";
            } else {
                startButton.classList= "startButtonOff";
            }
        });
    }



    startButton.addEventListener("click", function() {
        if (inputTimes >= 1.5 && startButton.classList == "startButtonOn") {
            startButton.classList = "startButtonOff";
            ranNum = Math.floor(Math.random()*7);
            cylinderDiv.style.animationName = list[ranNum];
            cylinderDiv.style.animationDuration = "3s";
            cylinderDiv.style.animationTimingFunction = "ease-out";
            cylinderDiv.style.animationFillMode = "forwards";
            balance -= Number(input.value);
            balanceText.innerHTML = balance;
            input.value = "";
            input.style.visibility = "hidden";

            setTimeout(function() {
                cylinderDiv.style.visibility = "hidden";
                barrel.style.visibility = "hidden";
                gunImg.style.visibility = "visible";
            }, 3500)

            setTimeout(function() {
                cylinderDiv.style.animationName = "";
                if (bulletList[ranNum] == "active") {
                    flashBang.style.animationName = "flash";
                    flashBang.style.animationDuration = "0.05s";
                    bunny.src = "media/bunnyDead.png";
                    bunny.style.transform = "rotate(180deg)";
                    gunImg.style.transform = "rotate(-20deg)";
                } else {
                    bunny.style.animationName = "bounce";
                    bunny.style.animationDuration = "1s";
                    bunny.style.animationIterationCount = "infinite";
                    setTimeout(function() {
                        bunny.style.animationName = "";
                    }, 3000)
                    balance += inputBet*inputTimes;
                    balanceText.innerHTML = balance;
                }

                restartButton.style.visibility = "visible";

                setTimeout(function() {
                    flashBang.style.animationName = "";
                }, 500)
            }, 4000)
        }
    })

    restartButton.addEventListener("click", function() {
        balance = Number(balanceText.innerHTML);

        input.style.visibility = "visible";

        gunImg.style.transform = "rotate(0deg)";

        inputBet = 0;
        activeBullets = 0;
        inputTimes = 1;
        inputBetTitle.innerHTML = "Dina " + 0 + " KjellBucks multipliceras med " + inputTimes;

        for (var i = 0; i < 7; i++) {
            document.getElementById(i).style.backgroundColor = "";
            document.getElementById(i).style.backgroundImage = "";
        }

        bulletList = ["blank", "blank", "blank", "blank", "blank", "blank", "blank"];

        restartButton.style.visibility = "hidden";
        startButton.style.classList = "startButtonOff";

        cylinderDiv.style.visibility = "visible";
        gunImg.style.visibility = "hidden";
        barrel.style.visibility = "visible";

        bunny.src = "media/bunnyNormal.png";
        bunny.style.transform = "rotate(0deg)";
        bunny.style.animationName = "";
    })
});
