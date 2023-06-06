import { getTokenFromStorage } from "../TokenLogic/tokenLogic"

// create a new round
export const createRound = (newRound) => {
  const token = getTokenFromStorage().replace(/"/g, '');
    return fetch(`http://localhost:4000/rounds`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': token
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
    const token = getTokenFromStorage().replace(/"/g, '');
    return fetch(`http://localhost:4000/rounds/current_round`, {
      headers: {
        "Authorization": token,
      }

    });
}

//update round
export const updateRound = (id, updatedRound) => {
  const token = getTokenFromStorage().replace(/"/g, '');
    return fetch(`http://localhost:4000/rounds/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token
      },
      body: JSON.stringify(updatedRound)
    })
  }

//delete round by ID
export const deleteRound = (id) => {
  const token = getTokenFromStorage().replace(/"/g, '');
    return fetch(`http://localhost:4000/rounds/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token
      }
    })
  }

  //get all rounds
  export const getAllRounds = () => {
    const token = getTokenFromStorage().replace(/"/g, '');
      return fetch(`http://localhost:4000/rounds`, {
        headers: {
          "Authorization": token,
        }
  
      });
  }