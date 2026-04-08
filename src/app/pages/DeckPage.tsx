import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Deck = {
  id: string;
  name: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

function getUserIdFromToken(token: string) {
  const payload = token.split('.')[1];
  if (!payload) {
    return null;
  }

  try {
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = atob(normalizedPayload);
    const parsedPayload = JSON.parse(decodedPayload) as Record<string, string>;

    return parsedPayload.sub ?? null;
  } catch {
    return null;
  }
}

export default function DeckPage() {
  const navigate = useNavigate();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadDecks() {
      const token = localStorage.getItem('token');

      if (!token) {
        setErrorMessage('You must be logged in to view decks.');
        setIsLoading(false);
        return;
      }

      const userId = getUserIdFromToken(token);

      if (!userId) {
        setErrorMessage('Could not read user information from the token.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/Decks/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setErrorMessage(`Failed to load decks: ${response.status}`);
          setIsLoading(false);
          return;
        }

        const data = (await response.json()) as Deck[];
        setDecks(data);
      } catch {
        setErrorMessage('Failed to load decks.');
      } finally {
        setIsLoading(false);
      }
    }

    loadDecks();
  }, []);

  return (
    <div>
      <h1>Here are your decks</h1>

      {isLoading && <p>Loading decks...</p>}
      {errorMessage && <p>{errorMessage}</p>}

      {!isLoading && !errorMessage && decks.length === 0 && <p>No decks found.</p>}

      {!isLoading &&
        !errorMessage &&
        decks.map((deck) => (
          <div
            key={deck.id}
            onClick={() => navigate(`/decks/${deck.id}`, { state: { deckName: deck.name } })}
            style={{ cursor: 'pointer' }}
          >
            <h2>{deck.name}</h2>
          </div>
        ))}

      <button onClick={() => navigate('/create-new-deck')}>Create new deck</button>
    </div>
  );
}
