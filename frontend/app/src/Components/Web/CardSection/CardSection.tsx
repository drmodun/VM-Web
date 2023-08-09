import React from "react";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import classes from "./CardSection.module.scss";
import { handleToken } from "../../../Api/UserApi";
import { Token } from "react-stripe-checkout";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },

      _webkitAutofill: {
        color: "#32325d",
        name: "autofill",
        background: "red",
      },
    },

    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CardSection() {
  const [focused, setFocused] = React.useState<string | null>(null);
  const handleSumbit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardNumberElement);
    if (card) {
      console.log(card);
    }
    const result = await stripe.createToken(card!);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(await handleToken(result.token as Token))
      console.log(result.token);
    }
    console.log("CardSection");
  };
  //gonna use legacy stripe api for now
  const elements = useElements();
  const stripe = useStripe();

  return (
    <form onSubmit={handleSumbit}>
      Card details
      <CardNumberElement
        id="#cardNumber"
        onFocus={() => setFocused("number")}
        className={
          classes.NumberInput +
          " " +
          (focused === "number" ? classes.Focused : "")
        }
        options={CARD_ELEMENT_OPTIONS}
      />
      <div className={classes.Row}>
        <CardExpiryElement
          onFocus={() => setFocused("expiry")}
          options={CARD_ELEMENT_OPTIONS}
          className={
            classes.ExpiryInput +
            " " +
            (focused === "expiry" ? classes.Focused : "")
          }
        />
        <CardCvcElement
          onFocus={() => setFocused("cvc")}
          options={CARD_ELEMENT_OPTIONS}
          className={
            classes.CvcInput + " " + (focused === "cvc" ? classes.Focused : "")
          }
        />
      </div>
      <button type="submit">Set Card Data</button>
    </form>
  );
}

export default CardSection;
