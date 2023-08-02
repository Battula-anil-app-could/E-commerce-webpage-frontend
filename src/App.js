import * as React from 'react';
import  NavBAr from "./components/navBar/index"
import ProductListing from "./components/homepage/index"
import "./App.css"
import axios from 'axios';
class App extends React.Component{

  state = {productLis: []}

  constructor(){
    super();
    this.productsData = async() => {
      const response = await axios.get("http://localhost:8083/e-commerces-backend/backend.php/products");
      this.setState({productLis: response.data})
    }
    this.productsData()
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

  render(){
    const {productLis} = this.state;
    return(
      <>
         <div className='mb-3' id='main-card'>
          <NavBAr />
          <ProductListing  productLis = {productLis} key={2}/>
          </div>
      </>

     
    )
  }
}

export default App;
