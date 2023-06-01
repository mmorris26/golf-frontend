import { useState } from "react";
import { createUser } from "../apis/UserApis";


export default function SignUpPage(){

    const [newUser, setNewUser] = useState({
        email: "",
        password: ""
    })
    
    function handleSignUpTextInput(e){
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    function createNewUser(){
        console.log("User object = ", newUser);
        createUser(newUser)
            .then((user) =>console.log(user))
    }
    
    return(
        
        <>
        <h1>Sign Up</h1>
        <form>
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
          }}>Sign Up</button>
        </form>
        
        </>
    );
}