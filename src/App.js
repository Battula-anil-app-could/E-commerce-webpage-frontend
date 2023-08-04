import * as React from 'react';
import  NavBAr from "./components/navBar/index"

import Product from "./components/product/index"
import Cart from "./components/cart/index"
import ProductDetails from "./components/productDetails/index"
import "./App.css"
import axios from 'axios';
class App extends React.Component{
  

  state = {
    productLis: [], 
    isGetProducts: false, 
    isClickOnGotocartOrProductDetails:false, 
    itemsCoubtInCart: localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")).length : 0,
    selectedProduct: false,
    similarProducts: []
  }
 

  // admininsertData = () => {
  //   const products = [
  //     {
  //       id: 1,
  //       name: "T-Shirt",
  //       price: 1900.99,
  //       imageUrl: "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/7/q/w/s-all-rbc-white-one-nb-nicky-boy-original-imagjz5bgpmhcaea.jpeg?q=70",
  //       description: "A comfortable and stylish t-shirt.",
  //       category: "Clothing",
  //     }     
  //   ];

  //   products.map(async eachOne => {
  //     const params = new URLSearchParams();
  //     params.append("name", eachOne.name)
  //     params.append("price", eachOne.price);
  //     params.append("imageUrl", eachOne.imageUrl);
  //     params.append("description", eachOne.description);
  //     params.append("category", eachOne.category);

  //     const response = await axios.post("http://localhost:8083/e-commerces-backend/backend.php/insert", params.toString())
  //     console.log(response.data)
  //   })
    

  // }
  
  

  filterCartProductsInHome = (productsWithCartItems) => {
    this.setState({productLis: productsWithCartItems, itemsCoubtInCart: localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")).length : 0})
  }

   backToHomePage = () =>{
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (user === null){
      const {productLis} = this.state
      console.log("working backHome function")
      let planeProducts = productLis.map((eachOne) => ({
        ...eachOne,
        cartItem: false,
      }));
      this.setState({isClickOnGotocartOrProductDetails: false, productLis: planeProducts })
    }else{
      this.setState({isClickOnGotocartOrProductDetails: false})
    }
    
  }
 
  productsData = async () => {
    const response = await axios.get("http://localhost:8083/e-commerces-backend/backend.php/products");
    let products = response.data.map(eachOne => {
      eachOne['cartItem'] = false;
      return eachOne;
    });
    
    this.setState({ productLis: products, isGetProducts: true });
    
  }
  
  handleProductClick = (productId) => {
    const {productLis} = this.state
    let product = productLis.filter(p => p.product_id === productId)[0]
    //console.log(product)
    const similarProducts = productLis.filter(
      (p) => p.category === product['category'] && p.product_id !== product['product_id']
    );
      //console.log(similarProducts)
    this.setState({
      selectedProduct: product,
      similarProducts: similarProducts.slice(0, 6),
      isClickOnGotocartOrProductDetails: true 
    });
  };

  letGotoCart = () => {
    this.setState({isClickOnGotocartOrProductDetails: true, selectedProduct: false})
  }

  updateItemsInCart = () => {
    let countOfCart = JSON.parse(localStorage.getItem("productsInCart")).length
    this.setState({itemsCoubtInCart: countOfCart})
  }

  letAddToCart = async (productId) =>{
    //console.log(product['cartItem'])
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (user !== null){
      const {productLis} = this.state
      let product = productLis.filter(p => p.product_id === productId)[0]
      product['cartItem'] = true
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
          this.updateItemsInCart()
        }
    }
    
  }

  removeItemFromCart = async(productId) => {
    const {productLis} = this.state
    let product = productLis.filter(p => p.product_id === productId)[0]
    product['cartItem'] = false
    const user = JSON.parse(localStorage.getItem("userDetails"));
    const userId = user.id
    let params = new URLSearchParams();
    params.append("productId", productId);
    params.append("userId", userId);
    console.log(userId)
    console.log(productId)
    let response = await axios.delete(`http://localhost:8083/e-commerces-backend/backend.php/removeFromCart/cart?userId=${4}&productId=${1}`)
    console.log(response.data)
    if(response.data.message === "Success"){   
        this.updateItemsInCart()
      }
   }

  componentDidMount(){   
    this.productsData()
  }

  render(){
    const {productLis, isGetProducts, isClickOnGotocartOrProductDetails, itemsCoubtInCart, selectedProduct, similarProducts} = this.state;
    //isGetProducts&&console.log(productLis)
    return(
      <>
         <div className='mb-3' id='main-card'>
          {isGetProducts && <NavBAr 
          productLis = {productLis} 
          filterCartProductsInHome={this.filterCartProductsInHome}
          itemsCoubtInCart = {itemsCoubtInCart}
          letGotoCart = {this.letGotoCart}
          backToHomePage = {this.backToHomePage}
          />}
          {!isGetProducts&&<NavBAr />}
          {!isClickOnGotocartOrProductDetails?<div id="product-listing" className="mb-3">
            <h2>Featured Products</h2>
            <div className="products">
              {productLis.map((product) => (
                <Product
                  key={product.product_id}
                  product={product}
                  letGotoCart={this.letGotoCart}
                  letAddToCart={this.letAddToCart}
                  handleProductClick = {this.handleProductClick}
                />
              ))}
            </div>
          </div>:!selectedProduct?<Cart 
            backToHomePage={this.backToHomePage} 
            removeItemFromCart = {this.removeItemFromCart}
            />: <div id="product-listing">
            <ProductDetails
              product={selectedProduct}
              similarProducts={similarProducts}
              letGotoCart={this.letGotoCart}
              letAddToCart={this.letAddToCart}
              handleProductClick = {this.handleProductClick}
            />  
          </div>} 
          
        
          </div>
      </>

     
    )
  }
}

export default App;
