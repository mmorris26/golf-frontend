import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authenticateUser } from "../apis/UserApis";
import { storeToken, storeUserIdLocally } from "../TokenLogic/tokenLogic";


export default function LoginPage(){
    const navigate = useNavigate();

    //state to handle the email and password the user types in
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: ""
    })

    function handleLoginTextInput(e){
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
       
    }
//function to call the authenticate user api and rturn a token. Then store 
//the token in local storage.
    function logUserIn(){
        authenticateUser(userCredentials)
         .then((response) => {
            const token = response.headers.get("Authorization")
            storeToken(token)
            return response.json()
        })
         .then((data) => {
            storeUserIdLocally(data)
            navigate('/CoursePage')
         })
         
    }

    function redirectToSignUpPage(){
        navigate('/SignUpPage');
    }
    
    return(
        <div
      style={{
        backgroundImage: `url("https://golf.com/wp-content/uploads/2020/04/augusta-national-12-960x540.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
    <div className="login-text">
      <h1>Login</h1>
    </div>
      <div className="login-page-div">
      <form>
        <div className="login-email-label">
            <label><b>Email</b></label>
        </div>
        <div className="login-email-input">
            <input
            name="email"
            placeholder="test@test.com"
            required
            value={userCredentials.email}
            onChange={handleLoginTextInput}
            
            />
        </div>
        <div className="login-password-label">
            <label><b>Password</b></label>
        </div>
        <div className="login-password-input">
            <input
            name="password"
            type='password'
            placeholder="123456"
            required
            value={userCredentials.password}
            onChange={handleLoginTextInput}
            />
        </div>
        <div className="login-buttons">
            <button type="submit" className="btn btn-warning" onClick={(e) => {
            e.preventDefault();
            logUserIn();
            //   redirectToCoursePage()
            }}>Sign In</button>
            <button onClick={redirectToSignUpPage} type="button" className="btn btn-warning">Sign Up</button>
        </div>
      </form>
      </div>
    </div>
    );
}