// get actual setting of game size
var sizeSetting = localStorage.getItem("sizeClass") || "medium";

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
if (sizeSetting === "small") {
    var columnsCount = 4,
        rowsCount    = 3;
} else if (sizeSetting === "medium") {
    var columnsCount = 5,
        rowsCount    = 4;
} else if (sizeSetting === "large") {
    var columnsCount = 6,
        rowsCount    = 5;
}

var gridSize = columnsCount * rowsCount;

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
picturesReduced = picturesPaths.slice(0, gridSize/2);

// twice the values to make couples
function pushTwice(element, array) {
    array.push(element);
    array.push(element);
  };

var pictures = Array();
picturesReduced.forEach(path => pushTwice(path, pictures));

// second shuffling (whole deck of cards)
shufflePictures(pictures);

// playground
let playground = document.getElementById('PG');

// grid construction
playground.style.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`;
playground.style.gridTemplateRows = `repeat(${rowsCount}, 1fr)`;

// idFragments
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let ids = [];

// create places for cards with id (i => row, j => column)
for (let i = 0; i < rowsCount; i++) {
    for (let j = 1; j < (columnsCount + 1); j++) {

        let buttonElem = document.createElement('button');
        let imgElem    = document.createElement('img');
        buttonElem.setAttribute("id", `${letters[i]}${j}`);
        buttonElem.setAttribute("onclick", "turnOverCard(this)");
        imgElem.setAttribute("src", "");
        imgElem.setAttribute("alt", "");

        buttonElem.appendChild(imgElem);
        playground.appendChild(buttonElem);

        ids.push(`${letters[i]}${j}`);
    }
};

// bind IDs & pictures together
var cards = {};
ids.forEach((id, i) => cards[id] = pictures[i]);
