export default function ListOfCourses(props){
    console.log(props)
    
    return(

        <>
        <h3>{props.name}</h3>
        <p>{props.par}</p>
        </>
    );
}