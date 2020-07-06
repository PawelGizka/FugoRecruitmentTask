import React from "react";
import {TemperatureUnits} from "./TemperatureUnits";

export default function CityBox(props) {

  return (
    <div>
      <p>{props.city.name},</p>
      <p>{props.city.country}</p>
      {props.displayTemp && renderTemp()}
    </div>
  )

  function renderTemp() {
    if (props.temperatureUnit === TemperatureUnits.CELSIUS) {
      return (
        <p>{props.city.temperature} C</p>
      )
    } else {
      const fahrenheitTemp = Math.round((props.city.temperature * 1.8 + 32) * 100) / 100
      return (
        <p>{fahrenheitTemp} F</p>
      )
    }
  }
}