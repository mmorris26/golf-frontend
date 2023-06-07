let apiUrl;
const railsPort = 4000;
const apiUrls = {
  development: `http://localhost:${railsPort}/`,
  production: `https://powerful-refuge-24726.herokuapp.com/`
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

module.exports = { apiUrl }