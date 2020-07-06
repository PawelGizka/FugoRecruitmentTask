import React from 'react';
import {Link} from "react-router-dom";

export default function MainPage(props) {
  return (
    <div>
      <Link to="/settings">Settings</Link>
      <h1>Welcome to guess city temperatures game!</h1>
      <Link to="/question">Start Game!</Link>
    </div>
  )
}