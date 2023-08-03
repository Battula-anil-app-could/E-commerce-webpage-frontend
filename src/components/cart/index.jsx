
import { useEffect, useState } from "react";
import CartItem from "../cartItem/index";
import "./index.css";

const Cart = (props) => {
  const { backToHomePage, updateQuantity, removeItem } = props;
  const [cartItems, setcartItems] = useState([]);

  useEffect(() => {
    setcartItems(JSON.parse(localStorage.getItem("productsInCart")));
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item.product_id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
          <div>
          <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
          <button className="buy-button btn btn-success">Buy</button>
          <button className="back-button btn btn-danger m-3" onClick={backToHomePage}>BAck to Home</button>
          </div>
          
        </>
      )}
    </div>
  );
};

export default Cart;

