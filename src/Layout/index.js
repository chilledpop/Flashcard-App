import React, { useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import DeckCreate from "../Deck/DeckCreate";
import DeckInfo from "../Deck/DeckInfo";
import DeckStudy from "../Study/DeckStudy";
import DeckEdit from "../Deck/DeckEdit";
import CardAdd from "../Cards/CardAdd";
import CardEdit from "../Cards/CardEdit";


function Layout() {
  const [numberOfDecks, setNumberOfDecks] = useState(0);

  const updateDecks = (value) => {
    setNumberOfDecks(numberOfDecks + value)
  }
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <Home numberOfDecks={numberOfDecks} updateDecks={updateDecks}/>
          </Route>
          <Route path="/decks/:deckId/study">
            <DeckStudy />
          </Route>
          <Route path="/decks/new">
            <DeckCreate />
          </Route>
          <Route exact={true} path="/decks/:deckId">
            <DeckInfo updateDecks={updateDecks}/>
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardAdd />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
