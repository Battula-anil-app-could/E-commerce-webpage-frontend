import * as React from 'react';
import  NavBAr from "./components/navBar/index"
import ProductListing from "./components/homepage/index"
import Cart from "./components/cart/index"
import ProductDetails from "./components/productDetails/index"
import "./App.css"
import axios from 'axios';
class App extends React.Component{
  

  state = {
    productLis: [], 
    isGetProducts: false, 
    isClickOnGotocart:false, 
    itemsCoubtInCart: localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")).length : 0,
    selectedProduct: null
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
  letGotoCart = () => {
    this.setState({isClickOnGotocart: true})
  }

  // handleProductClick = (product) => {
  //   console.log(product)
  //   this.setState({ selectedProduct: product });
  // }

  updateItemsInCart = () => {
    let countOfCart = JSON.parse(localStorage.getItem("productsInCart")).length
    this.setState({itemsCoubtInCart: countOfCart})
  }

  filterCartProductsInHome = (productsWithCartItems) => {
    // console.log(productsWithCartItems)
    // console.log("+++++++++++++++++++++++")
    this.setState({productLis: productsWithCartItems, itemsCoubtInCart: localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")).length : 0})
  }

   backToHomePage = () =>{
    //console.log("working backHome function")
    this.setState({isClickOnGotocart: false})
  }

 

  
  productsData = async () => {
    const response = await axios.get("http://localhost:8083/e-commerces-backend/backend.php/products");
    let products = response.data.map(eachOne => {
      eachOne['cartItem'] = false;
      return eachOne;
    });
    
    this.setState({ productLis: products, isGetProducts: true });
    
  }

  componentDidMount(){   
    this.productsData()
  }

  render(){
    const {productLis, isGetProducts, isClickOnGotocart, itemsCoubtInCart, selectedProduct} = this.state;
    //isGetProducts&&console.log(productLis)
    return(
      <>
         <div className='mb-3' id='main-card'>
          {isGetProducts && <NavBAr 
          productLis = {productLis} 
          filterCartProductsInHome={this.filterCartProductsInHome}
          itemsCoubtInCart = {itemsCoubtInCart}
          letGotoCart = {this.letGotoCart}
          />}
          {!isGetProducts&&<NavBAr />}
          {!isClickOnGotocart?<ProductListing  
            productLis = {productLis} 
            letGotoCart = {this.letGotoCart}
            updateItemsInCart = {this.updateItemsInCart}
            handleProductClick = {this.handleProductClick}
          />:<Cart backToHomePage={this.backToHomePage} />} 
          {selectedProduct && ( 
            <ProductDetails product={selectedProduct} similarProducts={productLis.filter(p => p.category === selectedProduct.category && p.product_id !== selectedProduct.product_id)} />
          )}
          </div>
      </>

     
    )
  }
}

export default App;
