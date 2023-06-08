import { useState } from "react";
import { getCourseRounds } from "../apis/CourseApis";
import { useEffect } from "react";
import { deleteRound } from "../apis/RoundApis";
import { getAllRounds } from "../apis/RoundApis";
import { isUserAuthenticated } from "../TokenLogic/tokenLogic";

export default function SummaryPage(){

   const[summaryArray, setSummaryArray] = useState([{
        name: "",
        par_score: "",
        rounds: []
   }])

   const [isLoggedIn, setIsLoggedIn] = useState(null);

   useEffect(() => {
   
       const authenticated = isUserAuthenticated(); 
       setIsLoggedIn(authenticated);
     }, []);

   const[handicap, setHandicap] = useState();



   useEffect(() => {
    calculateHandicap();
  }, []);
    
   useEffect(() => {
        getCourseRounds()
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setSummaryArray(data)
            })
    }, []) 
    
   const flatSummaryArray = summaryArray.flatMap((course) => 
    course.rounds.map((round) => ({
        courseName: course.name,
        par: course.par_score,
        date: round.date,
        score: round.score,
        guestName: round.guest_name,
        guestScore: round.guest_score,
        id: round.id
        
    }))
   ); 

   function deleteRoundFromTable(index) {

    const updatedSummaryArray = [...summaryArray];
    const flatSummaryArray = updatedSummaryArray.flatMap((course) =>
      course.rounds.map((round) => ({
        courseName: course.name,
        par: course.par_score,
        date: round.date,
        score: round.score,
        guestName: round.guest_name,
        guestScore: round.guest_score,
        id: round.id
      }))
    );
  
    // Find the round by index in the flatSummaryArray
    const roundToDelete = flatSummaryArray[index];
  
    // Find the corresponding course and round in summaryArray
    const courseIndex = updatedSummaryArray.findIndex(
      (course) => course.name === roundToDelete.courseName
    );
    const roundIndex = updatedSummaryArray[courseIndex].rounds.findIndex(
      (round) => round.id === roundToDelete.id
    );
  
    // Remove the round from summaryArray
    updatedSummaryArray[courseIndex].rounds.splice(roundIndex, 1);
  
    // Update the state with the modified summaryArray
    setSummaryArray(updatedSummaryArray);

    deleteRound(roundToDelete.id)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
     
  }
    

  function calculateHandicap() {
    getAllRounds()
      .then((response) => response.json())
      .then((data) => {
        const scoresArray = data.data;
        let totalScore = 0;
        scoresArray.forEach((score) => {
          const scoreNum = parseInt(score.score); 
          if (!isNaN(scoreNum)) {
            totalScore += scoreNum;
          }
        });
        const average = totalScore / scoresArray.length;
        setHandicap(average);
      })
      .catch((error) => {
        console.error('Error calculating average score:', error);
      });
  }
  


return isLoggedIn ? (
    <>
   <div className="handicap">
   <h2>Handicap</h2>
    <h3>{handicap}</h3>
   </div>
<div className="summary-table-container">
    
    <div className="summary-table">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Par Score</th>
          <th>Date</th>
          <th>Score</th>
          <th>Guest Name</th>
          <th>Guest Score</th>
          <th>Forget This Round?</th>
        </tr>
      </thead>
      <tbody>
        {flatSummaryArray.map((data, index) => (
          <tr key={index}>
            <td>{data.courseName}</td>
            <td>{data.par}</td>
            <td>{data.date}</td>
            <td>{data.score}</td>
            <td>{data.guestName}</td>
            <td>{data.guestScore}</td>
            <td><button className="btn btn-warning" onClick={(e) => {
                e.preventDefault();
                deleteRoundFromTable(index);
                
                }
            }>Forget?</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
  </>
) : (
    <h1 className="course-error-message-h1">Please Log in to see this page</h1>
    );

   
}
