import { useRef, useState, useContext } from "react";
import useHTTP from "../../../hooks/use-http";
import CartContext from "../../../store/CartContext";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim().length === 0;
const isSixChar = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputValidity, setFormInputValidity] = useState({
    name: false,
    city: false,
    postal: false,
    street: false,
  });
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const { isLoading, error, sendRequest: postData } = useHTTP();
  const cartCtx = useContext(CartContext);

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isSixChar(enteredPostal);

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid;

    // console.log(formIsValid);

    if (!formIsValid) {
      // console.log('asdad')
      setFormInputValidity({
        name: !enteredNameIsValid,
        street: !enteredStreetIsValid,
        city: !enteredCityIsValid,
        postal: !enteredPostalIsValid,
      });
    }

    if (formIsValid) {
      setFormInputValidity({
        name: false,
        street: false,
        city: false,
        postal: false,
      });
      // enteredName.value = ''
      console.log(cartCtx);
      postData(
        {
          url: "https://react-meals-5b7e8-default-rtdb.firebaseio.com/orders.json",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: enteredName,
            city: enteredCity,
            street: enteredStreet,
            zipcode: enteredPostal,
            items: cartCtx.items,
            price: cartCtx.price,
          }),
          method: "POST",
        },
        (data) => console.log(data)
      );
      setIsDataSubmitted(!isDataSubmitted);
    }
  };

  const validityClass = (value) => {
    const tempClass = `${classes.control} ${value ? classes.invalid : ""}`;
    // console.log(formInputValidity)
    // console.log(tempClass)
    return tempClass;
  };

  let content = (
    <form className={classes.form} onSubmit={confirmHandler}>
      {/* <div className={formInputValidity.name ? "": classes.invalid}> */}
      <div className={validityClass(formInputValidity.name)}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {formInputValidity.name && <p>Please enter correct name</p>}
      </div>
      <div className={validityClass(formInputValidity.street)}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {formInputValidity.street && <p>Please enter correct street</p>}
      </div>
      <div className={validityClass(formInputValidity.postal)}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {formInputValidity.postal && <p>Please enter correct postal</p>}
      </div>
      <div className={validityClass(formInputValidity.city)}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {formInputValidity.city && <p>Please enter correct city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );

  if (isDataSubmitted) {
    if (isLoading) content = <p>Sending data to server ...</p>;
    else if (error) content = <p>{error}</p>;
    else
      content = (
        <div className={classes.actions}>
          <p>Order placed successfully</p>
          <button type="button" onClick={props.onCancel}>
            Close
          </button>
        </div>
      );
  }
  return content;
};

export default Checkout;
