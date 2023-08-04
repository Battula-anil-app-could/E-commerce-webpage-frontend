
import { useEffect, useState } from "react";
import CartItem from "../cartItem/index";
import "./index.css";

const Cart = (props) => {
  const { backToHomePage, updateQuantity, removeItemFromCart} = props;
  const [cartItems, setcartItems] = useState(JSON.parse(localStorage.getItem("productsInCart"))?JSON.parse(localStorage.getItem("productsInCart")):[]);

  const removeItem = (productId) => {
    let oldProductsInCart = JSON.parse(localStorage.getItem("productsInCart"))
    let remaingProductsInCart = oldProductsInCart.filter(eachOne => eachOne.product_id !== productId)
    localStorage.setItem("productsInCart", JSON.stringify(remaingProductsInCart))
    setcartItems(remaingProductsInCart)
    removeItemFromCart(productId)
  }

  // useEffect(() => {
  //   setcartItems(JSON.parse(localStorage.getItem("productsInCart")));
  // }, []);
 
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Cart is empty</p>
      ) : (
        <>
          {cartItems.map((product) => (
            <CartItem
              key={product.product_id}
              product={product}
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

