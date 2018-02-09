import axios from 'axios';

export const apiService = {
  getRecommend
}

function getRecommend(tripID) {
  const requestOptions = {
    method: 'GET'
  };
  return new Promise((resolve, reject) => {
    axios.get(`/api/recommendations/${tripID}`).
    then((res) => {
      console.log("res data",res.data);
      resolve (res.data)
    }).catch((err) => {
      reject(err);
    })
  })
}
