import { useNavigate } from "react-router-dom";


export default function ListOfCourses(props){

const navigate = useNavigate();
    
const toRoundPage =()=>{
    navigate('/RoundPage',{state:{id:props.id}});
      }



    return(

        <div>
  <>
    <div className="single-course">
      <div onClick={() => { toRoundPage() }}>
        <div className="course-info">
          <img src="https://clipart-library.com/images_k/red-flag-transparent-background/red-flag-transparent-background-11.png" className="course-image" /> 
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