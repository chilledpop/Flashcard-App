import React from "react";
import { useHistory, useParams } from "react-router-dom";


function FormCard({card, handleSubmit, handleChange }) {
  const history = useHistory();
  const { deckId } = useParams();

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="front">
        Front
        <textarea
          id="front"
          type="textarea"
          className="form-control"
          placeholder="Front side of card"
          name="front"
          onChange={handleChange}
          value={card.front}
        />
      </label>
      <br />
      <label htmlFor="back">
        Back
        <textarea
          id="back"
          type="textarea"
          className="form-control"
          placeholder="Back side of card"
          name="back"
          onChange={handleChange}
          value={card.back}
        />
      </label>
      <button className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
}


export default FormCard;