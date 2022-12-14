import React, { useContext } from "react";
import CartContext from "../../../store/CartContext";

import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const { name, description, price, id } = props;
  const cartCtx = useContext(CartContext);


  const addToCartHandler = (amount) => {
    // console.log(cartCtx.addItem)
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
    console.log(cartCtx)
  };
  return (
    <li className={styles["meal"]}>
      <div>
        <h3>{name}</h3>
        <p className={styles["description"]}>{description}</p>
        <p className={styles["price"]}>${price}</p>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
