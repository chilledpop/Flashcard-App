import React, { useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";

function CardStudy({ cards }) {
  const initialCardState = {
    cardNumber: 0,
    flipped: false,
  }

  const [session, setSession] = useState(initialCardState);
  const history = useHistory();
  const { deckId }= useParams();

  const handleFlip = () => {
    setSession({
      ...session,
      flipped: true
    });
  }

  const handleNext = () => {
    if (session.cardNumber >= cards.length) {
      window.confirm(`Restart cards?\nClick "cancel" to return to the home page.`)
      ? setSession(initialCardState)
      : history.push("/")
    } else {
      setSession({
        ...session,
        cardNumber: session.cardNumber + 1,
        flipped: false,
      })
    }
  }

  if (cards.length > 2) {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className = "card-title">
              Card {session.cardNumber + 1} of {cards.length}
            </h5>
            <p className="card-text">
              {session.flipped ? cards[session.cardNumber].back : cards[session.cardNumber].front}
            </p>
            <button className="btn btn-secondary" onClick={handleFlip}>
              Flip
            </button>
            {session.flipped && 
              <button className="btn btn-primary" onClick={handleNext}>Next</button>
            }
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Not enough cards</h2>
        <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button className="btn btn-primary">
            <i className="bi bi-plus"></i>
            Add Cards
          </button>
        </Link>
      </div>
    );
  }
}

export default CardStudy;