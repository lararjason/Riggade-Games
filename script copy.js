document.addEventListener("DOMContentLoaded", function () {

    const greenBtn = document.getElementById("Green");
    const redBtn = document.getElementById("Red");
    const blackBtn = document.getElementById("Black");
    let bet = document.getElementById("bet");
    let totalEarning;
    let winner = false;
    let color; // RESULTAT
    const container = document.querySelector(".container");
    let starterbtns = document.querySelector(".startGamebtn")







    const resultDiv = document.createElement("div");
    const resulth2 = document.createElement("h2");
    const resultTxt = document.createElement("p");
    const spinnerDiv = document.createElement("div");
    const rollerImg = document.createElement("img");









    const cards = 40;

    const redCards = Math.floor(cards * 0.20);  // 20% red cards
    const blackCards = Math.floor(cards * 0.20); // 20% black cards
    const greenCards = Math.floor(cards * 0.02);  // 2% green cards

    // Create a pool of cards based on their counts(gpt)
    const cardPool = [];

    for (let i = 0;  i < redCards; i++) {
        cardPool.push("red");
    }
    for (let i = 0; i < blackCards; i++) {
        cardPool.push("black");
    }
    for (let i = 0; i < greenCards; i++) {
        cardPool.push("green");
    }

    function randomizeCards() {
        const randomIndex = Math.floor(Math.random() * cardPool.length); // Get a random index
        return cardPool[randomIndex]; // Return a random color
    }



    /**
     * if (bet.value === undefined){
     * alert("Please enter a bet amount");
     * }
     * 
     * 
     *    // if (value === 0 || value === undefined) {
     * 
     * }
     */
    bet.addEventListener("input", function () {
        let value = bet.value;
        
        // Remove any non-numeric characters
        value = value.replace(/[^0-9]/g, "");

        // Ensure the value is not negative
     
        
        if (value < 0) {
            value = 0;
        }

        bet.value = value;
    });


    greenBtn.addEventListener("click", function () {


        hideInput();
        
        console.log("Bet amount:" ,bet.value, "on green card");

        resultDiv.id = "";
        showSpinner();


        setTimeout(() => {

            color = randomizeCards(); // Get the result of randomization
            console.log("Randomized color:", color);
    
            if (color === "green") {
                winner = true;
                totalEarning = bet.value * 10; // Calculate total earnings
            } else{
                winner = false;
            }
    
            
            if (winner === true){
                displayResultsMessageWinner()
            }
            else{
                displayResultsMessageLooser()
            }
    
            playAgainbtn();   


        }, 3000)
        
    });



    redBtn.addEventListener("click", function () {


        hideInput();
        
        console.log("Bet amount:" ,bet.value, "on red card");

        resultDiv.id = "";

        showSpinner();

        setTimeout(() => {

            color = randomizeCards(); // Get the result of randomization
            console.log("Randomized color:", color);
    
            if (color === "red") {
                winner = true;
                totalEarning = bet.value * 1.5; // Calculate total earnings
            }
            else{
                winner = false;
            }
    
            
            if (winner === true){
                displayResultsMessageWinner()
            }
            else{
                displayResultsMessageLooser()
            }
    
            playAgainbtn();       

        }, 3000)
                                                                                         

    });

    blackBtn.addEventListener("click", function () {

        hideInput();
        console.log("Bet amount:" ,bet.value, "on black card");

        resultDiv.id = "";

        showSpinner();

        setTimeout(() => {
            color = randomizeCards();
            console.log("Randomized color:", color);
    
            if (color === "black") {
                winner = true;
                totalEarning = bet.value * 1.5; 
    
            } 
            else{
                winner = false;
            }
    
            if (winner === true){
                displayResultsMessageWinner()
            }
            else{
                displayResultsMessageLooser()
            }
            playAgainbtn();

        }, 3000);
        

    });




    function showSpinner() {
        spinnerDiv.className = "spinner";
        spinnerDiv.innerText = "Spinnning...";
        container.appendChild(spinnerDiv);

        rollerImg.src = "https://media1.giphy.com/media/nUnG7pW0ebqFhQ0s8U/giphy.gif?cid=6c09b952v8wbuks8ejl61878xrzs1oyg9c6206q3eyb2dc9c&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s";
        container.appendChild(rollerImg)

        resultDiv.id ="hide";

        setTimeout(() => {

            resultDiv.id ="";
            spinnerDiv.innerText = "";
            rollerImg.src = "";

        }, 3000);
    }



function displayResultsMessageWinner(){

    
    container.appendChild(resultDiv);
    resultDiv.className = "results";
    resultDiv.style.backgroundColor = "lightgreen";


    resulth2.innerText = "Result:";
    resultDiv.appendChild(resulth2);

    resultTxt.innerText = `You win! Your total earnings are: ${totalEarning}$!`;
    resultDiv.appendChild(resultTxt);
}

function displayResultsMessageLooser(){
    
    container.appendChild(resultDiv);
    resultDiv.className = "results";
    resultDiv.style.backgroundColor = "red";



    resulth2.innerText = "Result:";
    resultDiv.appendChild(resulth2);

    resultTxt.innerText = `You Lost! Color was: ${color}`;
    resultDiv.appendChild(resultTxt);
    
}

function hideInput(){
    
    starterbtns.id = "hide";
    
}

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

});
