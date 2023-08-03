import React from "react";
import Product from "../product/index";
import ProductDetails from "../productDetails/index"; 
import "./index.css";

class ProductListing extends React.Component {
  state = {
    selectedProduct: null,
    similarProducts: [],
  };

  handleProductClick = (productId) => {
    //console.log(productId, "yessss")
    let product = this.props.productLis.filter(p => p.product_id === productId)[0]
    //console.log(product)
    const similarProducts = this.props.productLis.filter(
      (p) => p.category === product['category'] && p.product_id !== product['product_id']
    );
      //console.log(similarProducts)
    this.setState({
      selectedProduct: product,
      similarProducts: similarProducts.slice(0, 3), 
    });
  };

  render() {
    const { productLis } = this.props;
    const { selectedProduct, similarProducts } = this.state;
    console.log(similarProducts)

    return (
      <>
        {!selectedProduct&&<div id="product-listing" className="mb-3">
          <h2>Featured Products</h2>
          <div className="products">
            {productLis.map((product) => (
              <Product
                key={product.product_id}
                product={product}
                letGotoCart={this.props.letGotoCart}
                updateItemsInCart={this.props.updateItemsInCart}
                handleProductClick = {this.handleProductClick}
              />
            ))}
          </div>
        </div>}
       
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            addToCart={this.props.letAddToCart}
            similarProducts={similarProducts}
          />
        )}
      </>
    );
  }
}

export default ProductListing;


