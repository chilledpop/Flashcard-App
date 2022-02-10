import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api";


function CardsDisplay({ deck }) {
  const { url } = useRouteMatch();
  const history = useHistory();

  const handleCardDelete = async (id) => {
    const userResponse = window.confirm(
      "Delete this card?\nYou will not be able to recover it."
    );
  
    if (userResponse) {
      await deleteCard(id);
      history.push(url);
    }
  }

  return (
    <>
      <h3>Cards</h3> 
      {deck.map(({ cards: { id, front, back} }) => (
        <div className="card">
          <div className="row card-body">
            <p className="col card-text">{front}</p>
            <p className="col card-text">{back}</p>
          </div>
          <div>
            <Link to={`${url}/${id}/edit`}>
              <button className="btn btn-secondary">
                <i class="bi bi-pencil-fill"></i>
                Edit
              </button>
            </Link>
            <button className="btn btn-danger" onClick={handleCardDelete}>
              <i class="bi bi-trash"></i>
              Delete
            </button>
          </div>
        </div>
      ))};
    </>
  )
}


export default CardsDisplay;