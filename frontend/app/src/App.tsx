import './App.scss';
import React from 'react';
import { Router } from './Components/Router';
import "./assets/fonts/stylesheet.css"
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NcS2vApp5avo5Y6EQBAPyzC9QJBqsb4fB8paxKr2fF5OfmvAiReZhv9vxaoryAGSwwj5r15dRrVhtR53nr8qqSt00V94ZU7zX"
);
function App() {
  return (
    <Router/>
  );
}

export default App;
