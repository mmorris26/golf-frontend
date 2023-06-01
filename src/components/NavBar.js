import { Link, useNavigate } from 'react-router-dom'

export default function NavBar(){
    return(
        <>
            <Link to='/'>Login</Link>
            &nbsp; || &nbsp;
            <Link to='SignUpPage'>Sign Up</Link>
        </>
    );
}