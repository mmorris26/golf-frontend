import { useState } from "react";
import { createUser } from "../apis/UserApis";
import { Navigate, useNavigate } from "react-router-dom";


export default function SignUpPage(){

    const navigate = useNavigate()

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    
    function handleSignUpTextInput(e){
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    function createNewUser(){
        createUser(newUser)
            .then((user) =>user.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error))
    }
    
    function redirectToLoginPage(){
        navigate('/');
    }

    return(
        
        <>
        <h1>Sign Up</h1>
        <form>
        <label>Name</label>
                <input
                    name="name"
                    placeholder="Enter your name"
                    required
                    value={newUser.name}
                    onChange={handleSignUpTextInput}
                /> 
            <label>Email</label>
                <input
                    name="email"
                    placeholder="Enter your email address"
                    required
                    value={newUser.email}
                    onChange={handleSignUpTextInput}
                /> 
            <label>Password</label>
                <input
                    name="password"
                    placeholder="Enter your password"
                    required
                    value={newUser.password}
                    onChange={handleSignUpTextInput}
                />
            <button type="submit" onClick={(e) => {
            e.preventDefault();
            createNewUser();
            redirectToLoginPage();
          }}>Sign Up</button>
        </form>
        
        </>
    );
}