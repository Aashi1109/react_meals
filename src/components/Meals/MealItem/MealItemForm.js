import React, { useRef, useState } from "react";
import Input from "../../UI/Input";

import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const inputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(false);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredAmount = inputRef.current.value;
    const enteredAmountValue = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountValue < 1 ||
      enteredAmountValue > 5
    ) {
      setAmountIsValid(true);
      return;
    }
      setAmountIsValid(false);

    props.onAddToCart(enteredAmountValue);
    // console.log('sdad')
  };

  return (
    <form className={styles["form"]} onSubmit={submitFormHandler}>
      <Input
        labelTitle="Amount"
        ref={inputRef}
        inputConfig={{
          type: "text",
          id: "amount_" + props.id,
          min: "1",
          step: "1",
          max: "5",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
