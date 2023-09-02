import './App.scss';
import React from 'react';
import { Router } from './Components/Router';
import "./assets/fonts/stylesheet.css"
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_live_51NcS2vApp5avo5Y6WDlDezJYc31OwGdPJIDnuezXyIzAodhKpEp0xjixVfbOhUhS4zDFmMQxgIk6JCWUDw9Pnowl00fCXsTacc"
);
function App() {
  return (
    <Router/>
  );
}

export default App;
