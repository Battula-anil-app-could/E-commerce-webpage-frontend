import React from "react";
import Product from '../product/index'
import "./index.css"; 

const ProductDetails = ({ product, similarProducts, letGotoCart, letAddToCart, handleProductClick}) => {

  const letAddToCarter = () => {
    //console.log("form product cart")
    letAddToCart(product.product_id)
}

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
          {!product['cartItem']?<button type="button" className="addingToCartBtn "id={`cartbtn${product.product_id}`} onClick={letAddToCarter}>Add to Cart</button>:
            <button id="go-cart" onClick={letGotoCart}>Go to Cart</button >}  
          <button id="buy-btn" className="mt-3">Buy</button>
        </div>
      </div>
      <div className="similar-products">
        <h3>Similar Products</h3>
        <div className="products">
          {similarProducts.map((product) => (
            <Product
             key={product.product_id}
             product={product}
             letGotoCart={letGotoCart}
             letAddToCart={letAddToCart}
             handleProductClick = {handleProductClick}
           />   
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;


