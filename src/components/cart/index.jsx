
import {useState } from "react";
import CartItem from "../cartItem/index";
import "./index.css";

const Cart = (props) => {
  const {removeItemFromCart, productLis} = props;
  const [cartItems, setcartItems] = useState(JSON.parse(localStorage.getItem("productsInCart"))?JSON.parse(localStorage.getItem("productsInCart")):[]);

  const removeItem = (productId) => {
    let oldProductsInCart = JSON.parse(localStorage.getItem("productsInCart"))
    let remaingProductsInCart = oldProductsInCart.filter(eachOne => eachOne.product_id !== productId)
    localStorage.setItem("productsInCart", JSON.stringify(remaingProductsInCart))
    setcartItems(remaingProductsInCart)
    removeItemFromCart(productId)
  }

  const updateQuantity = (productId, quantityValue) =>{
    let productInCart = JSON.parse(localStorage.getItem("productsInCart"))
    let product = productInCart.filter(p => p.product_id === productId)[0]
    let orginalPrice = productLis.filter(p => p.product_id === productId)[0]["price"]
    product['quantity'] = quantityValue;
    product['price'] = orginalPrice * quantityValue
    localStorage.setItem("productsInCart", JSON.stringify(productInCart))
    setcartItems(productInCart)
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      {cartItems.length === 0 ? (
        <>
          <p className="empty-cart-message">Cart is empty</p>
          <div className="empty-card">
            <img src="https://www.nicepng.com/png/detail/231-2317775_no-products-in-cart-empty-shopping-cart-icon.png" className="Cart-empty-pic" alt="empty"/>
          </div>
        </>
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
          <div className="item-summery-card">
          <p className="total-price">Total Price: &#x20B9;{totalPrice.toFixed(2)}</p>
          <hr/>
          <button className="buy-button m-3">Place Your Order</button>
          </div>
          
        </>
      )}
    </div>
  );
};

export default Cart;

