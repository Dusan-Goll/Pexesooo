class GameEnd extends GamePrepare {
  constructor() {
    super();
    this.main = document.querySelector('main');
    this.stats;
    this.maxScore;
    this.winners;
    this.losers;
  }

  gameEnding() {
    this.removeVacants();
    this.getStats();
    this.getMaxScore();
    this.getWinnersAndLosers();
    this.showGameResult();
    this.highlightWinners();
    this.addExitButton();
  }

  removeVacants() {
    let vacants = this.desk.querySelectorAll('.vacant');
    vacants.forEach(vacant => vacant.remove());
  }

  
  getStats() {
    this.stats = Array();
    
    this.scoreBoxes.forEach(scoreBox => {
      let detail = {
        node: scoreBox,
        name: scoreBox.id,
        score: scoreBox.querySelector('.score').textContent,
      }
      this.stats.push(detail);
    });
  }

  getMaxScore() {
    this.maxScore = Math.max(...this.stats.map(detail => detail.score));
  }

  getWinnersAndLosers() {
    this.winners = this.stats.filter(detail => (
      detail.score == this.maxScore
    ));
    this.losers = this.stats.filter(detail => (
      detail.score != this.maxScore
    ));
  }

  showGameResult() {
    let result = document.createElement("p");
    result.setAttribute('class', 'result');
    
    if (this.winners.length === 1) {
      result.textContent = `Player ${this.winners[0].name} won.`;
    } else {
      let names = this.winners.map(detail => (
        detail.name
      ));

      result.textContent = `Players ${names.join(' & ')} won.`;
    }
    
    this.desk.appendChild(result);
  }

  highlightWinners() {
    this.winners.forEach(detail => {
      detail.node.setAttribute('class', 'score-box winner');
    });

    this.losers.forEach(detail => {
      detail.node.setAttribute('class', 'score-box loser');
    });
  }

  addExitButton() {
    let exitAnchor = document.createElement("a"),
        navElem    = document.createElement("nav");

    exitAnchor.textContent = "back to menu";
    exitAnchor.setAttribute("href", "./index.html");
    exitAnchor.setAttribute("id", "back-to-menu");

    navElem.appendChild(exitAnchor);
    this.desk.appendChild(navElem);
  }
}
