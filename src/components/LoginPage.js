import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authenticateUser } from "../apis/UserApis";
import { storeToken, getTokenFromStorage, storeUserIdLocally, getUserIdFromStorage } from "../TokenLogic/tokenLogic";


export default function LoginPage(){
    const navigate = useNavigate();

    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: ""
    })

   

    function handleLoginTextInput(e){
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    }

    function logUserIn(){
        authenticateUser(userCredentials)
         .then((response) => {
            const token = response.headers.get("Authorization")
            storeToken(token)
            return response.json()
        })
         .then((data) => {
            storeUserIdLocally(data)
         })
         console.log("User ID = ", getUserIdFromStorage())
    }

    
    

    function redirectToSignUpPage(){
        navigate('/SignUpPage');
    }

    return(
        <>
        <h1>Login</h1>
        <form>
            <label>Email</label>
                <input
                    name="email"
                    placeholder="Enter your email address"
                    required
                    value={userCredentials.email}
                    onChange={handleLoginTextInput}
                /> 
            <label>Password</label>
                <input
                    name="password"
                    placeholder="Enter your password"
                    required
                    value={userCredentials.password}
                    onChange={handleLoginTextInput}
                /> 
            <button type="submit" onClick={(e) => {
            e.preventDefault();
            logUserIn();
          }}>Sign In</button> 
            <button onClick={redirectToSignUpPage} type="submit">Sign Up</button>
        </form>
        
        </>
    );
}