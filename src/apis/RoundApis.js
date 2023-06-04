
// create a new round
export const createRound = (newRound) => {
    return fetch(`http://localhost:4000/rounds`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        
            date: `${newRound.date}`,
            number_of_holes: `${newRound.holes}`,
            score: `${newRound.score}`,
            guest_name: `${newRound.guestName}`,
            guest_score: `${newRound.guestScore}`,
            course_id: `${newRound.courseId}`,
            user_id: `${newRound.userId}`
      })
    })
  }

//get the most recently created round
  export const getCurrentRound = () => {
    return fetch(`http://localhost:4000/rounds/current_round`)
}

//update round
export const updateRound = (id, updatedRound) => {
    return fetch(`http://localhost:4000/rounds/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedRound)
    })
  }