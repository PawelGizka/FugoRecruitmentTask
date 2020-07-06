import React from 'react';
import {Link} from "react-router-dom";
import {TemperatureUnits} from "./TemperatureUnits";
import CityBox from "./CityBox";
import guessedCorrectlyIcon from './icons/guessedCorrectly.png';
import guessedIncorrectlyIcon from './icons/guessedIncorrectly.png';
import { useHistory } from "react-router-dom";

export default function SettingsPage(props) {

  const browserHistory = useHistory();

  return (
    <div>
      <button onClick={() => browserHistory.goBack()}>Back</button>
      <h1>Settings</h1>
      <h2>Units</h2>
      <div>
        <input
          type="radio"
          id="celsius"
          checked={props.temperatureUnit === TemperatureUnits.CELSIUS}
          onChange={() => props.setTemperatureUnit(TemperatureUnits.CELSIUS)}
        />
        <label htmlFor="celsius">Celsius</label>

        <input
          type="radio"
          id="fahrenheit"
          checked={props.temperatureUnit === TemperatureUnits.FAHRENHEIT}
          onChange={() => props.setTemperatureUnit(TemperatureUnits.FAHRENHEIT)}
        />
        <label htmlFor="fahrenheit">Fahrenheit</label>
      </div>

      <div>
        {renderHistory()}
      </div>
    </div>
  )

  function renderHistory() {
    return props.gameHistory.map(history =>
      <div style={{display: "flex"}}>

        <div style={{margin: "1%"}}>
          <CityBox city={history.city1} displayTemp={true} temperatureUnit={props.temperatureUnit}/>
        </div>

        <h3>VS</h3>

        <div style={{margin: "1%"}}>
          <CityBox city={history.city2} displayTemp={true} temperatureUnit={props.temperatureUnit}/>
        </div>

        {renderIcon(history)}
      </div>
    )
  }

  function renderIcon(history) {
    if (history.guessedCorrectly) {
      return <img src={guessedCorrectlyIcon} style={{marginTop: "2%"}} width="70" height="70"/>
    } else {
      return <img src={guessedIncorrectlyIcon} style={{marginTop: "2%"}} width="70" height="70"/>
    }
  }
}