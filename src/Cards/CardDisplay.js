import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api";


function CardDisplay({ card, updateCards }) {
  const { url } = useRouteMatch();
  const history = useHistory();
  const { id, front, back } = card;

  const handleCardDelete = async () => {
    const userResponse = window.confirm(
      "Delete this card?\nYou will not be able to recover it."
    );
  
    if (userResponse) {
      await deleteCard(id);
      updateCards(-1);
      history.push(url);
    }
  }

  return (
    <>
      <div className="card">
        <div className="row card-body">
          <p className="col card-text">{front}</p>
          <p className="col card-text">{back}</p>
        </div>
        <div>
          <Link to={`${url}/cards/${id}/edit`}>
            <button className="btn btn-secondary">
              <i className="bi bi-pencil-fill"></i>
              Edit
            </button>
          </Link>
          <button className="btn btn-danger" onClick={handleCardDelete}>
            <i className="bi bi-trash"></i>
            Delete
          </button>
        </div>
      </div>
    </>
  )
}


export default CardDisplay;