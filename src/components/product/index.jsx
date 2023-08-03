import axios from "axios";
import './index.css'


const Product = (props) => {

    const {product, letGotoCart, updateItemsInCart, handleProductClick} = props 
    //console.log(isaddToCart, "++++++++")  

    
    const letAddToCart = async () =>{
        product['cartItem'] = true
        console.log(product['cartItem'])
        const user = JSON.parse(localStorage.getItem("userDetails"));
        
        if (user !== null){
            const userId = user.id
            let params = new URLSearchParams();
            params.append("productId", product.product_id);
            params.append("userId", userId);
            let response = await axios.post("http://localhost:8083/e-commerces-backend/backend.php/addToCart", params.toString())
            if(response.data.message === "Success"){   
                let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];;
                if(productsInCart !== null){
                    let  newproductsInCart = [...productsInCart, product]
                    localStorage.setItem("productsInCart", JSON.stringify(newproductsInCart));
                }
                updateItemsInCart()
            }
        }
        
    }
    const handleProductClicker = () =>{
        handleProductClick(product.product_id)
    }
    return(
        
        <div className="product"  >
            <button id={`cardbtn${product.product_id}`} className = "product-btn"onClick={handleProductClicker}>
                <img src={product.img_url} alt={product.name} className="product-img"/>
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>{product.description}</p>
                <p>${product.price.toFixed(2)}</p>
            </button>
            {!product['cartItem']?<button type="button" className="addingToCartBtn"id={`cartbtn${product.product_id}`} onClick={letAddToCart}>Add to Cart</button>:
            <button id="go-cart" onClick={letGotoCart}>Go to Cart</button >}  
        </div>     
        
    )
}

export default Product