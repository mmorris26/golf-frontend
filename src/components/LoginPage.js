import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const navigate = useNavigate();

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
                    value=""
                /> 
            <label>Password</label>
                <input
                    name="password"
                    placeholder="Enter your password"
                    required
                    value=""
                /> 
            <button type="submit">Login</button>  
            <button onClick={redirectToSignUpPage} type="submit">Sign Up</button>
        </form>
        
        </>
    );
}