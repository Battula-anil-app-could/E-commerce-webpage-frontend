import "./index.css"

import React from "react";

const ProductListing = (props) => {
  const {productLis} = props
  return (
    <div id="product-listing" className="mb-3">
      <h2>Featured Products</h2>
      <div className="products">
        {productLis.map((product) => (
          <div key={product.id} className="product">
            <img src={product.img_url} alt={product.name} className="product-img"/>
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
