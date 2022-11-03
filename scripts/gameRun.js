// global variables
var firstCard,
    secondCard,
    colors  = ["Blue", "Red", "Green", "Yellow"],
    players = colors.slice(0, numberOfPlayers)
    desk    = document.getElementById("desk");

// who's on turn
function actualPlayer() {
    return players[0];
}

// turning over cards
function turnOverCard(buttonElement) {

    if (firstCard === undefined) {  // (unturned)
        firstCard = buttonElement;
        showCardBack(firstCard);
        disableClick(firstCard);

    } else if (secondCard === undefined) {  // (unturned)
        secondCard = buttonElement;
        showCardBack(secondCard);
        enableClick(firstCard);
        hoverShine(firstCard);
        hoverShine(secondCard);

        otherCards().forEach(anotherCard => {
            disableClick(anotherCard);
        });

    } else {  // both cards turned
        comparePictures(firstCard, secondCard);
    };

    if (isEmptyPlayground()) {
        endGameView()
    };
}

// showing card back/front & disabling/enabling click
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
    card.style.setProperty("--card-brightness", "1");
    card.style.setProperty("--card-cursor", "default");
}

function enableClick(card) {
    card.setAttribute("onclick", "turnOverCard(this)");
    card.style.cursor = "pointer";
    card.style.setProperty('--card-brightness', "1.3");
    card.style.setProperty("--card-cursor", "pointer");
}

// all cards except both currently turned
function otherCards() {
    let allCards = playground.children;
    allCardsArray = Array.prototype.slice.call(allCards);
    return _.pull(allCardsArray, firstCard, secondCard);
}

// handling attempt result
function comparePictures(card_1, card_2) {
    let firstSource  = card_1.firstElementChild.getAttribute("src");
    let secondSource = card_2.firstElementChild.getAttribute("src");

    if (firstSource == secondSource) {  // cards are the same
        deleteCards();
        increaseScore(actualPlayer());

    } else {  // cards are different
        resetCards();
        nextPlayer();
    }

    otherCards().forEach(anotherCard => {
        enableClick(anotherCard);
    });

    firstCard = secondCard = undefined;
}

function deleteCards() {
    firstCard.outerHTML = "<div class='void'></div>";
    secondCard.outerHTML = "<div class='void'></div>";
}

function resetCards() {
    showCardFront(firstCard);
    showCardFront(secondCard);
    deactivateHoverShine(firstCard);
    deactivateHoverShine(secondCard);
}

// switching player and scoreboxes
function nextPlayer() {
    players.push(players.shift());
    switchTo(actualPlayer());
}

function switchTo(player) {
    let scoreBarCSSLink = document.getElementById("scoreBarCSS");
    scoreBarCSSLink.setAttribute("href", `./css/highlight${player}.css`);
}

// the two turned cards shining when hovering
function hoverShine(card) {
    card.setAttribute("onmouseover", "bright(this)");
    card.setAttribute("onmouseleave", "debright(this)");
}

function deactivateHoverShine(card) {
    card.removeAttribute("onmouseover");
    card.removeAttribute("onmouseleave");
    card.removeAttribute("style");
}

function bright(hoveredButton) {
    hoveredButton.setAttribute("style", "filter: brightness(1.25)");
}

function debright(hoveredButton) {
    hoveredButton.setAttribute("style", "filter: brightness(1)");
}

// score handling
function increaseScore(player) {
    let scoreElem = document.getElementById(player).lastElementChild,
        scoreNum  = Number(scoreElem.textContent);
    scoreNum += 1;
    scoreElem.textContent = scoreNum;
}

// check if there are any cards
function isEmptyPlayground() {
    if (getButtonCount() == 0) {
        return true
    } else {
        return false
    };
};

function getButtonCount() {
    let buttonCount = playground.getElementsByTagName('button').length;
    return buttonCount
}
