import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import FormDeck from "../Forms/FormDeck";

function DeckCreate() {  
  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createDeck(formData);
    history.push(`/decks/${response.id}`);
  }
  
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <FormDeck handleSubmit={handleSubmit} handleChange={handleChange} formData={formData}/>
    </div>
  );
}

export default DeckCreate;