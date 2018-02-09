require('dotenv').config();

const request = require('request');
const token = process.env.API_KEY;

module.exports = () => {
  return {
    getPlaceID: (name) => {
      return new Promise((resolve, reject) =>{
        request(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&key=${token}`, {
          json: true
        },(err, res, body) => {
          if (err) {reject(err);}
          resolve(body);
        });

      })
    }

  }
}
