import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type DeckDetails = {
  id: string;
  name: string;
  cards: FlashCardDetails[];
};

type FlashCardDetails = {
  id?: string;
  question: string;
  answer: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

export default function DeckDetailsPage() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState<DeckDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  async function loadDeckDetails() {
    const token = localStorage.getItem('token');

    if (!deckId) {
      setErrorMessage('Missing deck id.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/Decks/${deckId}`, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
      });

      if (!response.ok) {
        setErrorMessage(`Failed to load deck: ${response.status}`);
        setIsLoading(false);
        return;
      }

      const data = (await response.json()) as DeckDetails;
      setDeck(data);
    } catch {
      setErrorMessage('Failed to load deck details.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDeckDetails();
  }, [deckId]);

  function deleteFlashCard(flashCardId: string) {
    const token = localStorage.getItem('token');

    if (!deckId || !token) {
      setErrorMessage('You must be logged in to delete a flashcard.');
      return;
    }

    fetch(`${apiUrl}/FlashCard/${deckId}/${flashCardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setErrorMessage(`Failed to delete flashcard: ${response.status}`);
          return;
        }

        return loadDeckDetails();
      })
      .catch(() => {
        setErrorMessage('Failed to delete flashcard.');
      });
  }

  return (
    <div>
      <h1>{deck?.name ?? 'Deck details'}</h1>

      {isLoading && <p>Loading deck details...</p>}
      {errorMessage && <p>{errorMessage}</p>}

      {!isLoading && !errorMessage && deck && (
        <>
          <p>Deck ID: {deck.id}</p>
          <p>Flashcards: {deck.cards.length}</p>

          <div>
            <h2>Cards</h2>
            <table>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #000', padding: '8px' }}>Question</th>
                  <th style={{ border: '1px solid #000', padding: '8px' }}>Answer</th>
                  <th style={{ border: '1px solid #000', padding: '8px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {deck.cards.map((card, index) => (
                  <tr key={card.id ?? index}>
                    <td style={{ border: '1px solid #000', padding: '8px' }}>
                      {card.question}
                    </td>
                    <td
                      style={{ border: '1px solid #000', padding: '8px', cursor: 'pointer' }}
                      onClick={() => {
                        const key = index;

                        setRevealedAnswers((current) => ({
                          ...current,
                          [key]: !current[key],
                        }));
                      }}
                      >
                        {revealedAnswers[index] ? card.answer : '****'}
                      </td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (card.id) {
                            deleteFlashCard(card.id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
