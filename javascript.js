function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
    for (let j = 0; j < columns; j++) {
     board[i].push(Cell());
    }}

    function Cell() {
        let value = 0;
        return value;
    }

    return board;
    
}


function players() {
    const playerOneName = document.getElementById("playerOneName");
    const playerTwoName = document.getElementById("playerTwoName");
    const playerNameTextBox = document.querySelectorAll(".playerNameBox");

    playerOneName.addEventListener('blur', () => {
        if (playerOneName.value === "") {
            playerOneName.value = "Player 1";
        } 
    });

   playerTwoName.addEventListener('blur', () => {
        if (playerTwoName.value === "") {
            playerTwoName.value = "Player 2";
        } 
    });
    
    playerNameTextBox.forEach(function(element) {
        
        element.addEventListener('keydown', function(event) {
          if(event.key === "Enter") {
            event.preventDefault();
            element.blur();
          };
        })
        
        element.addEventListener('blur', function() {
            element.value = element.value.replace(/\&nbsp;/g, '')
            element.value = element.value.trim();
        })
    }) 


    function newPlayer(name, marker) {
        const playerObject = { name , marker}
        return playerObject;
    }


    const player1 = newPlayer( playerOneName.value , "X");
    const player2 = newPlayer( playerTwoName.value, "O");

    playerOneName.addEventListener('change', () => player1.name = playerOneName.value);
    playerTwoName.addEventListener('change', () => player2.name = playerTwoName.value);

    return [player1, player2];
};

function gameflow() {
     const player1Marker = players()[0].marker;
     const player2Marker = players()[1].marker;
     const oMarker = document.getElementById("oMarker");
     const xMarker = document.getElementById("xMarker");
     let currentBoard = Gameboard();
     let mergedBoardArray = [];
     const boardSpace = document.querySelectorAll(".cell");
     const restartButton = document.getElementById("restartButton");
     const winAlert = document.getElementById("winAlert");
     let controller = new AbortController();
     addClickEvents();
     turnCheck();


    function filterMarked(cell) {
            return cell === 0;
        };
    
    function turnCheck() {
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
            xMarker.setAttribute('style', 'color: white');
            oMarker.setAttribute('style', 'color: red');
        }
        else if(playerTurn === 2) {
            currentBoard[row][column] = player2Marker;
            oMarker.setAttribute('style', 'color: white');
            xMarker.setAttribute('style', 'color: blue');
        }
        winCheck();
        turnCheck();
        return currentBoard;
    }
    
    function winCheck() {
        let board = currentBoard;
        let mergedBoardArray = currentBoard[0].concat(currentBoard[1],currentBoard[2]);
        let filteredArray = mergedBoardArray.filter(filterMarked);
        let playerOneCurrentName  = players()[0].name;
        let playerTwoCurrentName = players()[1].name;
        const playerOneScore = document.getElementById("playerOneScoreCount");
        const playerTwoScore = document.getElementById("playerTwoScoreCount");
        const resetScore = document.getElementById("resetScore");
        let currentPlayerOneScore = parseInt(playerOneScore.innerHTML);
        let currentPlayerTwoScore = parseInt(playerTwoScore.innerHTML);
        if(
                (board[0][0] === board[0][1] && board[0][0] === board[0][2] && !(board[0][0] === 0))
            ||  (board[1][0] === board[1][1] && board[1][0] === board[1][2] && !(board[1][0] === 0))
            ||  (board[2][0] === board[2][1] && board[2][0] === board[2][2] && !(board[2][0] === 0))
            ||  (board[0][0] === board[1][0] && board[0][0] === board[2][0] && !(board[0][0] === 0))
            ||  (board[0][1] === board[1][1] && board[0][1] === board[2][1] && !(board[0][1] === 0))
            ||  (board[0][2] === board[1][2] && board[0][2] === board[2][2] && !(board[0][2] === 0))
            ||  (board[0][0] === board[1][1] && board[0][0] === board[2][2] && !(board[0][0] === 0))
            ||  (board[0][2] === board[1][1] && board[0][2] === board[2][0] && !(board[0][2] === 0))) {
                if (playerTurn === 1) {
                    winner.innerHTML = "Winner!", 
                    winnerName.innerHTML = playerOneCurrentName + " (" + players()[0].marker + ")",
                    winnerName.setAttribute('style', 'color: blue'),
                    xMarker.setAttribute('style', 'color: blue'),
                    oMarker.setAttribute('style', 'color: red'),
                    currentPlayerOneScore++,
                    playerOneScore.innerHTML = currentPlayerOneScore,
                    controller.abort()}
                else{
                    winner.innerHTML = "Winner!",
                    winnerName.innerHTML = playerTwoCurrentName + " (" + players()[1].marker + ")",
                    winnerName.setAttribute('style', 'color: red'),
                    xMarker.setAttribute('style', 'color:blue'),
                    oMarker.setAttribute('style', 'color:red'),
                    currentPlayerTwoScore++,
                    playerTwoScore.innerHTML = currentPlayerOneScore,
                    controller.abort()}
                
                }
        else if (
                filteredArray.length === 0) {
                xMarker.setAttribute('style', 'color: blue'),
                oMarker.setAttribute('style', 'color: red'),
                winner.innerHTML = "Tie", controller.abort();
                }

        resetScore.addEventListener('click', () => {
            currentPlayerOneScore = 0;
            currentPlayerTwoScore = 0;
            playerOneScore.innerHTML = currentPlayerOneScore;
            playerTwoScore.innerHTML = currentPlayerTwoScore;
        })
    } 

    function addClickEvents() {
        
        restartButton.addEventListener('click', () => {
            clearBoard();
            controller = new AbortController();
            boardClickEvents();
            winner.innerHTML = "";
            winnerName.innerHTML = "";
        })

        boardClickEvents();

        function boardClickEvents () {
            for(let i = 0; i < boardSpace.length; i++) {
                let number = i;
                idCell(number);
                boardSpace[i].addEventListener('click', () => {
                    if (boardSpace[i].innerHTML === "") {
                        if(turnCheck() === 1) {
                            boardSpace[i].innerHTML = "X",
                            boardSpace[i].setAttribute('style', 'color:blue')}
                        else if (turnCheck() === 2){
                            boardSpace[i].innerHTML = "O",
                            boardSpace[i].setAttribute('style', 'color: red')}
                        markCell(idCell(number).row , idCell(number).column);
                }},{signal: controller.signal})
            }
        }
    }

    function idCell(i) {
        if (i <= 2) {
            const cellIdentifier = {row: "0" , column: i}; return cellIdentifier}
        else if (i <= 5) {
            const cellIdentifier = {row: "1" , column: i - 3}; return cellIdentifier}
        else if(i <= 8) {
            const cellIdentifier = {row: "2" , column: i - 6}; return cellIdentifier}
    }


    function clearBoard() {
        controller.abort();
        xMarker.setAttribute('style', 'color:blue');
        oMarker.setAttribute('style', 'color:white');
        for(let i = 0; i < boardSpace.length; i++) {
            boardSpace[i].innerHTML = "";
        }
        return currentBoard = Gameboard();
    }


}



players();
gameflow();
