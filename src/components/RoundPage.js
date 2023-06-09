import { useEffect, useState } from "react";
import { createRound } from "../apis/RoundApis";
import { getUserIdFromStorage } from "../TokenLogic/tokenLogic";
import { isUserAuthenticated } from "../TokenLogic/tokenLogic";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function RoundPage(){
    
    const navigate = useNavigate();
    const location = useLocation();

    //state to hold the course ID 
    const [courseId, setCourseId] = useState();
    
    //state to hold the newly created round.
    const [newRound, setNewRound] = useState({
      date: '',
      holes: '',
      score: '',
      guestName: '',
      guestScore: '',
      courseId: '',
      userId: getUserIdFromStorage()
    });

    //state to hold a true or false as to whether user is logged in our not.
    //this is to apply some confitional styling.
    const [isLoggedIn, setIsLoggedIn] = useState(null);

//function that stores the rsult of teh authenticated funtion in the logged in state.
  useEffect(() => {
    
    const authenticated = isUserAuthenticated(); 
    setIsLoggedIn(authenticated);
  }, []);
 
  //function that use the location constant to check whether or not a user
  //created a course or picked one from the list of courses. USe the output to
  //set the course ID state so we know which course to attribute this round to.
    useEffect(() => {
      const createdOrClicked = () => {
        if (location.state && location.state.id1) {
          return location.state.id1;
        } else if (location.state && location.state.id) {
          return location.state.id;
        } else {
          return null;
        }
      };
  
      setCourseId(createdOrClicked());
    }, [location.state]);
  
    useEffect(() => {
      setNewRound(prevRound => ({ ...prevRound, courseId: courseId }));
    }, [courseId]);

  function handleRoundTextInput(e){
    setNewRound({ ...newRound, [e.target.name]: e.target.value });
  }

  function createNewRound(){
    createRound(newRound)
        .then((round) => round.json())
        .then((data) => {
            navigate('/RoundSummaryPage', { state: { courseId } });
        })
        

  }
    return isLoggedIn ? (
        <>
  <div className="round-page-container-div"> 
    <h1>Round</h1>
    <h1>Enter Information About Your Round</h1>
        <form>
        <div className="create-course-div">
        <div className="round-labels">
            <label>Date</label>
        </div>
        <div className="round-inputs">
                <input
                    name="date"
                    placeholder="What date did you play on?"
                    required
                    value={newRound.date}
                    onChange={handleRoundTextInput}
                /> 
        </div>
        <div className="round-labels">
            <label>Holes</label>
        </div>
        <div className="round-inputs">
                <input
                    name="holes"
                    placeholder="How many holes was it?"
                    required
                    value={newRound.holes}
                    onChange={handleRoundTextInput}
                />
        </div>
        <div className="round-labels">
            <label>Score</label>
        </div>
        <div className="round-inputs">
                <input
                    name="score"
                    placeholder="What did you shoot?"
                    required
                    value={newRound.score}
                    onChange={handleRoundTextInput}
                />
        </div>
        </div>
        
        <h1>Who Did you play With?</h1>
        <div className="round-guest-div">
            <div className="round-labels">
                <label>Guest Name</label>
            </div>
            <div className="round-inputs">
                <input
                    name="guestName"
                    placeholder="Enter your guests name"
                    required
                    value={newRound.guestName}
                    onChange={handleRoundTextInput}
                />
            </div>
            <div className="round-labels">
                <label>Score</label>
            </div>
            <div className="round-inputs">
                <input
                    name="guestScore"
                    placeholder="Enter your guests score"
                    required
                    value={newRound.guestScore}
                    onChange={handleRoundTextInput}
                />
            </div>
        </div>
            <button type="submit" className="btn btn-warning round-button" onClick={(e) => {
            e.preventDefault();
            createNewRound();
            // redirectToRoundSummaryPage();
          }}>Create Round</button>
        </form>

        


        </div>  
        </> 
        
    ) : (
        <h1 className="course-error-message-h1">Please Log in to see this page</h1>
        );

}