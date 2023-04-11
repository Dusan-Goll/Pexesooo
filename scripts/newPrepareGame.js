class Game {
  constructor() {
    this.desk = document.getElementById('desk');
    this.scoreBoxesCollection = document.getElementsByClassName('score-box');
    this.sizeSetting = localStorage.getItem('deckSize') || medium;
    this.playersNumber = localStorage.getItem('numOfPlayers') || 2;
  }

  prepare() {
    this.reducePlayers();
    this.createDeck();
  }

  reducePlayers() {
    let scoreBoxes = Array.prototype.slice.call(this.scoreBoxesCollection);
    let playersCount = this.playersNumber;

    if (playersCount === 4) {
      return;
    } else if (playersCount === 3) {
      scoreBoxes.pop().remove();
    } else if (playersCount === 2) {
      scoreBoxes.pop().remove();
      scoreBoxes.pop().remove();
    }
  }

  getNumberOfCards() {
    let numberOfCards;
    let size = this.sizeSetting;

    if (size === "small") {
      numberOfCards = 12;
    } else if (size === "medium") {
      numberOfCards = 20;
    } else if (size === "large") {
      numberOfCards = 30;
    }

    return numberOfCards;
  }

  createDeck() {
    let cardsCount = this.getNumberOfCards();
    // this.deck = []; // ???

    for (let i = 0; i < cardsCount; i++) {
      let card = this.createButton(i);
      this.desk.appendChild(card);

      // this.deck.push(card); // ???
    }
  }
  
  createButton(i) {
    let button = document.createElement('button');
     // pozdeji zmenit card-- na card-
    button.setAttribute('id', `card--${i}`);
    button.addEventListener('click', () => this.vacantize(button));
    return button;
  }

  turnOverCard() {
    // some code
  }

  vacantize(elem) {
    let vacant = document.createElement('div');
    vacant.setAttribute('class', 'vacant');
    elem.replaceWith(vacant);
  }
}

let game = new Game();

game.prepare();
