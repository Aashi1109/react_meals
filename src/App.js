import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meal from "./components/Meals/Meal";

import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const cartShowHandler = () => setCartIsShown(true);

  const cartHideHandler = () => setCartIsShown(false);

  return (
    <CartProvider>
      {cartIsShown && <Cart onCartHide={cartHideHandler} />}
      <Header onCartShow={cartShowHandler} />
      <main>
        <Meal />
      </main>
    </CartProvider>
  );
}

export default App;
