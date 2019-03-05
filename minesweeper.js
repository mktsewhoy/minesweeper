document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [ //'cells' should be an array.
    //each cell should be an object with a row, column, isMine flag, isMarked flag, hidden flag & # of surroundingMines.
    {row:0, col:0, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:0, col:1, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},
    {row:0, col:2, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:0, col:3, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},
    {row:0, col:4, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:0, col:5, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},

    {row:1, col:0, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:1, col:1, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},
    {row:1, col:2, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:1, col:3, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},
    {row:1, col:4, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:1, col:5, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},

    {row:2, col:0, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:2, col:1, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},
    {row:2, col:2, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:2, col:3, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},
    {row:2, col:4, isMine:true, isMarked: false, hidden:true, surroundingMines: 0}, {row:2, col:5, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},

    {row:3, col:0, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:3, col:1, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},
    {row:3, col:2, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:3, col:3, isMine:true, isMarked: false, hidden:true, surroundingMines: 0},
    {row:3, col:4, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:3, col:5, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},

    {row:4, col:0, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:4, col:1, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},
    {row:4, col:2, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:4, col:3, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},
    {row:4, col:4, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:4, col:5, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},

    {row:5, col:0, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:5, col:1, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},
    {row:5, col:2, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:5, col:3, isMine:false, isMarked: false, hidden:true, surroundingMines: 0},
    {row:5, col:4, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}, {row:5, col:5, isMine:false, isMarked: false, hidden:true, surroundingMines: 0}
  ]
};

function startGame () {
   for (c = 0;c < board.cells.length; c++) { // Loop thru board.
    board.cells[c].surroundingMines == countSurroundingMines(board.cells[c]); // call countSurroundingMines & copy returned values into board's surroundingMines object.
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Check if player has won if all the magic squares have been clicked. 
document.addEventListener("click", checkForWin);

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  var allUncovered = false;
  var allMarked = false;
  for (chk = 0; chk < board.cells.length; chk++){
    if (board.cells[chk].isMine === false && board.cells[chk].hidden === true){
      return;
    } else {allUncovered == true;}
    if (board.cells[chk].isMine === true && board.cells[chk].isMarked === false){
      return;
    } else {allMarked == true;}
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  if (allUncovered === true && allMarked === true){
     lib.displayMessage('You win!');
  }
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var numSurround = 0; // define # of surrounding mines.
  var surrounding = lib.getSurroundingCells(cell.row, cell.col); // call getSurroundingCells & copy it into 'surrounding'.
  for (var c = 0; c < surrounding.length; c++) { // Loop thru incoming cells.
    if (surrounding[c].isMine === true) { // Increment numSurround if adjacent mines detected.
      numSurround++;
    }
  }
  return numSurround;
}

