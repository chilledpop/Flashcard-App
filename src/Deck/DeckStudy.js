import React, { useState } from "react";
import { useEffect, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardStudy from "../Cards/CardStudy";


function DeckStudy() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  
  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId);
      setDeck(deckFromAPI);
    }

    loadDeck();
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      <CardStudy cards={deck.cards} />
    </div>
  )
}


export default DeckStudy;