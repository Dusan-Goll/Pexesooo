class Setting {
  constructor() {
    this.settingsType = document.querySelector('.page-name').id;
    this.locStorItem;
    this.defaultValue;
    this.actualValue;
    this.actualButton;
    this.buttons;
    this.handleClick = this.handleClick.bind(this);
  }

  run() {
    this.getButtons();
    this.getValuesForLocalStorage();
    this.setActualValue();
    this.setActualButton();
    this.switchTo(this.actualButton);
    this.activateButtons();
  }

  getButtons() {
    if (this.settingsType === 'game-size') {
      this.buttons = Array.from(document.getElementsByClassName("size"));
    } else if (this.settingsType === 'num-of-players') {
      this.buttons = Array.from(document.getElementsByClassName("players-count"));
    }
  }

  getValuesForLocalStorage() {
    if (this.settingsType === 'game-size') {
      this.locStorItem = 'deckSize';
      this.defaultValue = 'medium';
    } else if (this.settingsType === 'num-of-players') {
      this.locStorItem = 'numOfPlayers';
      this.defaultValue = 2;
    }
  }

  setActualValue() {
    let valueFromStorage = localStorage.getItem(this.locStorItem);

    if (valueFromStorage) {
      this.actualValue = valueFromStorage;
    } else {
      this.actualValue = this.defaultValue;
      localStorage.setItem(this.locStorItem, this.defaultValue);
    }
  }

  setActualButton() {
    this.actualButton = this.buttons.find(button => (
      button.name == this.actualValue
    ));
  }

  switchTo(button) {
    this.getInnerCircle(button).setAttribute("fill", "var(--color-switchedOn)");
  }

  switchOff(button, colorName) {
    this.getInnerCircle(button).setAttribute("fill", `var(--color-${colorName})`);
  }

  getInnerCircle(button) {
    return button.querySelector('.inner');
  }

  activateButtons() {
    this.buttons.forEach(button => {
      button.addEventListener("click", this.handleClick);
    });
  }

  handleClick(e) {
    this.actualButton = e.currentTarget;
    this.switchTo(this.actualButton);
    this.actualValue = this.actualButton.name;
    localStorage.setItem(this.locStorItem, this.actualValue);
  
    let otherButtons = this.buttons.filter(otherButton => (
      otherButton !== this.actualButton
    ));

    otherButtons.forEach(otherButton => {
      let sizeName = otherButton.name;
      this.switchOff(otherButton, sizeName);
    });
  }
}

let settings = new Setting();

settings.run();
