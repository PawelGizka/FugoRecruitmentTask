import React, {useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import {Cities} from "./Cities";
import CityBox from "./CityBox";

export default function QuestionPage(props) {

  const [question, setQuestion] = useState(null)
  const [isError, setError] = useState(false)
  const [redirectToAnswer, setRedirectToAnswer] = useState(false)

  function getUrl(city, countryCode) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
  }

  useEffect(() => {
    const city1Index = Math.floor(Math.random() * Cities.length)
    let city2Index = Math.floor(Math.random() * Cities.length)
    if (city1Index === city2Index) {
      city2Index = (city2Index + 1) % Cities.length
    }
    const city1 = Cities[city1Index]
    const city2 = Cities[city2Index]

    axios.all([axios.get(getUrl(city1.name, city1.countryCode)), axios.get(getUrl(city2.name, city2.countryCode))])
      .then(axios.spread((url1resp, url2resp) => {
        setQuestion({
          city1: {
            name: city1.name,
            country: city1.country,
            temperature: url1resp.data.main.temp
          },
          city2: {
            name: city2.name,
            country: city2.country,
            temperature: url2resp.data.main.temp
          }
        })
      }))
      .catch(_ => {
        setError(true)
      })
  }, [])


  return (render())

  function city1Clicked() {
    const guessedCorrectly = question.city1.temperature >= question.city2.temperature
    redirectToAnswerPage(guessedCorrectly)
  }

  function city2Clicked() {
    const guessedCorrectly = question.city1.temperature <= question.city2.temperature
    redirectToAnswerPage(guessedCorrectly)
  }

  function redirectToAnswerPage(guessedCorrectly) {
    setRedirectToAnswer(true)
    if (guessedCorrectly) props.incrementScore()
    const history = {guessedCorrectly}
    props.updateGameHistory(Object.assign(history, question))
  }

  function render() {
    if (redirectToAnswer) {
      return <Redirect to="/answer"/>
    } else if (question) {
      return (
        <div>
          <Link to="/settings">Settings</Link>
          <h1>Which city is hotter?</h1>
          <h2>Score {props.score}</h2>
          <div style={{display: "flex"}}>

            <div style={{margin: "1%"}} onClick={city1Clicked}>
              <CityBox city={question.city1} displayTemp={false}/>
            </div>

            <h3>VS</h3>

            <div style={{margin: "1%"}} onClick={city2Clicked}>
              <CityBox city={question.city2} displayTemp={false}/>
            </div>

          </div>
        </div>
      )
    } else if (isError) {
      return <h1>Error occur when fetching whether data</h1>
    } else {
      return <h1>Loading...</h1>
    }
  }

}