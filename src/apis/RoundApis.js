

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