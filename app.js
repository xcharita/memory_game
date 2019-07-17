
let firstCard, secondCard;
let ArrayGameOver = [];
let numberOfMoves = 0;
let p = 0;
let cardIsOpen = false;
let isFirstGame = true;
let numberOfStars = 3;

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
        cardIsOpen = false;
        if (firstCard.firstElementChild.className === secondCard.firstElementChild.className) {
            firstCard.classList.add('match');
            secondCard.classList.add('match');           GameOver(firstCard.firstElementChild.className,secondCard.firstElementChild.className);
            
        } else {
                setTimeout(function() {
                    isClosed(firstCard);
                    isClosed(secondCard);
                }, 500);
          }
        }   
    numberOfMoves++;
    allMoves.textContent = numberOfMoves;
    starRating();
};

const stars = document.querySelectorAll('.stars i');
function starRating(){
    if (numberOfMoves > 30){
        stars[1].classList.remove('fa-star');
        numberOfStars = 1;
    }
    else if (numberOfMoves > 20){
        stars[2].classList.remove('fa-star');
        numberOfStars = 2;
    }
};

function isClosed(card) {
    card.classList.remove('open','show');
};

function newGame() {
    let cardsForNewGame = document.querySelectorAll('.card');
    let newCardsArray = [];  
    let ArrayGameOver = [];
    time = 0;
    numberOfMoves = 0;
    allMoves.textContent = numberOfMoves;
    stars[1].classList.add('fa-star');
    stars[2].classList.add('fa-star');
    startTimerFunction();
// push all the cards in an array to make ready for the shuffle function    
        for (let i=0; i< cardsForNewGame.length; i++) {
            newCardsArray.push(cardsForNewGame[i].children[0].className);
        };
    setNewCards = shuffle(newCardsArray);
// Loop through the NodeList and assign the correct className to the NodeList
        for (var i = 0; i < cardsForNewGame.length; i++) {
            cardsForNewGame[i].className = "card";
            cardsForNewGame[i].firstElementChild.className = setNewCards[i];
        };
    cardsForNewGame.forEach(function(newCard){
            newCard.addEventListener('click', displayCard) });
};

function GameOver(firstcard, secondcard) {
    ArrayGameOver.push(firstcard);
    ArrayGameOver.push(secondcard);
    if (!isFirstGame) {
        if (ArrayGameOver.length === allCards.length) {
            stopTimerFunction();
            window.alert("Game Over !!");
            DisplayResults();
        }
    } else {
            if (ArrayGameOver.length === (allCards.length)) {
                endGame = true;
                stopTimerFunction(); 
                DisplayResults();
            }
    }
};

const yourTime = document.querySelector('.timer');

let t;
let time = 0;
function pad (val) { 
    return val > 9 ? val : "0" + val; 
};

function gameTimer() {
    t = setTimeout(gameTimer, 1000);
    ++time;
    let minute = pad(Math.floor(time / 60));
    let seconds = pad(time - (minute * 60));
    yourTime.innerHTML = `${minute}:${seconds}`;
};

function startTimerFunction() {
    if(time == 0){
        gameTimer();
    } 
};

function stopTimerFunction() {
        clearTimeout(t);
};

var allCards = document.querySelectorAll('.card');
var shuffleOption = document.querySelector('.restart');
const startButton = document.querySelector('.start-button');
const stopButton = document.querySelector('.stop-button');

allMoves.textContent = 0;
startButton.addEventListener('click', startTimerFunction);
stopButton.addEventListener('click', stopTimerFunction);

shuffleOption.addEventListener('click', newGame);
allCards.forEach(function(card){
            card.addEventListener('click', displayCard); 
});
 