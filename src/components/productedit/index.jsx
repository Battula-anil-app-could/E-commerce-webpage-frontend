
import './index.css'

const EditProduct = (props) => {

  const getEditProduct = async(event) => {
    event.preventDefault();
    console.log("hi")
    
  }
  const cancelEditProduct = () => {
    console.log("cenacle product edit")
  }

  return (
    <div>
        <div className="product-edit-popup">
          <div className="product-edit-form">
          <h2 className='text-balck'>signup</h2>
            <form >
              <label>
                Product Name:
                <input
                  id='name'
                  type="text"
                  placeholder='Enter Product Name'
                  required 
                  
                />
              </label>
              <label>
                category:
                <input
                  id='category'
                  type="text"
                  placeholder='Enter category'
                  required 
                  
                />
              </label>
              <label>
              description:
                <input
                   id='description'
                  type="text"
                  placeholder='Enter description'
                  required 
                />
              </label>
              <label>
              image Url:
                <input
                   id='image-url'
                  type="text"
                  placeholder='Enter image Url'
                  required  
                />
              </label>
              <label>
              Price:
                <input
                  id='price'
                  type="number"
                  placeholder='Enter Price'
                  required  
                />
              </label>
              <center><p id="error-msg"></p></center>
              <div className="button-container">
                <button type="submit" onClick={getEditProduct}>Submit</button>
                <button type="button" onClick={cancelEditProduct}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      
    </div>
  );
};

export default EditProduct;