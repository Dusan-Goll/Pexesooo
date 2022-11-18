// check/default current setting in Local Storage 
var actualPlayersCount = getPlayersCount() || 2;
switchPlayersCountTo(actualPlayersCount);
greenify(actualPlayersCount);

function getPlayersCount() {
    return localStorage.getItem("numOfPlayers");
}

function switchPlayersCountTo(num) {
    localStorage.setItem("numOfPlayers", num);
}

function greenify(number) {
    let playersCountCSSLink = document.getElementById("playersCountCSS"),
        path = "./css/playersCount/Players_";
    playersCountCSSLink.setAttribute("href", `${path}${number}.css`);
}

// switching buttons
var playersCountButtons = document.getElementsByClassName("numPlayers");
playersCountButtons = Array.prototype.slice.call(playersCountButtons);

playersCountButtons.forEach(countButton => {
    countButton.addEventListener("click", function() {
        let numb = countButton.id.split("count")[1];
        greenify(numb);
        switchPlayersCountTo(numb)
    })
});
