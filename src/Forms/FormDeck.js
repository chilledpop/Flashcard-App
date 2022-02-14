import React from "react";
import { useHistory } from "react-router-dom";


function FormDeck({ handleSubmit, handleChange, formData }) {
  const history = useHistory();

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Deck</h1>
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          className="form-control"
          placeholder="Deck Name"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
      </label>
      <br />
      <label htmlFor="description">
        Description
        <textarea
          id="description"
          type="textarea"
          className="form-control"
          placeholder="Brief description of the deck"
          name="description"
          onChange={handleChange}
          value={formData.description}
        />
      </label>
      <button className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default FormDeck;