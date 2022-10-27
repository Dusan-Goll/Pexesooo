var firstCard,
    secondCard,
    lastAttempt = false;

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

    if (firstSource == secondSource) {  // cards are the same
        deleteCards();

        if (lastAttempt) {
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
        desk       = document.getElementById("desk");
    exitAnchor.textContent = "back to menu";
    exitAnchor.setAttribute("href", "./index.html");
    exitAnchor.setAttribute("id", "back");
    navElem.appendChild(exitAnchor);
    desk.appendChild(navElem);
}
