import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicTacToeInput from './Components/TicTacToe/TicTacToeInput';
import TicTacToeBoard from './Components/TicTacToe/TicTacToeBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TicTacToeInput />} />
        <Route path="/gameplay/:size" element={<TicTacToeBoard />} />
      </Routes>
    </Router>
  );
}

export default App;