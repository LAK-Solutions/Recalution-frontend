import { useLocation, useParams } from 'react-router-dom';

type DeckLocationState = {
  deckName?: string;
};

export default function DeckDetailsPage() {
  const { deckId } = useParams();
  const location = useLocation();
  const state = location.state as DeckLocationState | null;

  return (
    <div>
      <h1>{state?.deckName ?? 'Deck details'}</h1>
      <p>Deck ID: {deckId}</p>
    </div>
  );
}
