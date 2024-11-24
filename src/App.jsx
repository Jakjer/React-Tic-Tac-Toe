import { useState } from 'react'
import Player from './components/Player.jsx'
import Players from './components/Players.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx'
import GameOver from './components/GameOver.jsx'
import { WINNING_COMBINATIONS } from './winning-combinations.js'

const PLAYERS = {
  X: 'Kiryu',
  O: 'Majima'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function determineActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = "O";
  }
  return currentPlayer;
}

function determineWinningPlayer(gameBoard, players, gameTurns){
  let winner;
  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    } else if(gameTurns.length === 9 && !winner){
      winner = "D";
    }
  }

  return winner;
}

function handleGameState(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for (const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState({PLAYERS});
  const [gameTurns, setGameTurns] = useState([]);
  const currentPlayer = determineActivePlayer(gameTurns);
  const gameBoard = handleGameState(gameTurns);
  const winner = determineWinningPlayer(gameBoard, players, gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer =  determineActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex}, player: currentPlayer, }, 
        ...prevTurns
      ];
      return updatedTurns;
    });
  }

  function resetGameBoard(){
    setGameTurns([]);
    gameBoard = initialGameBoard;
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={currentPlayer === 'X'} onNameChange={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={currentPlayer === 'O'} onNameChange={handlePlayerNameChange}/>
        </ol>
        {(winner) && <GameOver winner={winner} resetGame={resetGameBoard}/>}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard}/>
      </div>
      <Log gameTurns={gameTurns}/>
    </main>
  )
}

export default App
