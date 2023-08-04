
import "./index.css"; 

const CartItem = ({ product, updateQuantity, removeItem }) => {
  
  return (
    <div className="cart-item-container">
      <div className="item-image">
        <img src={product.img_url} alt={product.name} />
      </div>
      <div className="item-details">
        <h3 className="item-name">{product.name}</h3>
        <p className="item-description">{product.description}</p>
        <div className="item-controls">
          <span className="item-price">${product.price.toFixed(2)}</span>
          <select
            className="quantity-select"
            value={1}
            onChange={(e) => updateQuantity(product.product_id, e.target.value)}
          >
            {Array.from({ length: 10 }, (_, index) => index + 1).map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
          <button className="buy-button" >
            Buy
          </button>
          <button className="remove-button" onClick={() => {removeItem(product.product_id)}}> 
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

