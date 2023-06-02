function storeToken(token) {
    localStorage.setItem('tokenContent', JSON.stringify(token))
  }

function getTokenFromStorage(){
    return localStorage.getItem('tokenContent')
}

function storeUserIdLocally(response){
    localStorage.setItem('userId', JSON.stringify(response.data.id))
} 

function getUserIdFromStorage(){
    return localStorage.getItem('userId')
}

module.exports = { storeToken, getTokenFromStorage, storeUserIdLocally, getUserIdFromStorage }