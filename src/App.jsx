import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";
import { WinningCombinations } from "../winning-combinations.js";
import GameOver from "./components/GameOver.jsx";
const PLAYERS = {
  X: { id: 0, name: "Player 1", pfp: variantAvatar() },
  O: { id: 1, name: "Player 2", pfp: variantAvatar() },
};
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function variantAvatar() {
  let random = Math.floor(Math.random() * 150);
  return `https://i.pravatar.cc/${random}`;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WinningCombinations) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}
function setLocal() {
  localStorage.setItem(`jugadores}`, JSON.stringify(players));
}
function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [resetCount, setResetCount] = useState(0);

  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem("jugadores");
    return saved ? JSON.parse(saved) : PLAYERS;
  });
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);
  const draw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns =
        //...prevturns hace: el estado actual del arreglo(clona todos los items que tenia),
        //y agrega el movimiento nuevo adelante.
        [
          { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
          ...prevTurns,
        ];
      return updatedTurns;
    });
  }
  function handleReset() {
    setGameTurns([]);
  }
  function handlePlayerpfp(symbol, newImage) {
    const updated = {
      ...players,
      [symbol]: { ...players[symbol], pfp: newImage },
    };
    setPlayers(updated);
    setLocal(updated);
  }

  function handlePlayerName(symbol, newName) {
    const updated = {
      ...players,
      [symbol]: { ...players[symbol], name: newName },
    };

    setPlayers(updated);
    setLocal(updated);
  }
  function setLocal(data) {
    localStorage.setItem("jugadores", JSON.stringify(data));
  }
  function resetPlayers() {
    localStorage.clear();
    setPlayers(PLAYERS);
    handleReset(); //tablero
    setResetCount((c) => c + 1);
  }
  return (
    <main>
      <button className="reset-button" onClick={resetPlayers}>
        Reset players
      </button>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            key={`X-${resetCount}`}
            id={players.X.id}
            initialName={players.X.name}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerName}
            avatar={players.X.pfp}
            onChangeAvatar={handlePlayerpfp}
          />
          <Player
            key={`O-${resetCount}`}
            id={players.O.id}
            initialName={players.O.name}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerName}
            avatar={players.O.pfp}
            onChangeAvatar={handlePlayerpfp}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} onRestart={handleReset} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}
export default App;
