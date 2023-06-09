import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../apis/UserApis';

export default function NavBar(){
    
    const navigate = useNavigate();

    //function to log user out when clicking log out button.
    function logOutUser(){
        logOut()
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                navigate('/')
            })
    }
    
    return(
    <div className='nav-bar'>
        <>
        <div className="nav-bar-elements">
            <Link to='/'>Login</Link>
            &nbsp; | &nbsp;
            <Link to='SignUpPage'>Sign Up</Link>
            &nbsp; | &nbsp;
            <Link to='CoursePage'>Course</Link>
            &nbsp; | &nbsp;
            <Link to='RoundPage'>Round</Link>
            &nbsp; | &nbsp;
            <Link to='RoundSummaryPage'>Round Summary</Link>
            &nbsp; | &nbsp;
            <Link to='SummaryPage'>Results</Link>
            &nbsp; | &nbsp;
            <button onClick={logOutUser} className="btn btn-warning">Log Out</button>
        </div>
        </>
        </div>
    );
}