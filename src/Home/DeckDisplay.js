import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index"

function DeckDisplay({ deck, updateDecks }) {
  const { id, name, description, cards } = deck; 
  const history = useHistory();

  const handleDelete = async(deckId) => {
    const userResponse = window.confirm(
      "Delete this deck?\nYou will not be able to recover it."
    );
    
    if (userResponse) {
      await deleteDeck(deckId);
      updateDecks(-1);
      history.push("/");
    }
  };

  return (
    <div className="card" key={id}>
      <div className="row">
        <div className="col text-left">
          <h5 className="card-title">{name}</h5>
        </div>
        <div className="col text-right">
          <p className="card-text">{cards.length} cards</p>
        </div>
      </div>
      <div className="row">
        <p className="card-text">{description}</p>
      </div>
      <div className="row">
        <Link to={`/decks/${id}`}>
          <button className="btn btn-secondary">
            <i className="bi bi-eye-fill"></i>
            View
          </button>
        </Link>
        <Link to={`/decks/${id}/study`}>
          <button className="btn btn-primary">
            <i className="bi bi-journal-bookmark-fill"></i>
            Study
          </button>
        </Link>
        <button className="btn btn-danger" onClick={handleDelete}>
          <i className="bi bi-trash"></i>
          Delete
        </button>
      </div>
    </div>
  )
}


export default DeckDisplay;