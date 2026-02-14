import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/LoginPage';
import DecksPage from './pages/DeckPage';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/decks">Decks</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/decks" element={<DecksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
