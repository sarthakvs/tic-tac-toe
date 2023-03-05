const statusDisplay=document.querySelector('.game--status');
let gameActive=true;
let currentPlayer="X";
let gameState=["","","","","","","","",""];
const winMessage=()=> `Player ${currentPlayer} has WON! Congralutions!!!`;
const drawMessage=()=>`Game Ended with a draw!`;
const currentPlayerTurn=()=>`It's ${currentPlayer}'s turn`;
statusDisplay.innerHTML=currentPlayerTurn();

function handleCellPlayed(clickedCell,clickedCellIndex){
    gameState[clickedCellIndex]=currentPlayer;
    clickedCell.innerHTML=currentPlayer;
}

function handlePlayerChange(){
    currentPlayer=currentPlayer==="X"? "0" : "X";
    statusDisplay.innerHTML=currentPlayerTurn();

}
const winningCondition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function handleResultValidation(event){
    let roundWon=false;
    for(let i=0;i<=7;i++){
        const winCondition = winningCondition[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if(a===''|| b==='' || c==='') continue;
        if(a===b && b===c){
            roundWon=true;
            break;
        }
    }
    if(roundWon){
        statusDisplay.innerHTML=winMessage();
        gameActive=false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if(roundDraw){
        statusDisplay.innerHTML=drawMessage();
        gameActive=false;
        return;
    }
    handlePlayerChange();
}

function handleCellClick(event){
    const clickedCell=event.target;
    const clickedCellIndex=parseInt(
        clickedCell.getAttribute('data-cell-index')
    );
        if(gameState[clickedCellIndex]!="" || !gameActive) return;
        handleCellPlayed(clickedCell,clickedCellIndex);
        handleResultValidation();
}

function handleRestartGame(event){
    gameActive=true;
    currentPlayer="X";
    gameState=["","","","","","","","",""];
    statusDisplay.innerHTML=currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell=> cell.innerHTML="")

}
document.querySelectorAll('.cell').forEach(cell =>
    cell.addEventListener('click',handleCellClick));
    document.querySelector('.game--restart').addEventListener('click',handleRestartGame);