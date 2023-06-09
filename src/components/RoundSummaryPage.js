import { useState, useEffect } from "react";
import { updateCourse, getCourseById } from "../apis/CourseApis";
import { getCurrentRound, updateRound } from "../apis/RoundApis";
import { useNavigate, useLocation } from "react-router-dom";
import { isUserAuthenticated } from "../TokenLogic/tokenLogic";


export default function RoundPageSummary(){
    
    const navigate = useNavigate();
    const location = useLocation();
   
//state to hold the values of teh  course to display on screen
    const [currentCourse, setCurrentCourse] = useState({
        name: "",
        par_score: ""
    }) 
//state to hold the values of the round just entered to display on screen.
    const [currentRound, setCurrentRound] = useState({
        date: '',
        number_of_holes:"",
        score: "",
        guest_name: "",
        guest_score: "",
    })

//state to hold a boolean that toggels the edit class display to true.
    const[editInformation, setEditInformation] = useState(false)

//state to hold a boolean that toggles the class as to wether user is logged in or not.
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    //function that checks if a user is authenticated and sets teh state
    useEffect(() => {
        const authenticated = isUserAuthenticated(); 
        setIsLoggedIn(authenticated);
      }, []);
      
//function that gets the course that was clicked or created based on the use naviageteID
// then gests the round that was just crated and displays both on screen

    useEffect(() => {
        if (location.state && location.state.courseId) {
          getCourseById(location.state.courseId)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setCurrentCourse(data);
            });
        }
    
        getCurrentRound()
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setCurrentRound(data);
          });
      }, [location.state]);

//function to handle the toggling of the edit class
    function toggleEdit(){
        setEditInformation(!editInformation)
    }

//function to handle the edit text theuser types in for the course
    function handleEditCourseTextInput(e){
        setCurrentCourse({ ...currentCourse, [e.target.name]: e.target.value });
    }

    //function to handle the edit text theuser types in for the round.
    function handleEditRoundTextInput(e){
        setCurrentRound({ ...currentRound, [e.target.name]: e.target.value });
       
    }
//function call both update apis one after the other.
    function updateInformation(){
        updateCourseInformation()
        updateRoundInformation()
    }
 //function to update the course array with newly entered info
    function updateCourseInformation(){
        updateCourse(currentCourse.id, currentCourse)
            .then((response) => response.json())
            .then((data) => setCurrentCourse(data))
    }

    //function to update the round array with newly entered information
    function updateRoundInformation(){
        updateRound(currentRound.id, currentRound)
            .then((response) => response.json())
            .then((data) => setCurrentRound(data))
    }

    function redirectToRoundSummaryPage(){
            window.location.reload();
    }

    function redirectToSummaryPage(){
        navigate('/SummaryPage')
    }

    return isLoggedIn ? (
    <>
    <div className="round-summary-div">
    <div className="round-summary-box-div">
       <div className={ editInformation ? "no-edit" : "round-summary-form"}>
            <h1>Please Confirm This is the Data You Want to Enter</h1>
        <div>
            <h3>Course</h3>
                <div className="course-info">
                    <h4>Name: {currentCourse.name}</h4>
                    <h4>Par: {currentCourse.par_score}</h4>
                </div>
                
        </div>
            <div>
                <h3>Round</h3>
                <div className="course-info">
                    <h4>Date: {currentRound.date}</h4>
                    <h4>Number Of Holes: {currentRound.number_of_holes} </h4>
                    <h4>Score: {currentRound.score}</h4>
                </div>
                
            </div>
            <div>
                <h3>Guest</h3>
                <div className="course-info">
                    <h4>Name: {currentRound.guest_name} </h4>
                    <h4>Score: {currentRound.guest_score} </h4>
                    </div>
            </div>
            <div>
                <button onClick={toggleEdit} className="btn btn-warning edit-button">Edit</button>
                <button onClick={redirectToSummaryPage} className="btn btn-warning">Submit</button>
            </div>
       </div>

    
      
      
      
       <div className={ editInformation ? "edit-info" : "no-edit"}>
       <h1>Edit Your Information then Click Submit</h1>
            <div className="round-summary-edit-course">
                <h3>Course</h3>
                    <label>Name</label>
                    <input
                        name="name"
                        value={currentCourse.name}
                        onChange={handleEditCourseTextInput}
                    /> 
                    <label>Par</label>
                    <input
                        name="par_score"
                        value={currentCourse.par_score}
                        onChange={handleEditCourseTextInput}
                    /> 
            </div>
            <div className="round-summary-edit-round">
                <h3>Round</h3>
                <label>Date</label>
                    <input
                        name="date"
                        value={currentRound.date}
                        onChange={handleEditRoundTextInput}
                    /> 
                    <label>Number of Holes</label>
                    <input
                        name="number_of_holes"
                        value={currentRound.number_of_holes}
                        onChange={handleEditRoundTextInput}
                    /> 
                    <label>Score</label>
                    <input
                        name="score"
                        value={currentRound.score}
                        onChange={handleEditRoundTextInput}
                    /> 
            </div>
            <div className="round-summary-edit-guest">
                <h3>Guest</h3>
                <label>Name</label>
                    <input
                        name="guest_name"
                        value={currentRound.guest_name}
                        onChange={handleEditRoundTextInput}
                    /> 
                    <label>Score</label>
                    <input
                        name="guest_score"
                        value={currentRound.guest_score}
                        onChange={handleEditRoundTextInput}
                    /> 
            </div>
            <div>
                <button onClick={toggleEdit} className="btn btn-warning edit-button">Edit</button>
                <button className="btn btn-warning" onClick={(e) => {
                        updateInformation();
                        redirectToRoundSummaryPage()
                    }}
                >Submit</button>
            </div>
       </div>
      </div>
       </div>
    </>

    ) : (
        <h1 className="course-error-message-h1">Please Log in to see this page</h1>
        );

}

