// check current setting in Local Storage 
var gSize = localStorage.getItem("sizeClass");

if ( ! gSize ) {
    gSize = "medium";
}

localStorage.setItem("sizeClass", gSize);

// buttons variables
var sizeButtonsList  = document.getElementsByClassName("size"),
    smallButton  = sizeButtonsList[0],
    mediumButton = sizeButtonsList[1],
    largeButton  = sizeButtonsList[2];

// default setting to MEDIUM
switchTo(mediumButton);

// switching buttons
var sizeButtons = Array.prototype.slice.call(sizeButtonsList);

sizeButtons.forEach(sizeButton => {
    sizeButton.addEventListener("click", function() {
        switchTo(sizeButton);
        let otherButtons = _.without(sizeButtons, sizeButton);

        otherButtons.forEach(otherButton => {
            let sizeName = otherButton.lastElementChild.textContent;
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



// have a REST, take a BREAK,
// happiness & sense of acceptance of your childern
// is one of the highest priority