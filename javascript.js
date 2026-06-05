function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
    for (let j = 0; j < columns; j++) {
     board[i].push(Cell());
     }
    }

    const getBoard = () => board;


    function Cell() {
        let value = 0;
        return value;
    }
    console.log(board)
    return board;
}


function players() {
    function newPlayer(name, marker) {
        const playerObject = {name, marker}
        return playerObject
    }

    const player1 = newPlayer("jim", "X");
    const player2 = newPlayer("jill", "O");
    return [player1, player2]
};

function gameflow() {


     const player1Marker = players()[0].marker;
     const player2Marker = players()[1].marker;
      
    function markCell (row,column,player) {
      const player1Marker = players()[0].marker;
      const player2Marker = players()[1].marker;
      let playerMarker;
      if (player === 1){playerMarker = player1Marker}
      else if(player === 2){playerMarker = player2Marker}
      
      let cellValue = playerMarker;
      Gameboard()[row][column] = cellValue;
    
    }
    markCell(0,2,2)

};




players();
gameflow();