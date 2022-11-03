function endGameView() {
    removeSectionEl();
    gameResult();
    highlightWinners();
    desaturateLosers();
    addExitButton();
};

function removeSectionEl() {
    let section = document.querySelector("section");
    section.remove();
}

function getScoreBoxes() {
    let scoreBoxes = document.getElementsByClassName("scoreBox");
    return Array.prototype.slice.call(scoreBoxes);
}

function winningPlayers() {
    let stats = Object();
    
    for (const scoreBox of getScoreBoxes()) {
        let playerColor = scoreBox.getAttribute("id"),
            playerScore = Number(scoreBox.lastElementChild.textContent);
        stats[playerColor] = playerScore;
    }

    const bestScore = Math.max(...Object.values(stats));
    const players = Object.keys(stats);
    return players.filter(player => stats[player] === bestScore);
}

function gameResult() {
    let winners    = winningPlayers(),
        resultElem = document.createElement("p");
    
    if (winners.length === 1) {
        resultElem.textContent = `Player ${winners} won.`;
    } else {
        resultElem.textContent = `Players ${winners.join(" & ")} won.`;
    }
    
    desk.appendChild(resultElem);
}

function winScoreBoxes() {
    let thoseWhoWon = Array();
    winningPlayers().forEach(player => {
        let scoreBox = document.getElementById(player);
        thoseWhoWon.push(scoreBox);
    });
    return thoseWhoWon;
}

function loseScoreBoxes() {
    return _.difference(getScoreBoxes(), winScoreBoxes());
}

function highlightWinners() {
    winScoreBoxes().forEach(scoreBox => {
    scoreBox.style.filter = "brightness(1.3)";
    scoreBox.style.boxShadow = "0rem 0rem 3rem 1.5rem rgb(185, 157, 86)";
    })
}
    
function desaturateLosers() {
    loseScoreBoxes().forEach(scoreBox => {
        scoreBox.style.filter = "saturate(0.1)";
        scoreBox.style.boxShadow = "none";
    });
}

function addExitButton() {
    let exitAnchor = document.createElement("a"),
        navElem    = document.createElement("nav");

    exitAnchor.textContent = "back to menu";
    exitAnchor.setAttribute("href", "./index.html");
    exitAnchor.setAttribute("id", "back");

    navElem.appendChild(exitAnchor);
    desk.appendChild(navElem);
}
