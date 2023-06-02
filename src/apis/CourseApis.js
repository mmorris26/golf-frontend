
// INDEX route for courses
export const getAllCourses = () => {
    return fetch(`http://localhost:4000/courses`)
}

// GET most recently created course
export const getCurrentCourse = () => {
    return fetch(`http://localhost:4000/courses/current`)
}

//create course
export const createCourse = (newCourse) => {
    return fetch(`http://localhost:4000/courses`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
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


