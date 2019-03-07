document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [ //'cells' should be an array.
    //each cell should be an object with a row, column, isMine flag, isMarked flag, hidden flag & # of surroundingMines.
    {row:0, col:0, isMine:false, isMarked: false, hidden:true}, {row:0, col:1, isMine:false, isMarked: false, hidden:true},
    {row:0, col:2, isMine:false, isMarked: false, hidden:true}, {row:0, col:3, isMine:false, isMarked: false, hidden:true},
    {row:0, col:4, isMine:false, isMarked: false, hidden:true}, {row:0, col:5, isMine:false, isMarked: false, hidden:true},

    {row:1, col:0, isMine:false, isMarked: false, hidden:true}, {row:1, col:1, isMine:false, isMarked: false, hidden:true},
    {row:1, col:2, isMine:false, isMarked: false, hidden:true}, {row:1, col:3, isMine:false, isMarked: false, hidden:true},
    {row:1, col:4, isMine:false, isMarked: false, hidden:true}, {row:1, col:5, isMine:false, isMarked: false, hidden:true},

    {row:2, col:0, isMine:false, isMarked: false, hidden:true}, {row:2, col:1, isMine:false, isMarked: false, hidden:true},
    {row:2, col:2, isMine:false, isMarked: false, hidden:true}, {row:2, col:3, isMine:false, isMarked: false, hidden:true},
    {row:2, col:4, isMine:false, isMarked: false, hidden:true}, {row:2, col:5, isMine:false, isMarked: false, hidden:true},

    {row:3, col:0, isMine:false, isMarked: false, hidden:true}, {row:3, col:1, isMine:false, isMarked: false, hidden:true},
    {row:3, col:2, isMine:false, isMarked: false, hidden:true}, {row:3, col:3, isMine:false, isMarked: false, hidden:true},
    {row:3, col:4, isMine:false, isMarked: false, hidden:true}, {row:3, col:5, isMine:false, isMarked: false, hidden:true},

    {row:4, col:0, isMine:false, isMarked: false, hidden:true}, {row:4, col:1, isMine:false, isMarked: false, hidden:true},
    {row:4, col:2, isMine:false, isMarked: false, hidden:true}, {row:4, col:3, isMine:false, isMarked: false, hidden:true},
    {row:4, col:4, isMine:false, isMarked: false, hidden:true}, {row:4, col:5, isMine:false, isMarked: false, hidden:true},

    {row:5, col:0, isMine:false, isMarked: false, hidden:true}, {row:5, col:1, isMine:false, isMarked: false, hidden:true},
    {row:5, col:2, isMine:false, isMarked: false, hidden:true}, {row:5, col:3, isMine:false, isMarked: false, hidden:true},
    {row:5, col:4, isMine:false, isMarked: false, hidden:true}, {row:5, col:5, isMine:false, isMarked: false, hidden:true}
  ]
};

function startGame () {
    // Optional: randomise the mine layout with a 20% chance of planting one. Enough for a decent challenge but not too many to crowd it out.
    // Needs separate loop to generate it, or the surroundingMines property will be messed up.
    for (c = 0;c < board.cells.length; c++) {
      if (Math.random() < .20) {
      board.cells[c].isMine = true;
      }
    }
    //board.cells[4].isMine = true;
    //board.cells[13].isMine = true;
  for (c = 0;c < board.cells.length; c++) { // Loop thru board cells.
    board.cells[c].surroundingMines = countSurroundingMines(board.cells[c]); // call countSurroundingMines & copy returned values into each cell's 'surroundingMines' object.
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Check if player has won if all the magic squares have been clicked. 
document.addEventListener("click", checkForWin); // Left-click mouse triggers checkForWin.
document.addEventListener("contextMenu", checkForWin) //Right-click detect.

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  //var allUncovered = false;
  //var allMarked = false;
  var numAllMines = 0;
  var numMarkedMines = 0;
  for (chk = 0; chk < board.cells.length; chk++) { // Iterate thru board cells.
    if (board.cells[chk].isMine === true) { // Increment # of all mines if there's a mine.
      numAllMines ++;
    }
    if (board.cells[chk].isMine === true && board.cells[chk].isMarked === true) { // Increment # of marked mines if there's a mine & it's marked.
      numMarkedMines ++;
    }
    if (board.cells[chk].isMine === false  && board.cells[chk].hidden === true){ // Return if there's no mine & square is hidden.
      return;
    }
    /*if (board.cells[chk].isMine === false && board.cells[chk].hidden === true){
      return;
    } else {allUncovered == true;}
    if (board.cells[chk].isMine === true && board.cells[chk].isMarked === false){
      return;
    } else {allMarked == true;}*/
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //if (allUncovered === true && allMarked === true){
    if (numMarkedMines === numAllMines) {
      var soundWin = document.querySelector(".soundWin");
      soundWin.play();
      lib.displayMessage('You win!');
    } else {return;}
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
  var numSurround = 0; // define variable for # of surrounding mines.
  var surrounding = lib.getSurroundingCells(cell.row, cell.col); // call getSurroundingCells & copy it into 'surrounding'.
  for (var c = 0; c < surrounding.length; c++) { // Loop thru incoming cells.
    if (surrounding[c].isMine === true) { // Increment 'numSurround' if adjacent mines detected.
      numSurround++;
    }
  }
  return numSurround;
}

/*function generateCells(row,col) {
  for (var c = 0; c < 36; c++) {
    board.cells[c].row == c;
    board.cells[c].isMine == false;
    board.cells[c].isMarked == false;
    board.cells[c].hidden == true;
  }
}*/
