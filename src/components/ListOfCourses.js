import { useNavigate } from "react-router-dom";

export default function ListOfCourses(props){

const navigate = useNavigate();

//function pass the id of the course to the round page component
//this function labels the ID as id, the other labels it as id1.
//this allows me to know whetehr a course has been created or picked 
//from the list of courses so I know whtat to display in the round page.
const toRoundPage =()=>{
    navigate('/RoundPage',{state:{id:props.id}});
      }


return(

        <div>
  <>
    <div className="single-course">
      <div onClick={() => { toRoundPage() }}>
        <div className="course-info">
          <img src="https://clipart-library.com/images_k/red-flag-transparent-background/red-flag-transparent-background-11.png" alt="course" className="course-image" /> 
          <div className="course-details">
            <h2>{props.name}</h2>
            <h4>Par: {props.par}</h4>
          </div>
        </div>
      </div>
    </div>
  </>
</div>
        
    
    );
}