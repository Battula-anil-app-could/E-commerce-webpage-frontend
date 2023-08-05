import './index.css'
const Product = (props) => {

    const {product, letGotoCart, letAddToCart, handleProductClick} = props   
  
    return(
        
        <div className="product"  >
            <button id={`cardbtn${product.product_id}`} className = "product-btn"onClick={() => {handleProductClick(product)}}>
                <img src={product.img_url} alt={product.name} className="product-img"/>
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>{product.description}</p>
                <p>${product.price.toFixed(2)}</p>
            </button>
            {!product['cartItem']?<button type="button" className="addingToCartBtn"id={`cartbtn${product.product_id}`} onClick={() => {letAddToCart(product)}}>Add to Cart</button>:
            <button id="go-cart" onClick={letGotoCart}>Go to Cart</button >}  
        </div>     
        
    )
}

export default Product