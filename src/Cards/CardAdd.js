import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FormCard from "../Forms/FormCard";
import { createCard, readDeck } from "../utils/api";

function CardAdd() {
  const initialCardState = {
    front: "",
    back: "",
  }

  const { deckId } = useParams();  
  const [deck, setDeck] = useState([]);
  const [newCard, setNewCard] = useState(initialCardState);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    }

    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setNewCard({
      ...newCard,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    await createCard(deckId, newCard);
    setNewCard(initialCardState);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Card</h1>
      <FormCard handleChange={handleChange} handleSubmit={handleSubmit} card={newCard}/>
    </div>
  );
}


export default CardAdd;