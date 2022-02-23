import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { listDecks } from "../utils/api/index";
import DeckDisplay from "./DeckDisplay";

function Home({ numberOfDecks, updateDecks }) {
  const [allDecks, setAllDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadAllDecks() {
      const response = await listDecks(abortController.signal);
      setAllDecks(response);
    }

    loadAllDecks();
    return () => abortController.abort();
  }, [numberOfDecks]);


  return (
    <div>
      <Link className="btn btn-secondary btn-lg" to="/decks/new" >
        + Create Deck
      </Link> 
      {allDecks.map(({id, name, description, cards}) => (
        <DeckDisplay
          key={id} id={id} description={description} 
          name={name} cards={cards} updateDecks={updateDecks}
        />
      ))}
    </div>
  );
}

export default Home;