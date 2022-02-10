import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { listDecks } from "../utils/api";
import DeckDisplay from "./DeckDisplay";

function Home() {
  const [allDecks, setAllDecks] = useState([]);

  useEffect(() => {
    setAllDecks([]);
    const abortController = new AbortController();

    async function loadAllDecks() {
      const response = await listDecks(abortController.signal);
      setAllDecks(response);
    }

    loadAllDecks();
    return () => abortController.abort();
  }, [allDecks]);

  return (
    <div>
      <div>
        <Link to="/decks/new">
          <button className="btn btn-secondary">
            <i className="bi bi-plus-lg"></i>
            Create Deck
          </button>
        </Link>
      </div>
      <div>
        {allDecks.map((deck) => <DeckDisplay deck={deck}/> )}
      </div>
    </div>
  );
}

export default Home;