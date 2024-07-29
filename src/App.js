import {useEffect, useState } from "react";
import "./App.css"

export default function Board() {
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.className = "dark";
    }
  }, [])
  
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [squaresLeft, setSquaresLeft] = useState(9);  
  const [history, setHistory] = useState([]);

  const winner = calculateWinner(squares);

  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else if( squaresLeft === 0){
    status = "Tie"
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)){
      return;
    }

    const nextSquares = squares.slice();
    xIsNext ? nextSquares[i] = "X" : nextSquares[i] = "O";

    setSquaresLeft(squaresLeft-1);
    setHistory([...history, squares]);
    console.log(history)
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  
  return (
    <div className="board">
      <header>
        <h1>Tic Tac Toe</h1>
        <p className="subhead">XOXO and Ready to Go!</p>
      </header>
      <main>
        <div className="board">
          <h3 className="status">{status}</h3>
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>
        <div className="timeTravel">
          <h3>Time Travel</h3>
          <Log history={history} setSquares={setSquares} setHistory={setHistory}/>
        </div>
      </main>
      <footer className="foot">Made with X's, O's, and a lot of &lt;3</footer>
    </div>
  );
}

function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Log({history, setSquares, setHistory}){
  function jumpMove(squares, index){
    setSquares(squares);  
    setHistory(history.slice(0, index));
  }
      return (
        <>
        {history.map((squares, index) => (
          <li key={index}>
            <button onClick={() => jumpMove(squares, index)}>
              Jump back to move {index+1}
            </button>
          </li>
        ))}
        </>
      )
};