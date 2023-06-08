import { getTokenFromStorage } from "../TokenLogic/tokenLogic"
import { apiUrl } from "./apiConfig"
 
//create a new user
export const createUser = (newUser) => {
    return fetch(`${apiUrl}signup`, {
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
    return fetch(`${apiUrl}login`, {
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
    return fetch(`${apiUrl}logout`, {
      method: 'DELETE',
      headers: {
        "Authorization": token
      }
    })
  }
