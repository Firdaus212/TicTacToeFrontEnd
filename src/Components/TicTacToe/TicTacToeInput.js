import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TicTacToe.css';

const TicTacToeInput = () => {
  const [size, setSize] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (size >= 2) {
      navigate(`/gameplay/${size}`);
    } else {
      setError('Please input a board size more than 2');
    }
  };

  return (
    <div className='containerInput'>
      <h1>Welcome, this is the Tic-Tac-Toe Game</h1>
      <h1>Please submit the board size</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" value={size} onChange={(e) => setSize(e.target.value)} />
        <button type="submit">Play</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TicTacToeInput;