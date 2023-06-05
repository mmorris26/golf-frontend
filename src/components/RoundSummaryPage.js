import { useState, useEffect } from "react";
import { getCurrentCourse, updateCourse } from "../apis/CourseApis";
import { getCurrentRound, updateRound } from "../apis/RoundApis";
import { useNavigate } from "react-router-dom";


export default function RoundPageSummary(){
    
    const navigate = useNavigate();

    const [currentCourse, setCurrentCourse] = useState({
        name: "",
        par_score: ""
    }) 

    const [currentRound, setCurrentRound] = useState({
        date: '',
        number_of_holes:"",
        score: "",
        guest_name: "",
        guest_score: "",
    })

    const[editInformation, setEditInformation] = useState(false)

    useEffect(() => {
        getCurrentCourse()
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setCurrentCourse(data)
            })
        getCurrentRound()
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setCurrentRound(data)
            })
                
    },[])

    function toggleEdit(){
        setEditInformation(!editInformation)
    }

    function handleEditCourseTextInput(e){
        setCurrentCourse({ ...currentCourse, [e.target.name]: e.target.value });
        console.log(currentCourse);
        console.log("ID ", currentCourse.id)
    }

    function handleEditRoundTextInput(e){
        setCurrentRound({ ...currentRound, [e.target.name]: e.target.value });
        console.log(currentRound);
    }

    function updateInformation(){
        updateCourseInformation()
        updateRoundInformation()
    }
 
    function updateCourseInformation(){
        updateCourse(currentCourse.id, currentCourse)
            .then((response) => response.json())
            .then((data) => setCurrentCourse(data))
    }

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

    return(
    <>
       <div className={ editInformation ? "no-edit" : "round-summary-form"}>
            <h1>Please Confirm This is the Data You Want to Enter</h1>
            <div>
                <h3>Course</h3>
                    <h6>Name: {currentCourse.name}</h6> 
                    <h6>Par: {currentCourse.par_score}</h6>
            </div>
            <div>
                <h3>Round</h3>
                    <h6>Date: {currentRound.date} </h6>
                    <h6>Number Of Holes: {currentRound.number_of_holes} </h6>
                    <h6>Score: {currentRound.score} </h6>
            </div>
            <div>
                <h3>Guest</h3>
                    <h6>Name: {currentRound.guest_name} </h6>
                    <h6>Score: {currentRound.guest_score} </h6>
            </div>
            <div>
                <button onClick={toggleEdit}>Edit</button>
                <button onClick={redirectToSummaryPage}>Submit</button>
            </div>
       </div>
        
       <div className={ editInformation ? "edit-info" : "no-edit"}>
       <h1>Edit Your Information then Click Submit</h1>
            <div>
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
            <div>
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
            <div>
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
                <button onClick={toggleEdit}>Edit</button>
                <button onClick={(e) => {
                        updateInformation();
                        redirectToRoundSummaryPage()
                    }}
                >Submit</button>
            </div>
       </div>
    </>

    );

}

