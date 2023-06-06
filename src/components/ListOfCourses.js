import { Link, useNavigate } from "react-router-dom";
import { getCourseById } from "../apis/CourseApis";

export default function ListOfCourses(props){
    
// function selectExistingCourse(){
//     getCourseById(props.id)
//         .then((response) => response.json())
//         .then((data) => {

//         })
// }

const navigate = useNavigate();
    
const toRoundPage =()=>{
    navigate('/RoundPage',{state:{id:props.id}});
      }

    return(

        <>
        <div className="single-course">
            <a onClick={()=>{toRoundPage()}}>
                <hr></hr>
                <h3>{props.name}</h3>
                <p>Par: {props.par}</p>
            </a>
        </div>
        </>
    );
}