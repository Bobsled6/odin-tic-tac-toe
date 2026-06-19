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

    playerOneName.addEventListener('change', () => player1.name = playerOneName.value)
    playerTwoName.addEventListener('change', () => player2.name = playerTwoName.value)

    return [player1, player2]
};

function gameflow() {
     const player1Marker = players()[0].marker;
     const player2Marker = players()[1].marker;
     let currentBoard = Gameboard();
     let mergedBoardArray = [];
     const boardSpace = document.querySelectorAll(".cell");
     const restartButton = document.getElementById("restartButton");
     const winAlert = document.getElementById("winAlert");
     let controller = new AbortController();
     addClickEvents();


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
        }
        else if(playerTurn === 2) {
            currentBoard[row][column] = player2Marker;
        }
        winCheck();
        turnCheck();
        console.log(currentBoard);
        return currentBoard;
    }
    
    function winCheck() {
        let board = currentBoard;
        let mergedBoardArray = currentBoard[0].concat(currentBoard[1],currentBoard[2]);
        let filteredArray = mergedBoardArray.filter(filterMarked);
        let playerOneCurrentName  = players()[0].name;
        let playerTwoCurrentName = players()[1].name;
    if(
        (board[0][0] === board[0][1] && board[0][0] === board[0][2] && !(board[0][0] === 0))
    ||  (board[1][0] === board[1][1] && board[1][0] === board[1][2] && !(board[1][0] === 0))
    ||  (board[2][0] === board[2][1] && board[2][0] === board[2][2] && !(board[2][0] === 0))
    ||  (board[0][0] === board[1][0] && board[0][0] === board[2][0] && !(board[0][0] === 0))
    ||  (board[0][1] === board[1][1] && board[0][1] === board[2][1] && !(board[0][1] === 0))
    ||  (board[0][2] === board[1][2] && board[0][2] === board[2][2] && !(board[0][2] === 0))
    ||  (board[0][0] === board[1][1] && board[0][0] === board[2][2] && !(board[0][0] === 0))
    ||  (board[0][2] === board[1][1] && board[0][2] === board[2][0] && !(board[0][2] === 0))) {
            if (playerTurn === 1) {winAlert.innerHTML = playerOneCurrentName + " Wins", controller.abort()}
                else{winAlert.innerHTML = playerTwoCurrentName + " Wins", controller.abort()}
            
            }
    else if (filteredArray.length === 0) {
        winAlert.innerHTML = "Tie", controller.abort();
    }
        } 

    function addClickEvents() {
        
        restartButton.addEventListener('click', () => {
            clearBoard();
            controller = new AbortController();
            boardClickEvents();
            winAlert.innerHTML = "";
        })

        boardClickEvents();

        function boardClickEvents () {for(let i = 0; i < boardSpace.length; i++) {
            let number = i;
            idCell(number);
            boardSpace[i].addEventListener('click', () => {
                if (boardSpace[i].innerHTML === "") {
                    if(turnCheck() === 1) {
                        boardSpace[i].innerHTML = "X"}
                    else if (turnCheck() === 2){
                        boardSpace[i].innerHTML = "O"}
                markCell(idCell(number).row , idCell(number).column);
            }}, {signal: controller.signal})}}}

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
        for(let i = 0; i < boardSpace.length; i++) {
            boardSpace[i].innerHTML = "";
        }
        return currentBoard = Gameboard();
    }


}



players();
gameflow();
