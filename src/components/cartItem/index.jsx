
import "./index.css"; 

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="cart-item-container">
      <div className="item-image">
        <img src={item.img_url} alt={item.name} />
      </div>
      <div className="item-details">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-description">{item.description}</p>
        <div className="item-controls">
          <span className="item-price">${item.price.toFixed(2)}</span>
          <select
            className="quantity-select"
            value={1}
            onChange={(e) => updateQuantity(item.product_id, e.target.value)}
          >
            {Array.from({ length: 10 }, (_, index) => index + 1).map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
          <button className="btn btn-success" >
            Buy
          </button>
          <button className="remove-button">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

