import { Buffer } from 'buffer';

export const storeToken = (token) => {
    localStorage.setItem('tokenContent', JSON.stringify(token))
  }

export const getTokenFromStorage = () =>{
    return localStorage.getItem('tokenContent')
}

export const storeUserIdLocally = (response) =>{
    localStorage.setItem('userId', JSON.stringify(response.data.id))
} 

export const getUserIdFromStorage = () => {
    return localStorage.getItem('userId')
}

export const getPayloadFromToken = () => {
    const loadedBearerToken = getTokenFromStorage();
    
    if (!loadedBearerToken) {
      throw new Error("Token is missing or invalid");
    }
  
    const loadedToken = loadedBearerToken.replace("Bearer ", "");
    if (!loadedToken) {
      throw new Error("Token is missing or invalid");
    }
  
    const encryptedPayload = loadedToken.split(".");
    console.log("Encrypted payload: " + encryptedPayload)
    if (encryptedPayload.length < 2) {
      throw new Error("Invalid token structure");
    }
  
    const decodedPayload = Buffer.from(encryptedPayload[1], "base64").toString("utf-8");
    const parsedPayload = JSON.parse(decodedPayload);
    console.log("parased payload: ",  parsedPayload)
    return parsedPayload;
  }

  export const isUserAuthenticated = () => {
 const payload = getPayloadFromToken();
 if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}


