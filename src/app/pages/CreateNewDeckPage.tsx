import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Card = {
  question: string;
  answer: string;
};

type CreateDeckResponse = {
  deck: {
    id: string;
    name: string;
  };
};

const apiUrl = import.meta.env.VITE_API_URL;

export default function CreateNewDeckPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [cards, setCards] = useState<Card[]>([{ question: '', answer: '' }]);
  const [errorMessage, setErrorMessage] = useState('');

  function addCard() {
    setCards((currentCards) => [...currentCards, { question: '', answer: '' }]);
  }

  function updateCard(index: number, field: keyof Card, value: string) {
    setCards((currentCards) =>
      currentCards.map((card, cardIndex) =>
        cardIndex === index ? { ...card, [field]: value } : card
      )
    );
  }

  async function createDeck() {
    const trimmedName = name.trim();
    const validCards = cards.filter(
      (card) => card.question.trim() !== '' && card.answer.trim() !== ''
    );
    const token = localStorage.getItem('token');

    if (trimmedName === '') {
      setErrorMessage('Deck name cannot be empty.');
      return;
    }

    if (validCards.length === 0) {
      setErrorMessage('Add at least one flashcard with both a question and an answer.');
      return;
    }

    if (!token) {
      setErrorMessage('You must be logged in to create a deck.');
      return;
    }

    setErrorMessage('');

    const response = await fetch(`${apiUrl}/Decks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: trimmedName, cards: validCards })
    });

    if (!response.ok) {
      setErrorMessage(`Failed to create deck: ${response.status}`);
      return;
    }

    const data = (await response.json()) as CreateDeckResponse;
    navigate(`/decks/${data.deck.id}`, { state: { deckName: data.deck.name } });
  }

  return (
    <div>
      <h1>Here are page for creation of a new deck</h1>

      <div>
        <label>Deck name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errorMessage) {
              setErrorMessage('');
            }
          }}
          placeholder="Enter deck name"
        />
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <h2>Cards</h2>

        {cards.map((card, index) => (
          <div key={index}>
            <p>Card {index + 1}</p>
            <input
              type="text"
              value={card.question}
              onChange={(e) => {
                updateCard(index, 'question', e.target.value);
                if (errorMessage) {
                  setErrorMessage('');
                }
              }}
              placeholder="Question"
            />

            <input
              type="text"
              value={card.answer}
              onChange={(e) => {
                updateCard(index, 'answer', e.target.value);
                if (errorMessage) {
                  setErrorMessage('');
                }
              }}
              placeholder="Answer"
            />
          </div>
        ))}

        <button type="button" onClick={addCard}>
          Add another flashcard
        </button>
      </div>

      <button type="button" onClick={createDeck}>
        Create deck
      </button>
    </div>
  );
}
