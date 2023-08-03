import React from "react";
import "./index.css"; 

const ProductDetails = ({ product, similarProducts }) => {
  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-image">
          <img src={product.img_url} alt={product.name} />
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p>Category: {product.category}</p>
          <p>{product.description}</p>
          <p>${product.price.toFixed(2)}</p>
          <button className="buy-button btn btn-success">Buy</button>
        </div>
      </div>
      <div className="similar-products">
        <h3>Similar Products</h3>
        <div className="products">
          {similarProducts.map((product) => (
            <div key={product.product_id} className="similar-product">
              <img src={product.img_url} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;


