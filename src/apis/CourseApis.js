
// INDEX route for courses
export const getAllCourses = () => {
    return fetch(`http://localhost:4000/courses`)
}

// GET most recently created course
export const getCurrentCourse = () => {
    return fetch(`http://localhost:4000/courses/current`)
}

export const storeCourseId = (course) => {
    localStorage.setItem('courseId', JSON.stringify(course))
  }

export const getCourseIdFromStorage = () => {
    return localStorage.getItem('courseId')
}


