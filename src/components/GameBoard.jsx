import { useState } from "react";


export default function GameBoard({ onSelectSquare, board }) {
  
  /* const [gameBoard, setGameBoard] = useState(initialGameBoard);
  
  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]), // copia profunda
      ];
      if (!updatedBoard[rowIndex][colIndex]) {
        updatedBoard[rowIndex][colIndex] = activePlayerSymbol; // ✅ Aquí va X u O
      }

      return updatedBoard;
    });
    onSelectSquare(); //funcion que me pasan, // Llama switchPlayer() en App
  }*/
  return (
    <ol id="game-board">
      {board.map(
        (
          row,
          rowIndex, // recorre cada fila de la matriz
        ) => (
          <li key={rowIndex}>
            <ol>
              {row.map(
                (
                  playerSymbol,
                  colIndex, //recorre cada celda playerSymbol es el valor en esa posición
                  // (al principio null, después "X" o "O")
                  //colIndex es 0, 1 o 2
                ) => (
                  <li key={colIndex}>
                    <button
                      onClick={() => onSelectSquare(rowIndex, colIndex)}
                      disabled={playerSymbol !== null}//desabilito si ya esta jugado 
                      //el lugar
                    >
                      {playerSymbol}
                    </button>
                  </li>
                ),
              )}
            </ol>
          </li>
        ),
      )}
    </ol>
  );
}
