import React from 'react';
import {Link, Redirect} from "react-router-dom";
import CityBox from "./CityBox";

export default function AnswerPage(props) {

  return (render())

  function render() {
    const lastGuess = props.gameHistory.slice(-1).pop()
    if (lastGuess) {
      return renderPage(lastGuess)
    } else {
      return <Redirect to="/"/>
    }
  }

  function renderPage(lastGuess) {
    return (
      <div>
        <Link to="/settings">Settings</Link>
        <h1>{renderMainText(lastGuess)}</h1>
        <h2>Score {props.score}</h2>
        <div style={{display: "flex"}}>

          <div style={{margin: "1%"}}>
            <CityBox city={lastGuess.city1} displayTemp={true} temperatureUnit={props.temperatureUnit}/>
          </div>

          <h3>VS</h3>

          <div style={{margin: "1%"}}>
            <CityBox city={lastGuess.city2} displayTemp={true} temperatureUnit={props.temperatureUnit}/>
          </div>

        </div>
        <Link to="/question">Next city</Link>
      </div>
    )
  }

  function renderMainText(lastGuess) {
    if (lastGuess.guessedCorrectly) {
      return "You WON!"
    } else {
      return "You LOST!"
    }
  }
}