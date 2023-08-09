import * as React from 'react';
import  NavBAr from "./components/navBar/index"
import Product from "./components/product/index"
import Cart from "./components/cart/index"
import ProductDetails from "./components/productDetails/index"
import AddProduct from "./components/productAdd/index"
import EditProduct from "./components/productedit/index"
import "./App.css"
import axios from 'axios';
class App extends React.Component{
  
  state = {
    productLis: [], 
    isGetProducts: false, 
    isClickOnGotocartOrProductDetails:false, 
    itemsCoubtInCart: localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")).length : 0,
    selectedProduct: false,
    similarProducts: [],
    searchProducts: [],
    isClickSearchBtn: false,
    addProductForm: false,
    iseditProductButtonClicked: false,
    editingProduct: null
  }
 

 
  filterCartProductsInHome = (productsWithCartItems) => {
    //console.log(productsWithCartItems)
    const {similarProducts, selectedProduct} = this.state 
    let productsInCart = JSON.parse(localStorage.getItem("productsInCart"))
    let productIds = productsInCart.map(eachOne => eachOne.product_id)
    if (similarProducts !== []){
      let updatedSimlarProducts = similarProducts.map(eachItem => {
        if (productIds.includes(eachItem.product_id)){
          let itemInCart = productsInCart.filter(eachProduct => eachProduct.product_id === eachItem.product_id)[0]
          return itemInCart
        }else{
          return eachItem
        }
      })
      this.setState({productLis: productsWithCartItems, itemsCoubtInCart: localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")).length : 0,  similarProducts: updatedSimlarProducts})
    }else{
      this.setState({productLis: productsWithCartItems, itemsCoubtInCart: localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")).length : 0})
    }

    if (selectedProduct !== false){
      if (productIds.includes(selectedProduct.product_id)){
        let selectedProductInCart = productsInCart.filter(eachProduct => eachProduct.product_id === selectedProduct.product_id)[0]
        this.setState({selectedProduct: selectedProductInCart})
      }
    }
    
  }

  addCartItemsFromLocalStore = (products) => {
    //console.log(products)
    let productsInCart = JSON.parse(localStorage.getItem("productsInCart"))
    let productsIds = productsInCart.map(p=>p.product_id)
    let productsWithCartItems = products.map((eachProduct) => ({
      ...eachProduct,
      cartItem: productsIds.includes(eachProduct.product_id),
      quantity: productsIds.includes(eachProduct.product_id)?productsInCart.filter((eachOne) => eachProduct.product_id === eachOne.product_id)[0]['quantity']:0
    }));
    console.log(productsWithCartItems)
    this.filterCartProductsInHome(productsWithCartItems)
  }
   backToHomePage = () =>{
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (user === null){
      const {productLis} = this.state
      //console.log("working backHome function")
      let planeProducts = productLis.map((eachOne) => ({
        ...eachOne,
        cartItem: false,
      }));
      this.setState({isClickOnGotocartOrProductDetails: false, productLis: planeProducts, isClickSearchBtn:false })
    }else{
      this.setState({isClickOnGotocartOrProductDetails: false, isClickSearchBtn:false})
    }
    
  }
 
  productsData = async (userInput = "") => {
    const response = await axios.get(`http://localhost:8083/e-commerces-backend/backend.php/products/product?userInput=${userInput}`);
    // console.log(response.data)
    // console.log(userInput);
    try{
      let products = response.data.map(eachOne => {
        eachOne['cartItem'] = false;
        return eachOne;
      });
      if (userInput !== ""){
        let productsIdsInCart = JSON.parse(localStorage.getItem("productsInCart"))?JSON.parse(localStorage.getItem("productsInCart")).map(eachOne => eachOne.product_id):null;
        if (productsIdsInCart !== null){
          //console.log(productsIdsInCart)
          let productsInCart = products.map(eachOne => {
            eachOne['cartItem'] = productsIdsInCart.includes(eachOne.product_id);
            return eachOne;
          });
          this.setState({searchProducts: productsInCart, isGetProducts: true, isClickSearchBtn:true});
        }
        this.setState({searchProducts: products, isGetProducts: true, isClickSearchBtn:true});
      }else{
        this.setState({ productLis: products, isGetProducts: true, isClickSearchBtn:false, searchProducts:[]});
      }
      
    }catch(err){
      console.log(err)
      this.setState({isGetProducts: true, isClickSearchBtn:false });
    }
   
    
  }
  
  handleProductClick = (product) => {
    const {productLis} = this.state
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

  updateItemsInCart = () => {
    //console.log("called updated")
    let countOfCart = JSON.parse(localStorage.getItem("productsInCart")).length
    this.setState({itemsCoubtInCart: countOfCart})
  }

  letAddToCart = async (product) =>{
    //console.log(product['cartItem'])
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (user !== null){
      const {productLis} = this.state
      product['cartItem'] = true
      product['quantity'] = 1
      //console.log(productLis)
      const userId = user.id
      let params = new URLSearchParams();
      params.append("productId", product.product_id);
      params.append("userId", userId);
      let response = await axios.post("http://localhost:8083/e-commerces-backend/backend.php/Cart", params.toString())
      if(response.data.message === "Success"){   
          let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];;
          if(productsInCart !== null){
              let  newproductsInCart = [...productsInCart, product]
              localStorage.setItem("productsInCart", JSON.stringify(newproductsInCart));
          }
          this.updateItemsInCart(productLis)
        }
    }else{
      alert("Please Login")
    }
    
  }
  letGotoCart = () => {
    this.setState({isClickOnGotocartOrProductDetails: true, selectedProduct: false})
  }

  updateQuantity = (productId, quantityValue) =>{
    const {productLis} = this.state
    let product = productLis.filter(p => p.product_id === productId)[0]
    product['quantity'] = quantityValue;
    product['price'] = product['price'] * quantityValue
    console.log(product)
    this.setState({productLis: productLis})
  }

  removeItemFromCart = async(productId) => {
    const {productLis} = this.state
    let product = productLis.filter(p => p.product_id === productId)[0]
    product['cartItem'] = false
    const user = JSON.parse(localStorage.getItem("userDetails"));
    const userId = user.id
    let response = await axios.delete(`http://localhost:8083/e-commerces-backend/backend.php/Cart/user?userId=${userId}&productId=${productId}`)
    //console.log(response)
    if(response.data.message === "Success"){  
        this.updateItemsInCart()
      }
   }

  componentDidMount(){   
    this.productsData()
  }
  showAddProductFrom = () => {
    this.setState({addProductForm: true})
  }
  addProduct = async (userInput = "") => {
    const response =  await axios.get(`http://localhost:8083/e-commerces-backend/backend.php/products/product?userInput=${userInput}`);
    let products = response.data.map(eachOne => {
      eachOne['cartItem'] = false;
      return eachOne;
    });
    this.addCartItemsFromLocalStore(products)
    this.backToHomePage()
  }
  cancelAddProduct = () => {
    this.setState({addProductForm: false})
  }
  deleteProduct = async (productId) => {
    let {searchProducts} = this.state
    const response = await axios.delete(`http://localhost:8083/e-commerces-backend/backend.php/products/product?productId=${productId}`)
    if (response.data.message === "product Deleted Successfully"){
      let userInput = ""
      const response =  await axios.get(`http://localhost:8083/e-commerces-backend/backend.php/products/product?userInput=${userInput}`);
      let products = response.data.map(eachOne => {
        eachOne['cartItem'] = false;
        return eachOne;
      });
      if (searchProducts !== []){
        let filterSearcproducts = searchProducts.filter(p => p.product_id !== productId)
        this.setState({searchProducts: filterSearcproducts})
      }
      this.addCartItemsFromLocalStore(products)
    }
  }
  editProductButtonClicked = async (product) => {
    //console.log(product)
    this.setState({iseditProductButtonClicked: true, editingProduct: product})
  }
  cancelEditProduct = () => {
    this.setState({iseditProductButtonClicked: false, editingProduct: null})
  }
  isEditproductInDAtaBase = async(product) => {
    let productId = product.product_id
    console.log(productId)
    // const response = await axios.put(`http://localhost:8083/e-commerces-backend/backend.php/products/product?productId=${productId}`)
    // // if (response.data.message === "product Deleted Successfully"){
    // //   this.productsData()
    // // }
    // console.log(response.data)
  } 
  render(){
    const {productLis,editingProduct, iseditProductButtonClicked, isClickSearchBtn,addProductForm, isGetProducts, isClickOnGotocartOrProductDetails, itemsCoubtInCart, selectedProduct, similarProducts, searchProducts} = this.state;
    console.log(productLis)
    console.log("above one is from")
    let renderProducts;
    if (isClickSearchBtn === false){
      renderProducts = productLis
    }else{
      renderProducts = searchProducts
    }
    return(
        <div className='mb-3'  id='main-card'>
          {isGetProducts && <NavBAr 
            productLis = {productLis} 
            filterCartProductsInHome={this.filterCartProductsInHome}
            itemsCoubtInCart = {itemsCoubtInCart}
            letGotoCart = {this.letGotoCart}
            backToHomePage = {this.backToHomePage}
            productsData = {this.productsData}
            showAddProductFrom = {this.showAddProductFrom}
          />}
          {!isGetProducts&&<NavBAr />}
         <>
           {!isClickOnGotocartOrProductDetails?<div className='products-card'>
              <h2>Featured Products</h2>
                <div className="products">
                  {renderProducts.map((product) => (
                    <Product
                      key={product.product_id}
                      product={product}
                      letGotoCart={this.letGotoCart}
                      letAddToCart={this.letAddToCart}
                      handleProductClick = {this.handleProductClick}
                      deleteProduct = {this.deleteProduct}
                      editProductButtonClicked = {this.editProductButtonClicked}
                    />
                  ))}
                </div>
            </div>:!selectedProduct?<Cart
              productLis = {productLis} 
              backToHomePage={this.backToHomePage} 
              removeItemFromCart = {this.removeItemFromCart}
              updateQuantity = {this.updateQuantity}
              />: <div id="product-listing">
              <ProductDetails
                product={selectedProduct}
                similarProducts={similarProducts}
                letGotoCart={this.letGotoCart}
                letAddToCart={this.letAddToCart}
                handleProductClick = {this.handleProductClick}
                backToHomePage = {this.backToHomePage}
                removeItemFromCart = {this.removeItemFromCart}
                deleteProduct = {this.deleteProduct}
                editProductButtonClicked = {this.editProductButtonClicked}
              />  
            </div>}
          </> 
          {addProductForm && <AddProduct cancelAddProduct = {this.cancelAddProduct} addProduct={this.addProduct}/>}
          {iseditProductButtonClicked&& <EditProduct 
            editingProduct = {editingProduct}
            cancelEditProduct = {this.cancelEditProduct}
            isEditproductInDAtaBase = {this.isEditproductInDAtaBase}
            />}
        </div>


     
    )
  }
}

export default App;
