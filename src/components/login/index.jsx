import './index.css'

const Login = (props) => {
  const {CancelLogin} = props

  return (
    <div>
        <div className="login-popup">
          <div className="login-form">
            <form >
            <h2 className='text-balck'>Login</h2>
              <label>
                Email:
                <input
                  type="text"
                  placeholder='Enter Your Email'
                  
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  placeholder='Enter Your Password'
                  
                />
              </label>
              <div className="button-container">
                <button type="submit">Submit</button>
                <button type="button" onClick={CancelLogin}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      
    </div>
  );
};

export default Login;
