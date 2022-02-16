import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import FormCard from "../Forms/FormCard";


function CardEdit() {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState([]);
  const { deckId, cardId } = useParams();
  const history = useHistory();
  
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeckAndCard() {
      const deckFromAPI = await readDeck(deckId, abortController.signal);
      setDeck(deckFromAPI);

      const cardFromAPI = await readCard(cardId);
      setCard(cardFromAPI);
    }

    loadDeckAndCard();
    return () => abortController.abort();
  }, [deckId, cardId])

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    await updateCard(card);
    history.push(`/decks/${deckId}`)
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>Deck {deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <FormCard handleChange={handleChange} handleSubmit={handleSubmit} card={card} />
    </div>
  );
}


export default CardEdit;