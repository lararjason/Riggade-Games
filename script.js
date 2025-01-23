var spinnerDiv;
var containter;
var rollerImg;
var resultDiv;
var resulth2;
var resultTxt;
var starterbtns;
document.addEventListener("DOMContentLoaded", function () {
    const greenBtn = document.getElementById("Green");
    const redBtn = document.getElementById("Red");
    const blackBtn = document.getElementById("Black");
    let bet = document.getElementById("bet");
    let totalEarning;
    let winner = false;
    let color; // RESULTAT

    container = document.querySelector(".container");
    starterbtns = document.querySelector(".startGamebtn")


    spinnerDiv = document.createElement("div");
    rollerImg = document.createElement("img");
    
    const cards = 40;

    const redCards = Math.floor(cards * 0.20);  // 20% red cards
    const blackCards = Math.floor(cards * 0.20); // 20% black cards
    const greenCards = Math.floor(cards * 0.02);  // 2% green card
    
    



    bet.addEventListener("input", function () {
        let value = bet.value;
        value = value.replace(/[^0-9]/g, "");        
        if (value < 0) {
            value = 0;
        }
        bet.value = value;
    });
    document.querySelectorAll(".colors button").forEach(function(el) {
        el.addEventListener("click", function (){
            if(bet.value != ""){
                hideInput();
                console.log(bet.value);
                console.log(el.id)
                showSpinner(bet.value, el.id)
            }
        });
    });

function hideInput(){
    
   starterbtns.id = "hide";
    
}

});



function playAgainbtn(){

    let playAgainbtn = document.createElement("button");
    container.appendChild(playAgainbtn);
    playAgainbtn.className = "playAgainButton";
    playAgainbtn.innerText = "Play Again";

    playAgainbtn.addEventListener("click", function(){

        starterbtns.id = "";
        playAgainbtn.id = "hide";
        resultDiv.id = "hide";
    

    })
}

function displayResult(result){
     resultDiv = document.createElement("div");
     resulth2 = document.createElement("h2");
     resultTxt = document.createElement("p");

    container.appendChild(resultDiv);
    resultDiv.className = "results";
    resultDiv.style.backgroundColor = result.color;
    resulth2.innerText = "Result:";
    resultDiv.appendChild(resulth2);
    resultTxt.innerText = result.message;
    resultDiv.appendChild(resultTxt);
    playAgainbtn();
    
}


// denna kommer att användas senare för server (randomiserar kort)
function randomizeCards() {
    const randomIndex = Math.floor(Math.random() * 41); // Get a random index
    if(randomIndex == 0 || randomIndex == 41){
        return "Green";
    }else if(randomIndex % 2 == 0) {
        return "Black"
    }else {
        return "Red";
    }
} 
async function showSpinner(bet, color) {
    spinnerDiv.className = "spinner";
    spinnerDiv.innerText = "Spinnning...";
    container.appendChild(spinnerDiv);

    rollerImg.src = "https://media1.giphy.com/media/nUnG7pW0ebqFhQ0s8U/giphy.gif?cid=6c09b952v8wbuks8ejl61878xrzs1oyg9c6206q3eyb2dc9c&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s";
    container.appendChild(rollerImg)


    result = await randomizeCards();
    console.log("result: " + result + ". Color: " + color);
    let process = {}
    let multplier = (result == "Green") ? 10 : 1.5;
    if(color == result){
        process.color = "green";
        process.message = "Congratulations! You won " + bet * multplier + " KjellBucks$ " + " on " + color; 
    }else{
        process.color = "red";
        process.message = "YOU LOST! TRY AGAIN! The color was " + result; 
    }
    setTimeout(() => {
        displayResult(process);
        resultDiv.id ="";
        spinnerDiv.innerText = "";
        rollerImg.src = "";

    }, 3000);
}
