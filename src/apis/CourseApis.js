import { getTokenFromStorage } from "../TokenLogic/tokenLogic"


// INDEX route for courses
export const getAllCourses = () => {
  const token = getTokenFromStorage().replace(/"/g, '');
  console.log("token for index call ", token);
    return fetch(`http://localhost:4000/courses`, {
      headers: {
        "Authorization": token,
      }

    });
}

// GET most recently created course
export const getCurrentCourse = () => {
  const token = getTokenFromStorage().replace(/"/g, '');
  return fetch(`http://localhost:4000/courses/current_course`, {
    headers: {
      "Authorization": token
    }

  });
}

//create course
export const createCourse = (newCourse) => {
  const token = getTokenFromStorage().replace(/"/g, '');
    return fetch(`http://localhost:4000/courses`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": token

      },
      body: JSON.stringify({
            name: `${newCourse.name}`,
            par_score: `${newCourse.par}`  
      })
    })
  }

//store course id in local stoarge
export const storeCourseId = (course) => {
    localStorage.setItem('courseId', JSON.stringify(course))
  }
//get course id from local stoarge
export const getCourseIdFromStorage = () => {
    return localStorage.getItem('courseId')
}

// update course 
export const updateCourse = (id, updatedCourse) => {
  const token = getTokenFromStorage().replace(/"/g, '');
    return fetch(`http://localhost:4000/courses/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token
      },
      body: JSON.stringify(updatedCourse)
    })
  }

//get courses and rounds
export const getCourseRounds = () => {
  const token = getTokenFromStorage().replace(/"/g, '');
  return fetch(`http://localhost:4000/courses/rounds`, {
    headers: {
      "Authorization": token,
    }

  });
}

//get course by Id
export const getCourseById = (id) => {
  const token = getTokenFromStorage().replace(/"/g, '');
    return fetch(`http://localhost:4000/courses/${id}`, {
      headers: {
        'Authorization': token
      }
    })
  }