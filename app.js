
let firstCard, secondCard;
let ArrayGameOver = [];
let NumberOfMoves = 0;
let p = 0;
let cardIsOpen = false;
let isFirstGame = true;

var allMoves = document.querySelector('.moves');
var allStars = document.querySelector('.stars');

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
};


function displayCard() {
    if (!cardIsOpen) {
        firstCard = this;
        firstCard.classList.add('open', 'show');
        cardIsOpen = true;
    } else {
        secondCard = this;
        secondCard.classList.add('open', 'show'); 
        
        if (firstCard.firstElementChild.className === secondCard.firstElementChild.className) {
            firstCard.classList.add('match');
            secondCard.classList.add('match');
            
            firstCard.removeEventListener('click', displayCard);
            secondCard.removeEventListener('click', displayCard);
            
            GameOver(firstCard.firstElementChild.className,secondCard.firstElementChild.className);
            
        } else {
                setTimeout(function() {
                    isClosed(firstCard);
                    isClosed(secondCard);
                }, 500);
           
        }   
        cardIsOpen = false;
    }
    NumberOfMoves++;
    console.log(NumberOfMoves);
    allMoves.textContent = NumberOfMoves;
    
};

function DisplayStars(NumberOfMoves) {
    /*    
        	<ul class="stars">
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        	</ul>
*/
let howManyStars = 0;
let newStars;
var element  = document.getElementsByClassName('stars');
var fragment = document.createDocumentFragment();
    

console.log(NumberOfMoves);
howManyStars = (NumberOfMoves%3);
newStars.innerHTML = [];    
console.log(howManyStars);
    for (i=0; i < howManyStars; i++) {
            newStars = document.createElement('li');
            newStars.innerHTML = '<i class="fa fa-star"></i>';
            fragment.appendChild(newStars);
    }   
    element.appendChild(fragment);
};

function isClosed(card) {
    card.classList.remove('open','show');
};

function newGame() {
    let cardsForNewGame = document.querySelectorAll('.card');
    let newCardsArray = [];  
    let ArrayGameOver = [];
    NumberOfMoves = 0;
    console.log(NumberOfMoves);
    allMoves.textContent = NumberOfMoves;
    for (let i=0; i< cardsForNewGame.length; i++) {
        newCardsArray.push(cardsForNewGame[i].children[0].className);
    };
    setNewCards = shuffle(newCardsArray);
// Loop through the NodeList and assign the correct className to the NodeList
    for (var i = 0; i < cardsForNewGame.length; i++) {
        cardsForNewGame[i].className = "card";
        cardsForNewGame[i].firstElementChild.className = setNewCards[i];
    };
    cardsForNewGame.forEach(function(card){
            card.addEventListener('click', displayCard) });
};

function GameOver(firstcard, secondcard) {
    ArrayGameOver.push(firstcard);
    ArrayGameOver.push(secondcard);
    console.log(ArrayGameOver);
    console.log(p);
    if (!isFirstGame) {
        if (ArrayGameOver.length === allCards.length) {
            window.alert("Game Over !!");
            //stopTimer;
        }
    } else {
            if (ArrayGameOver.length === (allCards.length-2)) {
                window.alert("Game Over !!");
                //stopTimer; 
            }
    }
    console.log(firstcard);
    console.log(secondcard);
    p++;
    DisplayStars(p);
};

/*
function startTimer() {
    var second = 0, minute = 0; hour = 0;
    var timer = document.querySelector(".timer");
    var interval;
    interval = setInterval(function() {
        timer.textContent = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
};

function stopTimer() {
    //alertbox "you have finished the game in blalaa" secods
    
};
*/
var allCards = document.querySelectorAll('.card');
var shuffleOption = document.querySelector('.restart');


//startTimer();
allMoves.textContent = 0;
shuffleOption.addEventListener('click', newGame);
allCards.forEach(function(card){
            card.addEventListener('click', displayCard); 
});
 