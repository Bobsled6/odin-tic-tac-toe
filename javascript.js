function gameboard() {
    let gameboardArr = [];
    let a1 = {space: "a1", value: ""};
    let a2 = {space: "a2", value: ""};
    let a3 = {space: "a3", value: ""};
    let b1 = {space: "b1", value: ""};
    let b2 = {space: "b2", value: ""};
    let b3 = {space: "b3", value: ""};
    let c1 = {space: "c1", value: ""};
    let c2 = {space: "c2", value: ""};
    let c3 = {space: "c3", value: ""};
    gameboardArr.push(a1,a2,a3,b1,b2,b3,c1,c2,c3);
    console.log(gameboardArr);

}

function players() {
    function newPlayer(name, marker) {
        const playerObject = {name, marker}
        return playerObject
    }

    const player1 = newPlayer("jim", "X")
    const player2 = newPlayer("jill", "O")
    console.log(player1, player2);
}

function gameflow() {
    
}

players();
gameboard();
