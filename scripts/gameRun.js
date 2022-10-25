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
