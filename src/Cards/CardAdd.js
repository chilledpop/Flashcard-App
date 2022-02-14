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
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(initialCardState);

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }

    loadDeck();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    await createCard(deckId, card);
    setCard(initialCardState);
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
      <FormCard handleChange={handleChange} handleSubmit={handleSubmit} card={card}/>
    </div>
  );
}


export default CardAdd;