
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let playground = document.getElementById('PG');

// grid size
let columnsCount = 8;
let rowsCount = 5;

// grid limits
if (columnsCount > 8) {
    columnsCount = 8
}
if (rowsCount > 5) {
    rowsCount = 5
}

// grid construction
playground.style.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`;
playground.style.gridTemplateRows = `repeat(${rowsCount}, 1fr)`;

// create places for cards with id
for (let i = 0; i < rowsCount; i++) {
    for (let j = 1; j < (columnsCount + 1); j++) {
        var vrite = document.write(
        '<p id=' + letters[i] + j + '></p>'
        );
    }
}