import axios from "axios"
import './index.css';


const Login = (props) => {
  const {CancelLogin, loginSuccess} = props;
  const getLogin = async (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);
    const response = await axios.post("http://localhost:8083/e-commerces-backend/backend.php/login", params.toString());
    //console.log(response.data);
    if (response.data.message === "User Checking Success"){
      const userDetails = {
        id: response.data.user_id,
        name: response.data.user_name,
        email: response.data.email,
        adderss: response.data.adderss
      }
      localStorage.setItem("userDetails", JSON.stringify(userDetails))
      await loginSuccess()
      
    }else if (response.data.message === "Invalid Password/email"){
      document.getElementById("error-msg").textContent = "Invalid Password/email"
    }else if(response.data.message === "Please enter required email and password"){
      document.getElementById("error-msg").textContent = "Please enter required email and password"
    }
    else{
      document.getElementById("error-msg").textContent = "Error while login"
    }

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    
    
  }

  return (
    <div>
        <div className="login-popup">
          <div className="login-form">
            <form >
            <h2 className='text-balck'>Login</h2>
              <label>
                Email:
                <input
                  id='email'
                  type="text"
                  placeholder='Enter Your Email'
                  
                />
              </label>
              <label>
                Password:
                <input
                  id='password'
                  type="password"
                  placeholder='Enter Your Password'
                  
                />
              </label>
              <center><p id="error-msg"></p></center>
              <div className="button-container">
                <button type="submit" onClick={getLogin}>Submit</button>
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
