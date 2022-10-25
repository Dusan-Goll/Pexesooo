// check current setting in Local Storage 
var gSize = getSizeClass();

if ( ! gSize ) {
    gSize = "medium";
    localStorage.setItem("sizeClass", gSize);
}

function getSizeClass() {
    return localStorage.getItem("sizeClass");
}

// buttons variables
var sizeButtonsList = document.getElementsByClassName("size"),
    sizeButtons = Array.prototype.slice.call(sizeButtonsList);

    smallButton  = sizeButtonsList[0],
    mediumButton = sizeButtonsList[1],
    largeButton  = sizeButtonsList[2];

// actual size setting
let actualButton = getActualButton();
switchTo(actualButton);

function getActualButton() {
    for (const sizeButton of sizeButtons) {
        let iterName = getSizeNameOf(sizeButton);

        if (iterName === getSizeClass()) {
            return sizeButton;
        }
    };
}

// switching buttons
sizeButtons.forEach(sizeButton => {
    sizeButton.addEventListener("click", function() {
        switchTo(sizeButton);
        localStorage.setItem("sizeClass", getSizeNameOf(sizeButton));

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



// have a REST, take a BREAK,
// happiness & sense of acceptance of your childern
// is one of the highest priority