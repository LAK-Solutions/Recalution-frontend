import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/LoginPage';
import DecksPage from './pages/DeckPage';

// MUI Components
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CreateNewDeckPage from './pages/CreateNewDeckPage';
import DeckDetailsPage from './pages/DeckDetailsPage';

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
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/decks" element={<DecksPage />} />
        <Route path="/decks/:deckId" element={<DeckDetailsPage />} />
        <Route path="/create-new-deck" element={<CreateNewDeckPage />} />
      </Routes>

      <Container style={{ marginTop: 40 }}>
        <Typography variant="h4" gutterBottom>
          Hello MUI
        </Typography>
        <Button variant="contained" color="primary">
          Click Me
        </Button>
      </Container>
    </BrowserRouter>
  );
}

export default App;
