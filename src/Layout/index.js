import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import DeckCreate from "../Deck/DeckCreate";
import DeckInfo from "../Deck/DeckInfo";
import DeckStudy from "../Deck/DeckStudy";
import DeckEdit from "../Deck/DeckEdit";
import CardAdd from "../Cards/CardAdd";
import CardEdit from "../Cards/CardEdit";


function Layout() {

  
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <DeckCreate />
          </Route>
          <Route path="/decks/:deckId">
            <DeckInfo />
          </Route>
          <Route path="decks/:deckId/study">
            <DeckStudy />
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
