// get actual setting of game size
var sizeSetting = localStorage.getItem("deckSize") || "medium";

// scoreBoxes Yellow & Green
var yellowScoreBox = document.getElementById("Yellow"),
greenScoreBox  = document.getElementById("Green");

// number of players
var numberOfPlayers = Number(localStorage.getItem("numOfPlayers")) || 2;

if (numberOfPlayers == 2) {
    yellowScoreBox.remove();
    greenScoreBox.remove();
} else if (numberOfPlayers == 3) {
    yellowScoreBox.remove();
}

// grid size
let cardsCount;
if (sizeSetting === "small") {
    // var columnsCount = 4,
    //     rowsCount    = 3;
    cardsCount = 12;
} else if (sizeSetting === "medium") {
    // var columnsCount = 5,
    //     rowsCount    = 4;
    cardsCount = 20;
} else if (sizeSetting === "large") {
    // var columnsCount = 6,
    //     rowsCount    = 5;
    cardsCount = 30;
}

// pictures supply
var picturesPaths = [
    "./images/pythonLogo.svg",
    "./images/jsLogo.svg",
    "./images/htmlLogo.svg",
    "./images/cssLogo.svg",
    "./images/svgLogo.svg",
    "./images/gitLogo.svg",
    "./images/githubLogo.svg",
    "./images/vscodeLogo.svg",
    "./images/pycharmLogo.svg",
    "./images/lodashLogo.svg",
    "./images/mdnLogo.svg",
    "./images/googleLogo.svg",
    "./images/chromeLogo.svg",
    "./images/stackoverflowLogo.svg",
    "./images/gfgLogo.svg"
];

// shuffling
function shufflePictures(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// first shuffling
shufflePictures(picturesPaths);

// pictures reduction according grid size
picturesReduced = picturesPaths.slice(0, cardsCount/2);

// twice the values to make couples
function pushTwice(element, array) {
    array.push(element);
    array.push(element);
  };

var pictures = Array();
picturesReduced.forEach(path => pushTwice(path, pictures));

// second shuffling (whole deck of cards)
shufflePictures(pictures);

// desk
let desk = document.getElementById('desk');

// grid construction
// desk.style.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`;
// desk.style.gridTemplateRows = `repeat(${rowsCount}, 1fr)`;

// ids
// const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let ids = [];

// create places for cards with id (i => row, j => column)
for (let i = 0; i < cardsCount; i++) {
    
    let buttonElem = document.createElement('button');
    let imgElem    = document.createElement('img');

    buttonElem.setAttribute("id", `card-${i}`);
    buttonElem.setAttribute("onclick", "turnOverCard(this)");

    imgElem.setAttribute("src", "");
    imgElem.setAttribute("alt", "");

    buttonElem.appendChild(imgElem);
    desk.appendChild(buttonElem);

    ids.push(`card-${i}`);
    
}

// bind IDs & pictures together
var cards = {};
ids.forEach((id, i) => cards[id] = pictures[i]);
