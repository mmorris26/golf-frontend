import { useState } from "react";
import { getAllCourses } from "../apis/CourseApis";
import { useEffect } from "react";
import ListOfCourses from "./ListOfCourses";
import { createCourse } from "../apis/CourseApis";

import { useNavigate } from "react-router-dom";


export default function CoursePage(){
    
    const navigate = useNavigate();

    const[newCourse, setNewCourse] = useState({
        name: "",
        par: ""
    })

    const[courseArray, setCourseArray] = useState([])

    const[loginMessage, setLoginMessage] = useState(false)

    function handleCourseTextInput(e){
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
    }

function createNewCourse(){
    createCourse(newCourse)
        .then((response) => response.json())
        .then((data) => {
            console.log("returned created course ", data);
            navigate('/RoundPage', { state: { id1: data.id, created: true } });
            setCourseArray([...courseArray, data])
        })
}

useEffect(() => {
    getAllCourses()
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching courses');
        }
        return response.json();
      })
      .then((data) => {
        setCourseArray(data);
      })
      .catch((error) => {
        setLoginMessage(true);
      });
  }, []);
  
function redirectToRoundPage(){
    navigate('/RoundPage');
}    

    return(
        <>
        
        <div className="course-page-div">
        <h1>Create a Course</h1>
        <div className="create-course-div">
        <form>
            <div className="login-email-label">
                <label>Course Name</label>
            </div>
            <div className="login-email-input">
                <input
                    name="name"
                    placeholder="Enter the Course name"
                    required
                    value={newCourse.name}
                    onChange={handleCourseTextInput}
                /> 
            </div>
            <div className="login-email-label">
                <label>Par</label>
            </div>
            <div className="login-email-input">
                <input
                    name="par"
                    placeholder="What is par for this course"
                    required
                    value={newCourse.par}
                    onChange={handleCourseTextInput}
                /> 
            </div>
            <button type="submit" className="btn btn-warning" onClick={(e) => {
            e.preventDefault();
            createNewCourse()
            redirectToRoundPage()
          }}>Create Course</button>
        </form>
        </div>
        <hr></hr>
        <h1>Or Pick From Our List of Courses</h1>
        
        <div className={ loginMessage ? "course-error-message" : "no-course-error-message"}>
            {loginMessage && (
            <h1 className="course-error-message-h1">Please Login to see the list of courses</h1>
            )}
            </div>
        </div>
          <div className="course-boxes">
          {courseArray.map(course => (
            <ListOfCourses key={course.id} id={course.id} name={course.name} par={course.par_score} />
          ))}
          </div>
        </>

    );
}