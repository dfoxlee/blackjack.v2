let deck;
let userHand = [];
let dealerHand = [];
let userScore = 0;
let dealerScore = 0;
let roundStart = false;
let broke = false;

let gameBtn = document.getElementById("gameBtn");
let gameBtnText = document.getElementById("gameBtnText");

// CARDS

let dealerCards = document.getElementById("dealerCards");
let userCards = document.getElementById("userCards");

// RESULTS MESSAGE

let resultsMessage = document.getElementById("resultsMessage");
let resultsText = document.getElementById("resultsText");

// HIT AND STAY

let hitBtn = document.getElementById("hitBtn");
let stayBtn = document.getElementById("stayBtn");


// CHIPS

let chip1 = document.getElementById("chip1");
let chip5 = document.getElementById("chip5");
let chip10 = document.getElementById("chip10");
let chip50 = document.getElementById("chip50");
let chip100 = document.getElementById("chip100");

// BALANCES

let betAmount = document.getElementById("betAmount");
let bankBalance = document.getElementById("bankBalance");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function makeDeck() {
    deck = [];
    let index;
    
    for(let j=0; j<4; j++) {
        for(let i=2; i<15; i++) {
            if(j == 0) {
                //Spades
                index = Math.floor(Math.random()*52);

                while(deck[index] != undefined) {
                    index = Math.floor(Math.random()*52);
                }

                if(i < 11){
                    deck[index] = [i, "S"];
                }else if(i == 11) {
                    deck[index] = ["J", "S"];
                }else if(i == 12) {
                    deck[index] = ["Q", "S"];
                }else if(i == 13) {
                    deck[index] = ["K", "S"];
                }else if(i == 14) {
                    deck[index] = ["A", "S"];
                }

            }else if(j ==1) {
                // Hearts
                index = Math.floor(Math.random()*52);

                while(deck[index] != undefined) {
                    index = Math.floor(Math.random()*52);
                }

                if(i < 11){
                    deck[index] = [i, "H"];
                }else if(i == 11) {
                    deck[index] = ["J", "H"];
                }else if(i == 12) {
                    deck[index] = ["Q", "H"];
                }else if(i == 13) {
                    deck[index] = ["K", "H"];
                }else if(i == 14) {
                    deck[index] = ["A", "H"];
                }

            }else if(j == 2) {
                // Clubs
                index = Math.floor(Math.random()*52);

                while(deck[index] != undefined) {
                    index = Math.floor(Math.random()*52);
                }

                if(i < 11){
                    deck[index] = [i, "C"];
                }else if(i == 11) {
                    deck[index] = ["J", "C"];
                }else if(i == 12) {
                    deck[index] = ["Q", "C"];
                }else if(i == 13) {
                    deck[index] = ["K", "C"];
                }else if(i == 14) {
                    deck[index] = ["A", "C"];
                }

            }else if(j == 3) {
                // Diamonds
                index = Math.floor(Math.random()*52);

                while(deck[index] != undefined) {
                    index = Math.floor(Math.random()*52);
                }

                if(i < 11){
                    deck[index] = [i, "D"];
                }else if(i == 11) {
                    deck[index] = ["J", "D"];
                }else if(i == 12) {
                    deck[index] = ["Q", "D"];
                }else if(i == 13) {
                    deck[index] = ["K", "D"];
                }else if(i == 14) {
                    deck[index] = ["A", "D"];
                }
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function dealFirstCards() {
    if(roundStart == true) {
        return;
    }else if(parseInt(betAmount.innerText) == 0) {
        alert("Please place a bet before the deal.");
    }else if(parseInt(bankBalance.innerText) == 0 && parseInt(betAmount.innerText) == 0) {
        let text = "You are broke. Would you like to start a new game?";
        if(confirm(text) == true) {
            newGame();
        }else {
            return;
        }
    }else if(roundStart == false) {
        let index;
        let card;
        let cardTop;
        let cardSuit;
        let cardBottom;

        makeDeck();
        resultsMessage.style.display = "none";
        hitBtn.addEventListener("click", hitUser);
        stayBtn.addEventListener("click", userStay);

        // CLEAR CARDS FROM DOM

        for(let i=0; i<userHand.length; i++) {
            userCards.removeChild(userCards.firstElementChild);
        }

        for(let i=0; i<dealerHand.length; i++) {
            dealerCards.removeChild(dealerCards.firstElementChild);
        }

        userHand = [];
        dealerHand = [];

        // DEAL USER CARDS

        for(let i=0; i<2; i++) {
            do{
                index = Math.floor(Math.random()*52);
            }while(deck[index] == 0);

            userHand[i] = deck[index];
            deck[index] = 0;

            card = document.createElement("div");
            card.classList.add("card");

            cardTop = document.createElement("h2");
            cardTop.classList.add("card-top", userHand[i][1]);
            cardTop.innerText = userHand[i][0]

            cardBottom = document.createElement("h2");
            cardBottom.classList.add("card-bottom", userHand[i][1]);
            cardBottom.innerText = userHand[i][0]

            cardSuit = document.createElement("h2");
            cardSuit.classList.add("card-suit", userHand[i][1]);
            switch(userHand[i][1]) {
                case "S":
                    cardSuit.innerHTML = "&#9824";
                    break;
                case "H":
                    cardSuit.innerHTML = "&#9829";
                    break;
                case "C":
                    cardSuit.innerHTML = "&#9827";
                    break;
                case "D":
                    cardSuit.innerHTML = "&#9830";
                    break;
            }

            card.appendChild(cardTop);
            card.appendChild(cardBottom);
            card.appendChild(cardSuit);

            userCards.appendChild(card);
        }

        // DEAL DEALER CARDS

        for(let i=0; i<2; i++) {
            do{
                index = Math.floor(Math.random()*52);
            }while(deck[index] == 0);

            dealerHand[i] = deck[index];
            deck[index] = 0;

            if(i == 0) {
                card = document.createElement("div");
                card.classList.add("card");

                card.style.backgroundImage = "url(./resources/card-back.png)";
                card.style.backgroundSize = "cover";
                card.style.backgroundRepeat = "no-repeat";
                card.style.backgroundPosition = "center";

                dealerCards.appendChild(card);

            }else {
                card = document.createElement("div");
                card.classList.add("card");

                cardTop = document.createElement("h2", dealerHand[i][1]);
                cardTop.classList.add("card-top", dealerHand[i][1]);
                cardTop.innerText = dealerHand[i][0]

                cardBottom = document.createElement("h2");
                cardBottom.classList.add("card-bottom", dealerHand[i][1]);
                cardBottom.innerText = dealerHand[i][0];

                cardSuit = document.createElement("h2");
                cardSuit.classList.add("card-suit", dealerHand[i][1]);
                switch(dealerHand[i][1]) {
                    case "S":
                        cardSuit.innerHTML = "&#9824";
                        break;
                    case "H":
                        cardSuit.innerHTML = "&#9829";
                        break;
                    case "C":
                        cardSuit.innerHTML = "&#9827";
                        break;
                    case "D":
                        cardSuit.innerHTML = "&#9830";
                        break;
                }

                card.appendChild(cardTop);
                card.appendChild(cardBottom);
                card.appendChild(cardSuit);

                dealerCards.appendChild(card);
            }
        }
        roundStart = true;

        updateScores();
        checkUserScore();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateScores() {
    userScore = 0;
    dealerScore = 0;

    let tempArr = [];
    let aceIndex = 0;

    // UPDATE USER SCORE
    for(let i=0; i<userHand.length; i++) {
        if(userHand[i][0] == "J" || userHand[i][0] == "Q" || userHand[i][0] == "K") {
            tempArr.push(10);
        }else if(userHand[i][0] == "A") {
            aceIndex += 1;
        }else {
            tempArr.push(parseInt(userHand[i][0]));
        }
    }

    for(let i=0; i<tempArr.length; i++) {
        userScore += tempArr[i];
    }

    if(aceIndex > 0) {
        for(let i=0; i<aceIndex; i++) {
            if(userScore < 11) {
                userScore += 11;
            }else{
                userScore += 1;
            }
        }
    }

    //UPDATE DEALER SCORE
    tempArr = [];
    aceIndex = 0;

    for(let i=0; i<dealerHand.length; i++) {
        if(dealerHand[i][0] == "J" || dealerHand[i][0] == "Q" || dealerHand[i][0] == "K") {
            tempArr.push(10);
        }else if(dealerHand[i][0] == "A") {
            aceIndex += 1;
        }else {
            tempArr.push(parseInt(dealerHand[i][0]));
        }
    }

    for(let i=0; i<tempArr.length; i++) {
        dealerScore += tempArr[i];
    }

    if(aceIndex > 0) {
        for(let i=0; i<aceIndex; i++) {
            if(dealerScore < 11) {
                dealerScore += 11;
            }else{
                dealerScore += 1;
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkUserScore() {
    if(userScore == 21) {
        userWins();
    }else if(userScore > 21) {
        userLoses();
    }else {
        return;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function userWins() {
    if(userScore == 21) {
        dealerCards.firstElementChild.style.background = "none";
        dealerCards.firstElementChild.style.backgroundColor = "white";

        let cardTop = document.createElement("h2");
        cardTop.classList.add("card-top", dealerHand[0][1]);
        cardTop.innerText = dealerHand[0][0];
        
        let cardSuit = document.createElement("h2");
        cardSuit.classList.add("card-suit", dealerHand[0][1]);
        switch(dealerHand[0][1]) {
            case "S":
                cardSuit.innerHTML = "&#9824";
                break;
            case "H":
                cardSuit.innerHTML = "&#9829";
                break;
            case "C":
                cardSuit.innerHTML = "&#9827";
                break;
            case "D":
                cardSuit.innerHTML = "&#9830";
                break;
        }
                        
        let cardBottom = document.createElement("h2");
        cardBottom.classList.add("card-bottom", dealerHand[0][1]);
        cardBottom.innerText = dealerHand[0][0];

        dealerCards.firstElementChild.appendChild(cardTop);
        dealerCards.firstElementChild.appendChild(cardSuit);
        dealerCards.firstElementChild.appendChild(cardBottom);


        resultsMessage.style.display = "block";
        resultsText.innerText = "Blackjack! User Wins! Place bet before next deal.";

        bankBalance.innerText = parseInt(bankBalance.innerText) + Math.floor(parseInt(betAmount.innerText)*3/2);
        betAmount.innerText = "0";

        userScore = 0;
        dealerScore = 0;
        roundStart = false;
        hitBtn.removeEventListener("click",hitUser);
        stayBtn.removeEventListener("click", userStay);
    }else {
        dealerCards.firstElementChild.style.background = "none";
        dealerCards.firstElementChild.style.backgroundColor = "white";

        let cardTop = document.createElement("h2");
        cardTop.classList.add("card-top", dealerHand[0][1]);
        cardTop.innerText = dealerHand[0][0];
        
        let cardSuit = document.createElement("h2");
        cardSuit.classList.add("card-suit", dealerHand[0][1]);
        switch(dealerHand[0][1]) {
            case "S":
                cardSuit.innerHTML = "&#9824";
                break;
            case "H":
                cardSuit.innerHTML = "&#9829";
                break;
            case "C":
                cardSuit.innerHTML = "&#9827";
                break;
            case "D":
                cardSuit.innerHTML = "&#9830";
                break;
        }
                        
        let cardBottom = document.createElement("h2");
        cardBottom.classList.add("card-bottom", dealerHand[0][1]);
        cardBottom.innerText = dealerHand[0][0];

        dealerCards.firstElementChild.appendChild(cardTop);
        dealerCards.firstElementChild.appendChild(cardSuit);
        dealerCards.firstElementChild.appendChild(cardBottom);
        resultsMessage.style.display = "block";
        resultsText.innerText = `User Wins with ${userScore}. Place bet before next deal.`;

        bankBalance.innerText = parseInt(bankBalance.innerText) + Math.floor(parseInt(betAmount.innerText)*3/2);
        betAmount.innerText = "0";

        userScore = 0;
        dealerScore = 0;
        roundStart = false;
        hitBtn.removeEventListener("click",hitUser);
        stayBtn.removeEventListener("click", userStay);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function userLoses() {
    if(userScore > 21) {
        dealerCards.firstElementChild.style.background = "none";
        dealerCards.firstElementChild.style.backgroundColor = "white";

        let cardTop = document.createElement("h2");
        cardTop.classList.add("card-top", dealerHand[0][1]);
        cardTop.innerText = dealerHand[0][0];
        
        let cardSuit = document.createElement("h2");
        cardSuit.classList.add("card-suit", dealerHand[0][1]);
        switch(dealerHand[0][1]) {
            case "S":
                cardSuit.innerHTML = "&#9824";
                break;
            case "H":
                cardSuit.innerHTML = "&#9829";
                break;
            case "C":
                cardSuit.innerHTML = "&#9827";
                break;
            case "D":
                cardSuit.innerHTML = "&#9830";
                break;
        }
                        
        let cardBottom = document.createElement("h2");
        cardBottom.classList.add("card-bottom", dealerHand[0][1]);
        cardBottom.innerText = dealerHand[0][0];

        dealerCards.firstElementChild.appendChild(cardTop);
        dealerCards.firstElementChild.appendChild(cardSuit);
        dealerCards.firstElementChild.appendChild(cardBottom);
        resultsMessage.style.display = "block";
        resultsText.innerText = `User Busts With ${userScore}. Place bet before next deal.`;

        betAmount.innerText = "0";

        userScore = 0;
        dealerScore = 0;
        roundStart = false;
        hitBtn.removeEventListener("click",hitUser);
        stayBtn.removeEventListener("click", userStay);
    }else {
        // Display user loses
        resultsMessage.style.display = "block";
        resultsText.innerText = `User loses to ${dealerScore}. Place bet before next deal.`;

        betAmount.innerText = "0";

        userScore = 0;
        dealerScore = 0;
        roundStart = false;
        hitBtn.removeEventListener("click",hitUser);
        stayBtn.removeEventListener("click", userStay);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function hitUser() {
    if(roundStart == true) {
        let index;

        do{
            index = Math.floor(Math.random()*52);
        }while(deck[index] == 0);
    
        userHand.push(deck[index]);
        deck[index] = 0;
    
        card = document.createElement("div");
        card.classList.add("card");
    
        cardTop = document.createElement("h2");
        cardTop.classList.add("card-top", userHand[userHand.length-1][1]);
        cardTop.innerText = userHand[userHand.length-1][0]
    
        cardBottom = document.createElement("h2");
        cardBottom.classList.add("card-bottom", userHand[userHand.length-1][1]);
        cardBottom.innerText = userHand[userHand.length-1][0]
    
        cardSuit = document.createElement("h2");
        cardSuit.classList.add("card-suit", userHand[userHand.length-1][1]);
        switch(userHand[userHand.length-1][1]) {
            case "S":
                cardSuit.innerHTML = "&#9824";
                break;
            case "H":
                cardSuit.innerHTML = "&#9829";
                break;
            case "C":
                cardSuit.innerHTML = "&#9827";
                break;
            case "D":
                cardSuit.innerHTML = "&#9830";
                break;
        }
    
        card.appendChild(cardTop);
        card.appendChild(cardBottom);
        card.appendChild(cardSuit);
    
        userCards.appendChild(card);
    
        updateScores();
        checkUserScore();
    }else {
        return;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function userStay() {
    if(roundStart == true) {
        updateScores();
        finishDealer();
    }else {
        return;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function finishDealer() {
    dealerCards.firstElementChild.style.background = "none";
    dealerCards.firstElementChild.style.backgroundColor = "white";

    let cardTop = document.createElement("h2");
    cardTop.classList.add("card-top", dealerHand[0][1]);
    cardTop.innerText = dealerHand[0][0];
    
    let cardSuit = document.createElement("h2");
    cardSuit.classList.add("card-suit", dealerHand[0][1]);
    switch(dealerHand[0][1]) {
        case "S":
            cardSuit.innerHTML = "&#9824";
            break;
        case "H":
            cardSuit.innerHTML = "&#9829";
            break;
        case "C":
            cardSuit.innerHTML = "&#9827";
            break;
        case "D":
            cardSuit.innerHTML = "&#9830";
            break;
    }
                    
    let cardBottom = document.createElement("h2");
    cardBottom.classList.add("card-bottom", dealerHand[0][1]);
    cardBottom.innerText = dealerHand[0][0];

    dealerCards.firstElementChild.appendChild(cardTop);
    dealerCards.firstElementChild.appendChild(cardSuit);
    dealerCards.firstElementChild.appendChild(cardBottom);

    while(dealerScore < 17) {
        let index;

        do{
            index = Math.floor(Math.random()*52);
        }while(deck[index] == 0);
    
        dealerHand.push(deck[index]);
        deck[index] = 0;

        card = document.createElement("div");
        card.classList.add("card");
    
        cardTop = document.createElement("h2");
        cardTop.classList.add("card-top", dealerHand[dealerHand.length-1][1]);
        cardTop.innerText = dealerHand[dealerHand.length-1][0]
    
        cardBottom = document.createElement("h2");
        cardBottom.classList.add("card-bottom", dealerHand[dealerHand.length-1][1]);
        cardBottom.innerText = dealerHand[dealerHand.length-1][0]
    
        cardSuit = document.createElement("h2");
        cardSuit.classList.add("card-suit", dealerHand[dealerHand.length-1][1]);
        switch(dealerHand[dealerHand.length-1][1]) {
            case "S":
                cardSuit.innerHTML = "&#9824";
                break;
            case "H":
                cardSuit.innerHTML = "&#9829";
                break;
            case "C":
                cardSuit.innerHTML = "&#9827";
                break;
            case "D":
                cardSuit.innerHTML = "&#9830";
                break;
        }
    
        card.appendChild(cardTop);
        card.appendChild(cardBottom);
        card.appendChild(cardSuit);
    
        dealerCards.appendChild(card);

        updateScores();
    }

    checkDealerScore();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawGame() {
    resultsMessage.style.display = "block";
    resultsText.innerText = "It's a Draw. Place bet before next deal.";

    bankBalance.innerText = parseInt(bankBalance.innerText) + parseInt(betAmount.innerText);
    betAmount.innerText = "0";

    userScore = 0;
    dealerScore = 0;
    roundStart = false;
    hitBtn.removeEventListener("click",hitUser);
    stayBtn.removeEventListener("click", userStay);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkDealerScore() {
    if(dealerScore > 21 || userScore > dealerScore) {
        userWins();
    }else if(dealerScore == 21 || dealerScore > userScore) {
        userLoses();
    }else if(dealerScore == userScore) {
        drawGame();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function acceptBet(ele) {
    if(roundStart == false && parseInt(bankBalance.innerText) == 0 && parseInt(betAmount.innerText) == 0) {
        let text = "You are broke. Would you like to start a new game?";
        if(confirm(text) == true) {
            newGame();
        }else {
            return;
        }
    }else if(roundStart == false) {
        resultsText.innerText = "Once bet is placed, click deal.";
        let currentBet = parseInt(betAmount.innerText);
        let currentBankBalance = parseInt(bankBalance.innerText);

        if((currentBankBalance - parseInt(ele.target.innerText.slice(1))) >= 0) {
            currentBet += parseInt(ele.target.innerText.slice(1));
            currentBankBalance -= parseInt(ele.target.innerText.slice(1));
            betAmount.innerText = currentBet;
            bankBalance.innerText = currentBankBalance;
        }
    }else {
        return;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function newGame() {
    for(let i=0; i<userHand.length; i++) {
        userCards.removeChild(userCards.firstElementChild);
    }

    for(let i=0; i<dealerHand.length; i++) {
        dealerCards.removeChild(dealerCards.firstElementChild);
    }

    userHand = [];
    dealerHand = [];
    userScore = 0;
    dealerScore = 0;
    roundStart = false;
    hitBtn.removeEventListener("click",hitUser);
    stayBtn.removeEventListener("click", userStay);
    broke = false;
    resultsMessage.style.display = "none";

    betAmount.innerText = "0";
    bankBalance.innerText = "500";
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// EVENT LISTENERS

gameBtn.addEventListener("click", dealFirstCards);

chip1.addEventListener("click",acceptBet);
chip5.addEventListener("click",acceptBet);
chip10.addEventListener("click",acceptBet);
chip50.addEventListener("click",acceptBet);
chip100.addEventListener("click",acceptBet);