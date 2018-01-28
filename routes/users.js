const express = require('express');
const router = express.Router();
require('dotenv').config();


module.exports = () => {
  router.get('/', (req, res) => {
    // console.log("here");
    return res.send('home page');
  });
  
  router.get('/friends/:tid', (req, res) => {
    trip_id = req.params.tid;
    console.log(trip_id);
    return res.send('friends invited on this trip')
  });

  router.get('/trips/:uid', (req, res) => {
    user_id = req.params.uid
    console.log(user_id);
    datahelper.queryUserTrips(user_id).
    then((data) => {
      return res.json(data);
    });
  });

  router.get('/trips/:tid', (req, res) => {
    trip_id = req.params.tid;
    console.log(trip_id);
    datahelper.queryTrip(trip_id).
    then((data) => {
      return res.json(data);
    });
  });

  router.get('/trips/:tid/activities', (req, res) => {
    trip_id = req.params.tid;
    console.log(trip_id);
    datahelper.getActivities(trip_id).
    then((data) => {
      return res.json(data);
    });
  });

  router.get('/activities/:aid/comments', (req, res) => {
    activity_id = req.params.tid;
    console.log(activity_id);
    datahelper.getComments(activity_id).
    then((data) => {
      return res.json(data);
    });
  });

  return router;
}
