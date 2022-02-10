import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function DeckCreate() {  
  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({...initialFormState});
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData({ ...initialFormState });
    const response = await createDeck(formData);
    history.push(`/decks/${response.id}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <form onSubmit={handleSubmit}>
        <h1>Create Deck</h1>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
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
            placeholder="Brief description of the deck"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </label>
        <button className="btn btn-secondary" onClick={() => history.push("/")}>Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default DeckCreate;