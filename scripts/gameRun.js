// global variables
var firstCard,
    secondCard,
    lastAttempt = false;

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

function otherCards() {  // returns array of all cards except both turned
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

        if (lastAttempt) {  // player guessed previous pair
            increaseScoreBy(2);
        } else {
            increaseScoreBy(1);
        }
        lastAttempt = true;
    } else {  // cards are different
        resetCards();

        increaseScoreBy(0);
        lastAttempt = false;
    }

    otherCards().forEach(anotherCard => {
        enableClick(anotherCard);
    });

    firstCard = secondCard = undefined;
}

function resetCards() {
    showCardFront(firstCard);
    showCardFront(secondCard);
    deactivateHoverShine(firstCard);
    deactivateHoverShine(secondCard);
}

function deleteCards() {
    firstCard.outerHTML = "<div class='void'></div>";
    secondCard.outerHTML = "<div class='void'></div>";
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
function increaseScoreBy(increment) {
    let attemElem = document.getElementById("attem").lastElementChild,
        attemNum  = Number(attemElem.textContent);
    
    attemNum += 1;
    attemElem.textContent = attemNum;
    
    if (increment > 0) {
        let foundElem = document.getElementById("found").lastElementChild,
            scoreElem = document.getElementById("score").lastElementChild,
            foundNum  = Number(foundElem.textContent),
            scoreNum  = Number(scoreElem.textContent);
    
    foundNum += 1;
    scoreNum += increment;
    foundElem.textContent = foundNum;
    scoreElem.textContent = scoreNum;
    }
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
        desk       = document.getElementById("desk");
    exitAnchor.textContent = "back to menu";
    exitAnchor.setAttribute("href", "./index.html");
    exitAnchor.setAttribute("id", "back");
    navElem.appendChild(exitAnchor);
    desk.appendChild(navElem);
}
