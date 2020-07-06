import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MainPage from "./MainPage";
import SettingsPage from "./SettingsPage";
import {TemperatureUnits} from "./TemperatureUnits";
import QuestionPage from "./QuestionPage";
import AnswerPage from "./AnswerPage";

function App() {

  const [score, setScore] = useState(0)
  function incrementScore() {
    setScore(score + 1)
  }

  const [gameHistory, setGameHistory] = useState([])
  function updateGameHistory(history) {
    let newGameHistory = [...gameHistory]
    newGameHistory.push(history)
    setGameHistory(newGameHistory)
  }

  const [temperatureUnit, setTemperatureUnit] = useState(TemperatureUnits.FAHRENHEIT)

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <MainPage/>
          </Route>
          <Route path="/question">
            <QuestionPage score={score} incrementScore={incrementScore} updateGameHistory={updateGameHistory}/>
          </Route>
          <Route path="/answer">
            <AnswerPage score={score} temperatureUnit={temperatureUnit} gameHistory={gameHistory}/>
          </Route>
          <Route path="/settings">
            <SettingsPage temperatureUnit={temperatureUnit} setTemperatureUnit={setTemperatureUnit} gameHistory={gameHistory}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
