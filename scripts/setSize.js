class SizeSetter {
  constructor() {
    this.actualSize;
    this.actualButton;
    this.sizeButtons = Array.from(document.getElementsByClassName("size"));
    this.handleClick = this.handleClick.bind(this);
  }

  run() {
    this.setActualSize();
    this.setActualButton();
    this.switchTo(this.actualButton);
    this.activateButtons();
  }

  setActualSize() {
    let valueFromStorage = localStorage.getItem("deckSize");

    if (valueFromStorage) {
      this.actualSize = valueFromStorage;
    } else {
      let defaultValue = 'medium';
      this.actualSize = defaultValue;
      localStorage.setItem('deckSize', defaultValue);
    }
  }

  setActualButton() {
    this.actualButton = this.sizeButtons.find(button => (
      button.name === this.actualSize
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
    this.sizeButtons.forEach(button => {
      button.addEventListener("click", this.handleClick);
    });
  }

  handleClick(e) {
    this.actualButton = e.currentTarget;
    this.switchTo(this.actualButton);
    this.actualSize = this.actualButton.name;
    localStorage.setItem("deckSize", this.actualSize);
  
    let otherButtons = this.sizeButtons.filter(otherButton => (
      otherButton !== this.actualButton
    ));

    otherButtons.forEach(otherButton => {
      let sizeName = otherButton.name;
      this.switchOff(otherButton, sizeName);
    });
  }
}

let sizeSetter = new SizeSetter();

sizeSetter.run();
