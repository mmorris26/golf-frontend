import { useState } from "react";
import { createRound } from "../apis/RoundApis";
import { getUserIdFromStorage } from "../TokenLogic/tokenLogic";


export default function RoundPage(){
  const [newRound, setNewRound] = useState({
    date: "",
    holes: "",
    score: "",
    guestName: "",
    guestScore: "",
    courseId: "",
    userId: getUserIdFromStorage()
  })  

  function handleRoundTextInput(e){
    setNewRound({ ...newRound, [e.target.name]: e.target.value });
    console.log(newRound)
  }

  function createNewRound(){
    createRound(newRound)
        .then((round) => round.json())
        .then((data) => console.log(data))

  }
    
    return(
        <>
        <h1>Round</h1>
        <h3>Enter Information About Your Round</h3>
        <form>
            <label>Date</label>
                <input
                    name="date"
                    placeholder="What date did you play on?"
                    required
                    value={newRound.date}
                    onChange={handleRoundTextInput}
                /> 
            <label>Holes</label>
                <input
                    name="holes"
                    placeholder="How many holes was it?"
                    required
                    value={newRound.holes}
                    onChange={handleRoundTextInput}
                />
            <label>Score</label>
                <input
                    name="score"
                    placeholder="What did you shoot?"
                    required
                    value={newRound.score}
                    onChange={handleRoundTextInput}
                />
        <div>
        <h1>Who Did you play With?</h1>
            <label>Guest Name</label>
                <input
                    name="guestName"
                    placeholder="Enter your guests name"
                    required
                    value={newRound.guestName}
                    onChange={handleRoundTextInput}
                />
            <label>Score</label>
                <input
                    name="guestScore"
                    placeholder="Enter your guests score"
                    required
                    value={newRound.guestScore}
                    onChange={handleRoundTextInput}
                />
        </div>
            <button type="submit" onClick={(e) => {
            e.preventDefault();
            createNewRound();
          }}>Create Round</button>
        </form>

        


        
        </>
    );

}