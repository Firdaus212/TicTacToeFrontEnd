import React from 'react';
import { useParams } from 'react-router-dom';
import TicTacToe from './TicTacToe';

const TicTacToeBoard = () => {
  const { size } = useParams();

  return (
    <div>
      <h1 className="title">Tic Tac Toe Game</h1>
      <TicTacToe boardSize={parseInt(size)} />
    </div>
  );
}

export default TicTacToeBoard;