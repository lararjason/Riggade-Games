let holder;
let currentBalance = 20;
let balanceText;

function placeBet(){
    holder.innerHTML = "";
    let input = document.createElement("input")
    
    let btn = makeBtn("bet");
    btn.addEventListener("click", function(){
    let bet = Number(input.value);
        if(isNaN(bet)){
            return
        }else if(bet > currentBalance) {
            return
        }else {
            startGame(Number(input.value))
        }
    });

    holder.append(btn)
    holder.append(input)
}


function startGame(bet){
    currentBalance -= bet;
    balanceText.innerText = "Current balance: " + currentBalance;

    holder.innerHTML = "";
    let heads = makeBtn("heads");
    heads.addEventListener("click", function(){
        afterGame(flip("heads"), bet);
    });

    let tails = makeBtn("tails");
    tails.addEventListener("click", function(){
        afterGame(flip("tails"), bet);
    });


}

function makeBtn(string, bet){
    var btn = document.createElement("button");
    btn.innerText = string;
    holder.appendChild(btn);
    return btn;
}

function flip(choice){
    let win = true
    let output = choice
    if(Math.random() > 0.29){
        win = false;
        if(choice == "heads"){
            output = "tails";
        }else {
            output = "heads"
        }
    }
    return {
        status: win,
        side: output
    }

}


function afterGame(results, bet){
    let text;
    console.log(bet)
    if(results.status){
        text = "Congrats you won " + parseInt(bet * 2)
        currentBalance += bet * 2;
    }else {
        text = "Unlucky! you lost " + parseInt(bet)
    }
    console.log(currentBalance)

    balanceText.innerText = "Current balance: " + currentBalance;


    holder.innerHTML = "";
    let img = document.createElement("img");
    let btn = makeBtn("Play again")
    btn.addEventListener("click",function(){
        if(isNaN(bet)){
            return
        }else if(bet > currentBalance) {
            return
        }else {
            startGame(bet);
        }
        
    })

    let Betbtn = makeBtn("Place bet")
    Betbtn.addEventListener("click",function(){
    placeBet()
    })

    img.src = results.side + ".png";
    let textEl = document.createElement("h2");
    textEl.innerText = text;
    holder.append(textEl)
    holder.append(img)
}
document.addEventListener("DOMContentLoaded", function(){
    holder = document.getElementById("game");
    balanceText = document.createElement("h2");
    balanceText.innerText = "Current balance: " + currentBalance;
    document.querySelector("body").prepend(balanceText)
    placeBet() 
})




