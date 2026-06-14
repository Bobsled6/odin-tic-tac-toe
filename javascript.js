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
     let currentBoard = Gameboard();
     let mergedBoardArray = [];


    function turnCheck() {
        
        function filterMarked(cell) {
            return cell === 0;
        };
        let mergedBoardArray = currentBoard[0].concat(currentBoard[1],currentBoard[2]);
        let filteredArray = mergedBoardArray.filter(filterMarked);
        if (filteredArray.length % 2 === 0) {
            return playerTurn = 2}
        else {
            return playerTurn = 1}
    
    };
      
    function markCell (row,column) {
      
        const player1Marker = players()[0].marker;
        const player2Marker = players()[1].marker;
        turnCheck();
        if (playerTurn === 1) {
            currentBoard[row][column] = player1Marker;
        }
        else if(playerTurn === 2) {
            currentBoard[row][column] = player2Marker;
        }
        winCheck();
        console.log(currentBoard)
        return currentBoard;
    }
    function winCheck() {
        let board = currentBoard;
    if(
        (board[0][0] === board[0][1] && board[0][0] === board[0][2] && !(board[0][0] === 0))
    ||  (board[1][0] === board[1][1] && board[1][0] === board[1][2] && !(board[1][0] === 0))
    ||  (board[2][0] === board[2][1] && board[2][0] === board[2][2] && !(board[2][0] === 0))
    ||  (board[0][0] === board[1][0] && board[0][0] === board[2][0] && !(board[0][0] === 0))
    ||  (board[0][1] === board[1][1] && board[0][1] === board[2][1] && !(board[0][1] === 0))
    ||  (board[0][2] === board[1][2] && board[0][2] === board[2][2] && !(board[0][2] === 0))
    ||  (board[0][0] === board[1][1] && board[0][0] === board[2][2] && !(board[0][0] === 0))
    ||  (board[0][2] === board[1][1] && board[0][2] === board[2][0] && !(board[0][2] === 0))) {
            if (playerTurn === 1) {console.log("Player 1 Wins")}
                else{console.log("Player 2 Wins")}
            }
        } 
}
players();
gameflow();
