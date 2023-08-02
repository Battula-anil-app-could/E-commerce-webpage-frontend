import * as React from 'react';
import  NavBAr from "./components/navBar/index"
import ProductListing from "./components/homepage/index"
import "./App.css"
import axios from 'axios';
class App extends React.Component{

  insertData = () => {
    const products = [
      {
        id: 1,
        name: "T-Shirt",
        price: 1900.99,
        imageUrl: "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/7/q/w/s-all-rbc-white-one-nb-nicky-boy-original-imagjz5bgpmhcaea.jpeg?q=70",
        description: "A comfortable and stylish t-shirt.",
        category: "Clothing",
      },
      {
        id: 2,
        name: "Smartphone",
        price: 11000.99,
        imageUrl: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/c/t/4/-original-imagrqg4ahf36sng.jpeg?q=70",
        description: "A powerful smartphone with great features.",
        category: "Electronics",
      },
      {
        id: 3,
        name: "Bananas",
        price: 50.99,
        imageUrl: "https://media.cnn.com/api/v1/images/stellar/prod/120604032828-fresh-ripe-bananas.jpg?q=w_3590,h_2774,x_0,y_0,c_fill",
        description: "Fresh and delicious bananas.",
        category: "Grocery",
      },
      {
        id: 4,
        name: "Dress",
        price: 399.99,
        imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/dress/7/f/c/xs-a1204-sheetal-associates-original-imag9xt9czmjmzrz-bb.jpeg?q=70",
        description: "A beautiful dress for special occasions.",
        category: "Clothing",
      },
      {
        id: 5,
        name: "Laptop",
        price: 89999.99,
        imageUrl: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/b/d/i/-original-imagzhefhc84rmbf.jpeg?q=70",
        description: "A high-performance laptop for work and gaming.",
        category: "Electronics",
      },
      {
        id: 6,
        name: "Apples",
        price: 100.49,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40033824_21-fresho-apple-red-delicious-regular.jpg",
        description: "Fresh and juicy apples.",
        category: "Grocery",
      },
      {
        id: 7,
        name: "Jeans",
        price: 549.99,
        imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/jean/l/j/e/-original-imagjcgcwfhbdhjp.jpeg?q=70",
        description: "Classic denim jeans for everyday wear.",
        category: "Clothing",
      },
      {
        id: 8,
        name: "Headphones",
        price: 979.99,
        imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/g/y/i/-original-imagr6pfsnrp6mzy.jpeg?q=70",
        description: "High-quality headphones for immersive sound.",
        category: "Electronics",
      },
      {
        id: 9,
        name: "Milk",
        price: 20.99,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Oat_milk_glass_and_bottles.jpg/640px-Oat_milk_glass_and_bottles.jpg",
        description: "Fresh and nutritious milk.",
        category: "Grocery",
      },
      {
        id: 10,
        name: "Sweater",
        price: 599.99,
        imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/shrug/2/z/n/m-1-lc12171018rl-rigo-original-imaggrfvnhgngkbg.jpeg?q=70",
        description: "Cozy sweater for chilly days.",
        category: "Clothing",
      },
      {
        id: 11,
        name: "Wireless Mouse",
        price: 299.99,
        imageUrl: "https://rukminim2.flixcart.com/image/416/416/kw9krrk0/mouse/v/p/h/toad-13-portronics-original-imag8zbqqkgmb9d6.jpeg?q=70",
        description: "Ergonomic wireless mouse for smooth control.",
        category: "Electronics",
      },
      {
        id: 12,
        name: "Bread",
        price: 28.49,
        imageUrl: "https://assets.bonappetit.com/photos/5c62e4a3e81bbf522a9579ce/16:9/w_4000,h_2250,c_limit/milk-bread.jpg",
        description: "Freshly baked bread.",
        category: "Grocery",
      },
      {
        id: 13,
        name: "Sneakers",
        price: 799.99,
        imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/j/f/e/-original-imaggcb2zh9kwuga.jpeg?q=70",
        description: "Stylish sneakers for everyday comfort.",
        category: "Clothing",
      },
      {
        id: 14,
        name: "Tablet",
        price: 39999.99,
        imageUrl: "https://rukminim2.flixcart.com/image/312/312/l1v1uvk0/tablet/9/c/s/6650034-realme-original-imagdc5ac3y7xgxh.jpeg?q=70",
        description: "Versatile tablet for work and entertainment.",
        category: "Electronics",
      },
      {
        id: 15,
        name: "Eggs",
        price: 30.99,
        imageUrl: "https://www.licious.in/blog/wp-content/uploads/2022/01/eggs-1-1024x1024.jpg",
        description: "Fresh and organic eggs.",
        category: "Grocery",
      },
      {
        id: 16,
        name: "Jacket",
        price: 699.99,
        imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/w/d/j/m-6017-triptee-original-imaghhsjayqp6vum.jpeg?q=70",
        description: "Stylish jacket for cold weather.",
        category: "Clothing",
      },
      {
        id: 17,
        name: "Smart TV",
        price: 79999.99,
        imageUrl: "https://rukminim2.flixcart.com/image/312/312/xif0q/television/h/o/h/cq4300fhdab-compaq-original-imaggarg46b6vshe.jpeg?q=70",
        description: "High-definition smart TV with streaming capabilities.",
        category: "Electronics",
      },
      {
        id: 18,
        name: "Oranges",
        price: 15.29,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Oranges_-_whole-halved-segment.jpg/640px-Oranges_-_whole-halved-segment.jpg",
        description: "Juicy and sweet oranges.",
        category: "Grocery",
      },
      {
        id: 19,
        name: "Sweatshirt",
        price: 399.99,
        imageUrl: "https://rukminim2.flixcart.com/image/612/612/k2gh30w0/sweatshirt/g/w/g/l-hlss000087-highlander-original-imafhsw8yhdfnbcz.jpeg?q=70",
        description: "Warm and comfortable sweatshirt.",
        category: "Clothing",
      },
      {
        id: 20,
        name: "Camera",
        price: 59999.99,
        imageUrl: "https://rukminim2.flixcart.com/image/312/312/kf75fgw0/sports-action-camera/n/x/f/hero-9-hero-chdhx-901-gopro-original-imafvzw4qhgprxhh.jpeg?q=70",
        description: "High-quality camera for capturing memories.",
        category: "Electronics",
      },
      {
        id: 21,
        name: "Rice",
        price: 1000.49,
        imageUrl: "https://www.bigbasket.com/media/uploads/p/l/40075897_12-bb-royal-sona-masoori-rice-raw-rice-super-premium.jpg?tr=w-640,q=80",
        description: "Premium quality rice.",
        category: "Grocery",
      },
      {
        id: 22,
        name: "Summer Dress",
        price: 299.99,
        imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/dress/q/d/c/xl-gr6379-pink-harpa-original-imagmfujbfuyfd5g.jpeg?q=70",
        description: "Light and fashionable summer dress.",
        category: "Clothing",
      },
      {
        id: 23,
        name: "Bluetooth Speaker",
        price: 4999.99,
        imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/speaker/v/0/p/-original-imagrma335ggctzh.jpeg?q=70",
        description: "Portable Bluetooth speaker for music on-the-go.",
        category: "Electronics",
      },
      {
        id: 24,
        name: "Coffee beans",
        price: 499.99,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/640px-Roasted_coffee_beans.jpg",
        description: "Rich and aromatic coffee beans.",
        category: "Grocery",
      },
      {
        id: 25,
        name: "Formal Shirt",
        price: 344.99,
        imageUrl: "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/5/z/j/3xl-13-lstr-wine-vtexx-original-imagnzbu3hm4uhce.jpeg?q=70",
        description: "Elegant formal shirt for business occasions.",
        category: "Clothing",
      },
      {
        id: 26,
        name: "Gaming Console",
        price: 4999.99,
        imageUrl: "https://rukminim2.flixcart.com/image/612/612/ksnjp8w0/handheld-gamng-console/j/u/x/hdmi-game-stick-video-game-console-built-in-10000-classic-games-original-imag65hsdzwzaerq.jpeg?q=70",
        description: "Powerful gaming console for immersive gaming.",
        category: "Electronics",
      },
      {
        id: 27,
        name: "Pasta",
        price: 200.79,
        imageUrl: "https://www.vegrecipesofindia.com/wp-content/uploads/2017/02/white-sauce-pasta-recipe-9.jpg",
        description: "Delicious and easy-to-cook pasta.",
        category: "Grocery",
      },
      {
        id: 28,
        name: "Hoodie",
        price: 899.99,
        imageUrl: "https://rukminim2.flixcart.com/image/832/832/xif0q/sweatshirt/g/h/o/xxl-kttwomensweatshirt180-kotty-original-imaghnyptnzhzudw.jpeg?q=70",
        description: "Casual and stylish hoodie for everyday wear.",
        category: "Clothing",
      },
      {
        id: 29,
        name: "Digital Watch",
        price: 899.99,
        imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/7/0/w/3-gl-225-combo-of-3-black-blue-red-hala-girls-original-imagp4gmu4h8ggkq.jpeg?q=70",
        description: "Sleek and modern digital watch.",
        category: "Electronics",
      },
      {
        id: 30,
        name: "Tea leaves",
        price: 50.19,
        imageUrl: "https://m.media-amazon.com/images/I/61aZWX+8nbL.jpg",
        description: "Aromatic and soothing tea leaves.",
        category: "Grocery",
      },
      
    ];

    products.map(async eachOne => {
      const params = new URLSearchParams();
      params.append("name", eachOne.name)
      params.append("price", eachOne.price);
      params.append("imageUrl", eachOne.imageUrl);
      params.append("description", eachOne.description);
      params.append("category", eachOne.category);

      const response = await axios.post("http://localhost:8083/e-commerces-backend/backend.php/insert", params.toString())
      console.log(response.data)
    })
    

  }
  

  render(){
    return(
      <>
      <button onClick={this.insertData}>insert</button>
         {/* <div className='mb-3' id='main-card'>
          <NavBAr />
          <ProductListing />
          </div> */}
      </>

     
    )
  }
}

export default App;
