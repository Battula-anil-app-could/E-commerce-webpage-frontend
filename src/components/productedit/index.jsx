
import { useState } from 'react';
import './index.css'

const EditProduct = ({editingProduct, cancelEditProduct, isEditproductInDAtaBase}) => {
  const [product, setproduct] = useState(editingProduct)
  const getEditProduct = async(event) => {
    event.preventDefault();
    isEditproductInDAtaBase(product)
    
  }
  const handelName = (event) => {
    setproduct({...product, name: event.target.value})
  }
  const handeldescription = (event) => {
    setproduct({...product, description: event.target.value})
  }
  const handelimag = (event) => {
    setproduct({...product, img_url: event.target.value})
  }
  const handelCategory = (event) => {
    setproduct({...product, category: event.target.value})
  }
  const handelPrice = (event) => {
    setproduct({...product, price: event.target.value})
  }

  return (
    <div>
        <div className="product-edit-popup">
          <div className="product-edit-form">
          <h2 className='text-balck'>Product Edit</h2>
            <form >
              <label>
                Product Name:
                <input
                  id='name'
                  type="text"
                  placeholder='Enter Product Name'
                  value={product.name || ""}
                  onChange={handelName} 
                  
                />
              </label>
              <label>
              description:
                <input
                   id='description'
                  type="text"
                  placeholder='Enter description'
                  value = {product.description || ""}
                  onChange={handeldescription} 
                />
              </label>
              <label>
                Category:
                <input
                  id='categorys'
                  type="text"
                  placeholder='Enter Product Name'
                  value = {product.category || ""}
                  onChange={handelCategory} 
                  
                />
              </label>
              <label>
              image Url:
                <input
                   id='image-url'
                  type="text"
                  placeholder='Enter image Url'
                  value = {product.img_url || ""} 
                  onChange={handelimag}  
                />
              </label>
              <label>
              Price:
                <input
                  id='price'
                  type="number"
                  placeholder='Enter Price'
                  value = {product.price || ""}
                  onChange={handelPrice}   
                />
              </label>
              <center><p id="error-msg"></p></center>
              <div className="button-container">
                <button type="submit" onClick={getEditProduct}>Submit</button>
                <button type="button" onClick={cancelEditProduct}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      
    </div>
  );
};

export default EditProduct;