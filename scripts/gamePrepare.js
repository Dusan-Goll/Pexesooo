class GamePrepare {
  constructor() {
    this.desk = document.getElementById('desk');
    this.sizeSetting = localStorage.getItem('deckSize') || medium;
    this.playersNumber = localStorage.getItem('numOfPlayers') || 2;
    this.pictures = picturesPaths;
    this.scoreBoxes;
    this.deck;
  }

  prepare() {
    this.reducePlayers();
    this.preparePictures();
    this.createDeck();
  }

  reducePlayers() {
    let scoreBoxesCollection = document.getElementsByClassName('score-box');
    this.scoreBoxes = Array.prototype.slice.call(scoreBoxesCollection);
    let playersCount = Number(this.playersNumber);

    if (playersCount === 4) {
      return;
    } else if (playersCount == 3) {
      this.scoreBoxes.pop().remove();
    } else if (playersCount == 2) {
      this.scoreBoxes.pop().remove();
      this.scoreBoxes.pop().remove();
    }
  }

  preparePictures() {
    this.shuffle(this.pictures);
    this.reduceToHalf(this.pictures);
    this.double(this.pictures);
    this.shuffle(this.pictures);
  }

  createDeck() {
    let cardsCount = this.getNumberOfCards();
    let pictures = this.pictures;
    this.deck = [];

    for (let i = 0; i < cardsCount; i++) {
      let card = this.createCard(i, pictures[i]);
      this.desk.appendChild(card);

      this.deck.push(card);
    }
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    this.pictures = array;
  }

  reduceToHalf(array) {
    let cardsCount = this.getNumberOfCards()
    array = array.slice(0, cardsCount/2);

    this.pictures = array;
  }

  double(array) {
    let doubledPictures = [];
    array.forEach(picture => {
      doubledPictures.push(picture);
      doubledPictures.push(picture);
    });
    array = doubledPictures;

    this.pictures = array;
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
  
  createCard(i, src) {
    let card = document.createElement('button');
    card.setAttribute('id', `card-${i}`);
    card.setAttribute('class', 'card');

    let back = document.createElement('img');
    back.setAttribute('class', 'card-back-hidden');
    back.setAttribute('src', src);

    card.appendChild(back);
    
    return card;
  }
}
  