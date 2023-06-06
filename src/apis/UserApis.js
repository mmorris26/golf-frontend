import { getTokenFromStorage } from "../TokenLogic/tokenLogic"
 
//create a new user
export const createUser = (newUser) => {
    return fetch(`http://localhost:4000/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        user: {
            email: `${newUser.email}`,
            password: `${newUser.password}`,
            name: `${newUser.name}`
        }
      })
    })
  }

  //login
  export const authenticateUser = (userCredentials) => {
    return fetch(`http://localhost:4000/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        user: {
            email: userCredentials.email,
            password: userCredentials.password,
            
        }
      })
    })
  }

  //logout
  export const logOut = () => {
    const token = getTokenFromStorage().replace(/"/g, '');
    return fetch(`http://localhost:4000/logout`, {
      method: 'DELETE',
      headers: {
        "Authorization": token
      }
    })
  }
