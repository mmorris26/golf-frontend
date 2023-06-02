export default function ListOfCourses(props){
    console.log(props)
    
    return(

        <>
         <hr></hr>
        <h3>{props.name}</h3>
        <p>Par: {props.par}</p>
       
        </>
    );
}