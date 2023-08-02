import './index.css'

const Signup = (props) => {
  const {cancelSignUp} = props

  return (
    <div>
        <div className="signup-popup">
          <div className="signup-form">
          <h2 className='text-balck'>signup</h2>
            <form >
              <label>
                Username:
                <input
                  type="text"
                  placeholder='Enter Your Full Name'
                  
                />
              </label>
              <label>
                Mobile-Number:
                <input
                  type="text"
                  placeholder='Enter Your number'
                  
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  placeholder='Enter Your email'
                  required  
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  placeholder='Set Your Password'
                  required  
                />
              </label>
              <label>
                Retype-Password:
                <input
                  type="password"
                  placeholder='Retype Your Password'
                  required  
                />
              </label>
              <label>
                Adderss:
                <input
                  type="text"
                  placeholder='Add Your Adderss'
                  required  
                />
              </label>
              <div className="button-container">
                <button type="submit">Submit</button>
                <button type="button" onClick={cancelSignUp}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      
    </div>
  );
};

export default Signup;