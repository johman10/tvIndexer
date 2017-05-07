const request = require('request');

class Tmdb {
  constructor (apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.themoviedb.org/3';
  }

  findMovie (searchword, customData) {
    var apiPath = '/search/movie';
    var apiKeyQuery = '&api_key=' + this.apiKey;
    var query = '?query=' + searchword;
    var url = this.baseUrl + apiPath + query + apiKeyQuery;
    return this.keepTrying(url).then((searchResult) => {
      if (customData) {
        Object.assign(searchResult.results[0], customData);
      }

      return searchResult.results[0];
    });
  }

  keepTrying (requestUrl) {
    return new Promise((resolve, reject) => {
      this.sendRequest(requestUrl).then((response) => {
        resolve(response);
      }).catch((errorHash) => {
        if (errorHash.body && errorHash.body.status_code === 25) {
          var retryAfter = (parseInt(errorHash.response.headers['retry-after']) + 2) * 1000;
          setTimeout(() => {
            resolve(this.keepTrying(requestUrl));
          }, retryAfter);
        } else {
          reject(errorHash);
        }
      });
    });
  }

  sendRequest (requestUrl) {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        url: requestUrl,
        json: true,
        headers: {
          'Accept': 'application/json'
        }
      }, (error, response, body) => {
        if (error || body.status_code === 25) {
          var errorHash = {
            error: error,
            response: response,
            body: body
          };
          reject(errorHash);
        } else {
          resolve(body);
        }
      });
    });
  }
}

module.exports = Tmdb;
