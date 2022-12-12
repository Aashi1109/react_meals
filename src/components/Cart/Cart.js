import React, { useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";

import styles from "./Cart.module.css";
import Checkout from "./Checkout/Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const itemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const itemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={itemRemoveHandler.bind(null, item.id)}
          onAdd={itemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  const orderClickHandler = () => setIsCheckout(true);

  const modalActions = (
    <div className={styles["actions"]}>
      <button className={styles["button--alt"]} onClick={props.onCartHide}>
        Close
      </button>
      <button
        className={styles["button"]}
        onClick={orderClickHandler}
        {...(!cartCtx.items.length ? { disabled: "true" } : {})}
      >
        Order Cart
      </button>
    </div>
  );

  return (
    <Modal>
      {!cartCtx.items.length && <p>No cart items found</p>}
      {cartItems}
      <div className={styles["total"]}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!isCheckout && modalActions}
      {isCheckout && <Checkout onCancel={props.onCartHide}></Checkout>}
    </Modal>
  );
};

export default Cart;
