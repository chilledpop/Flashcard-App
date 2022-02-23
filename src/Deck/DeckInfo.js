import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteDeck, readDeck } from "../utils/api";
import CardDisplay from "../Cards/CardDisplay";


function DeckInfo({ updateDecks }) {
  const [deck, setDeck] = useState([]);
  const [numberOfCards, setNumberOfCards] = useState(0);
  const { deckId } = useParams();
  const history = useHistory();
  
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId, abortController.signal);
      setDeck(deckFromAPI);
    }

    loadDeck();
    return () => abortController.abort();
  }, [numberOfCards, deckId]);
  
  const handleDeckDelete = async () => {
    const userResponse = window.confirm(
        "Delete this deck?\nYou will not be able to recover it."
    );
    
    if (userResponse) {
      await deleteDeck(deck.id);
      updateDecks(-1);
      history.push("/");
    };
  }

  const updateCards = (value) => {
    setNumberOfCards(numberOfCards + value);
  }

  if (deck.id) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
          </ol>
        </nav>
        <div>
          <h2>{deck.name}</h2>
          <p>{deck.description}</p>
          <div>
            <Link to={`/decks/${deck.id}/edit`}>
              <button className="btn btn-secondary">
                Edit
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button className="btn btn-primary">
                Study
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/cards/new`}>
              <button className="btn btn-primary">
                Add Card
              </button>
            </Link>
            <button className="btn btn-danger" onClick={handleDeckDelete}>
              Delete
            </button>
          </div>
        </div>
        <div>
          <h3>Cards</h3> 
          {deck.cards.map((card) => (
            <CardDisplay key={card.id} card={card} updateCards={updateCards}/>
          ))}
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>
  }
}


export default DeckInfo;