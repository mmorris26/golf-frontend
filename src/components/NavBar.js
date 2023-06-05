import { Link, useNavigate } from 'react-router-dom'

export default function NavBar(){
    return(
        <>
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
        </>
    );
}