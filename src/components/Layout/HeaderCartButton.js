import React from "react";
import { useContext, useState, useEffect } from "react";
import CartContext from "../../store/CartContext";

import CartIcon from "../Cart/CartIcon";

import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const { items } = cartCtx;
  const totalCartItems = items.reduce(
    (currentVal, item) => currentVal + item.amount,
    0
  );

  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  // console.log(totalCartItems)
  // cardCtx.totalAmount = totalCartItems

  const classes = `${styles["button"]} ${
    btnIsHighlighted ? styles["bump"] : ""
  }`;

  return (
    <button className={classes} onClick={props.onCartOpenClick}>
      <span className={styles["icon"]}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles["badge"]}>{totalCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
