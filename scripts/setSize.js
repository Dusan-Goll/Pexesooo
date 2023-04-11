// check current setting in Local Storage 
var gameSize = getGameSize();

if ( ! gameSize ) {
    gameSize = "medium";
    localStorage.setItem("deckSize", gameSize);
}

function getGameSize() {
    return localStorage.getItem("deckSize");
}

// buttons variables
var sizeButtonsList = document.getElementsByClassName("size"),
    sizeButtons = Array.prototype.slice.call(sizeButtonsList);

// actual size setting
let actualButton = getActualButton();
switchTo(actualButton);

function getActualButton() {
    for (const sizeButton of sizeButtons) {
        let iterName = getSizeNameOf(sizeButton);

        if (iterName === getGameSize()) {
            return sizeButton;
        }
    };
}

// switching buttons
sizeButtons.forEach(sizeButton => {
    sizeButton.addEventListener("click", function() {
        switchTo(sizeButton);
        localStorage.setItem("deckSize", getSizeNameOf(sizeButton));

        let otherButtons = _.without(sizeButtons, sizeButton);

        otherButtons.forEach(otherButton => {
            let sizeName = getSizeNameOf(otherButton);
            switchOff(otherButton, sizeName);
        });
    })
});

function switchTo(thisButton) {
    getInnerCircle(thisButton).setAttribute("fill", "var(--color-switchedOn)");
}

function switchOff(thisButton, colorName) {
    getInnerCircle(thisButton).setAttribute("fill", `var(--color-${colorName})`);
}

function getInnerCircle(_thisButton) {
    let svgElem = _thisButton.firstElementChild;
    return svgElem.firstElementChild.nextElementSibling;
}

function getSizeNameOf(thisButton) {
    return thisButton.lastElementChild.textContent;
}
