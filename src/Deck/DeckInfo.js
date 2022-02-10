import React from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteDeck, readDeck, deleteCard } from "../utils/api";
import CardsDisplay from "../Cards/CardsDisplay";


function DeckInfo() {
  const [deck, setDeck] = useState({})
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
  
  useEffect(() => {
      async function loadDeck() {
        const response = await readDeck(deckId);
        setDeck(response);
      }

      loadDeck();
  }, [deckId]);
  
  const handleDeckDelete = async () => {
    const userResponse = window.confirm(
        "Delete this deck?\nYou will not be able to recover it."
    );
    
    if (userResponse) {
      await deleteDeck(deck.id);
      history.push(url);
    }
  }

  const handleCardDelete = async () => {
    const userResponse = window.confirm(
      "Delete this card?\nYou will not be able to recover it."
    );
  
    if (userResponse) {
      await deleteCard(deck.card.id);
      history.push(url);
    }
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item active" aria-current="page">{deck.name}</li>
        </ol>
      </nav>
      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div>
            <Link to={`${url}/edit`}>
              <button className="btn btn-secondary">
                <i class="bi bi-pencil-fill"></i>
                Edit
              </button>
            </Link>
            <Link to={`${url}/study`}>
              <button>
                <i class="bi bi-journal-bookmark-fill"></i>
                Study
              </button>
            </Link>
            <Link to={`${url}/cards/new`}>
              <button>
                <i className="bi bi-plus-lg"></i>
                Add Cards
              </button>
            </Link>
            <button className="btn btn-danger" onClick={handleDeckDelete}>
              <i class="bi bi-trash"></i>
              Delete
            </button>
        </div>
      </div>
      <div>
        <CardsDisplay deck={deck} handleCardDelete={handleCardDelete}/>
      </div>
    </div>
  )
}


export default DeckInfo;