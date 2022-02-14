import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import FormDeck from "../Forms/FormDeck";


function DeckEdit() {  
  const initialFormState = {
    name: "",
    description: "",
  }

  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState(initialFormState);
  const history = useHistory();
  const { deckId } = useParams;

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId);
      setDeck(deckFromAPI);
      setFormData({
        id: deckId,
        name: deckFromAPI.name,
        description: deckFromAPI.description,
      });
    }

    loadDeck();
  }, [deckId])

  const handleChange = ({ target }) => {
    setFormData({
      ...formData, 
      [target.name]: target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(formData);
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
      </nav>
      <FormDeck handleChange={handleChange} handleSubmit={handleSubmit} formData={formData}/>
    </div>
  );
}


export default DeckEdit;