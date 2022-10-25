/*** GAME PREPARATION ***/

// get actual setting of game size
var sizeSetting = localStorage.getItem("sizeClass");

// grid size
if (sizeSetting === "small") {
    var columnsCount = 2,
        rowsCount    = 2;
} else if (sizeSetting === "medium") {
    var columnsCount = 4,
        rowsCount    = 3;
} else if (sizeSetting === "large") {
    var columnsCount = 5,
        rowsCount    = 4;
}

var gridSize = columnsCount * rowsCount;

// pictures supply
var picturesPaths = [
    "./images/blackPython.svg",
    "./images/bluePython.svg",
    "./images/cyanPython.svg",
    "./images/greenPython.svg",
    "./images/orangePython.svg",
    "./images/pinkPython.svg",
    "./images/purplePython.svg",
    "./images/redPython.svg",
    "./images/whitePython.svg",
    "./images/yellowPython.svg"
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


/*** GAME RUNNING ***/
var firstCard;
var secondCard;

function turnOverCard(buttonElement) {

    if (firstCard === undefined) {
        firstCard = buttonElement;
        showCardBack(firstCard);
        disableClick(firstCard);
    } else if (secondCard === undefined) {
        secondCard = buttonElement;
        showCardBack(secondCard);
        isLastCard() ? (
                enableClick(firstCard),
                hoverShine(firstCard),
                hoverShine(secondCard)
            ) : disableClick(secondCard);
    } else {
        comparePictures(firstCard, secondCard);
    };

    if (isEmptyPlayground()) {
        endGameView()
    };
}

function showCardBack(card) {
    let cardImg = card.firstElementChild;
    cardImg.setAttribute("src", cards[card.id]);
}

function showCardFront(card) {
    card.firstElementChild.setAttribute("src", "");
}

function disableClick(card) {
    card.setAttribute("onclick", "");
    card.style.cursor = "default";
}

function enableClick(card) {
    card.setAttribute("onclick", "turnOverCard(this)");
    card.style.cursor = "pointer";
}

function comparePictures(card_1, card_2) {
    let firstSource  = card_1.firstElementChild.getAttribute("src");
    let secondSource = card_2.firstElementChild.getAttribute("src");

    if (firstSource == secondSource) {
        deleteCards();  // cards are the same
    } else {
        resetCards();  // cards are different
    }
}

function resetCards() {
    enableClick(firstCard);
    enableClick(secondCard);
    showCardFront(firstCard);
    showCardFront(secondCard);
    firstCard = secondCard = undefined;
}

function deleteCards() {
    firstCard.outerHTML = "<div class='void'></div>";
    secondCard.outerHTML = "<div class='void'></div>";
    firstCard = secondCard = undefined;
}

function isLastCard() {
    if (getButtonCount() == 2) {
        return true;
    } else {
        return false;
    }
}

function getButtonCount() {
    let buttonCount = playground.getElementsByTagName('button').length;
    return buttonCount
}

// last two cards shining when hovering

function hoverShine(card) {
    card.setAttribute("onmouseenter", "bright(this)");
    card.setAttribute("onmouseleave", "debright(this)");
}

function bright(hoveredButton) {
    hoveredButton.setAttribute("style", "filter: brightness(1.5)");
}

function debright(hoveredButton) {
    hoveredButton.setAttribute("style", "filter: brightness(1)");
}

function isEmptyPlayground() {
    if (getButtonCount() == 0) {
        return true
    } else {
        return false
    };
};


/*** GAME END ***/
function endGameView() {
    removeSectionEl();
    addExitButton();
};

function removeSectionEl() {
    let section = document.querySelector("section");
    section.remove();
}

function addExitButton() {
    let exitAnchor = document.createElement("a"),
        navElem    = document.createElement("nav"),
        mainElem   = document.querySelector("main");
    exitAnchor.textContent = "back to menu";
    exitAnchor.setAttribute("href", "./menu.html");
    exitAnchor.setAttribute("id", "back");
    navElem.appendChild(exitAnchor);
    mainElem.appendChild(navElem);
}