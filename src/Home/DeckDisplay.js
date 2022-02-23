import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index"

function DeckDisplay({ id, name, description, cards, updateDecks }) {
  const history = useHistory();

  const handleDelete = async () => {
    const userResponse = window.confirm(
      "Delete this deck?\nYou will not be able to recover it."
    );
    
    if (userResponse) {
      await deleteDeck(id);
      updateDecks(-1);
      history.push("/");
    }
  };

  return (
    <div className="card mb-3">
      <div className="row card-body px-4" style={{display: "flex"}}>
        <div className="col">
          <h3 className="card-title">{name}</h3>
        </div>
        <div className="col">
          <p>{cards.length} cards</p>
        </div>
      </div>
      <div className="row px-5" style={{display: "flex"}}>
        <p className="card-text">{description}</p>
      </div>
      <div className="row card-body px-5" style={{display: "flex"}}>
        <Link className="btn btn-secondary" to={`/decks/${id}`}>
          View
        </Link>
        <Link className="btn btn-primary" to={`/decks/${id}/study`}>
          Study
        </Link>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}


export default DeckDisplay;