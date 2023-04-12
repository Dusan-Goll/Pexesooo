class GameRun extends GamePrepare {
  constructor() {
    super();
    this.firstCard  = 'unflipped';
    this.secondCard = 'unflipped';
    this.colors = ["Blue", "Red", "Green", "Yellow"];
    this.players = this.colors.slice(0, this.playersNumber);
    this.actualPlayer = this.players[0];

    this.handleClick = this.handleClick.bind(this);
  }

  activate() {
    this.deck.forEach(card => this.addListenerTo(card));
  }

  addListenerTo(card) {
    card.addEventListener('click', this.handleClick);
  }

  removeListenerFrom(card) {
    card.removeEventListener('click', this.handleClick);
  }

  handleClick(e) {
    this.flip(e.target);
  }

  flip(card) {
    if (this.firstCard === 'unflipped') {
        this.firstCard = card;
        this.showCardBack(this.firstCard);
        this.disableClick(this.firstCard);
    } else if (this.secondCard === 'unflipped') {
        this.secondCard = card;
        this.showCardBack(this.secondCard);
        this.enableClick(this.firstCard);
        this.shine(this.firstCard);
        this.shine(this.secondCard);

        this.otherCards().forEach(anotherCard => {
            this.disableClick(anotherCard);
        });
    } else {  // both cards flipped
        this.compare(this.firstCard, this.secondCard);
    };

    if (this.isEmptyDesk()) {
        this.endGameView()
    };
  }

  showCardBack(card) {
    card.querySelector('img').setAttribute('class', 'card-back-visible');
  }

  showCardFront(card) {
    card.querySelector('img').setAttribute('class', 'card-back-hidden');
  }

  disableClick(card) {
    this.removeListenerFrom(card);
  }

  enableClick(card) {
    this.addListenerTo(card);
  }

  shine(card) {
    card.querySelector('img').setAttribute("class", "card-back-visible shining");
  }

  otherCards() {
    let allCards = Array.prototype.slice.call(this.deck);
    let filteredCards = allCards.filter(card => (
      card !== this.firstCard && card !== this.secondCard
    ));
    return filteredCards;
  }

  compare(card_1, card_2) {
    let picture_1 = card_1.querySelector('img').getAttribute("src");
    let picture_2 = card_2.querySelector('img').getAttribute("src");

    if (picture_1 == picture_2) {
        this.discard();
        this.increaseScoreTo(this.actualPlayer);

    } else {  // cards are different
        this.flipBack();
        this.nextPlayer();
    }

    this.otherCards().forEach(anotherCard => {
        this.enableClick(anotherCard);
    });

    this.firstCard = this.secondCard = 'unflipped';
  }

  discard() {
    this.deck = this.otherCards();
    this.vacantize(this.firstCard);
    this.vacantize(this.secondCard);
  }

  vacantize(card) {
    let vacant = document.createElement('div');
    vacant.setAttribute('class', 'vacant');
    card.replaceWith(vacant);
  }

  increaseScoreTo(player) {
    let playerScoreBox = this.scoreBoxes.find(scoreBox => (
      scoreBox.id === player
    ));
    let scoreRow = playerScoreBox.querySelector('p'),
        score = Number(scoreRow.textContent);
    
    score += 1;
    scoreRow.textContent = score;
  }

  flipBack() {
    this.showCardFront(this.firstCard);
    this.showCardFront(this.secondCard);
  }

  nextPlayer() {
    let actualIndex = this.players.indexOf(this.actualPlayer);

    if (actualIndex < (this.players.length - 1)) {
      this.actualPlayer = this.players[actualIndex + 1];
    } else {
      this.actualPlayer = this.players[0];
    }
    
    this.switchScoreBoxTo(this.actualPlayer);
  }

  switchScoreBoxTo(player) {
    let scoreBarCSSLink = document.getElementById("scoreBarCSS");
    scoreBarCSSLink.setAttribute("href", `./css/highlight${player}.css`);
  }

  isEmptyDesk() {
    return this.cardsOnTheDesk() == 0;
  }

  cardsOnTheDesk() {
    return this.desk.getElementsByClassName('card').length;
  }
}

let game = new GameRun();

game.prepare();
game.activate();