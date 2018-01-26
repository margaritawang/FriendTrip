const express = require('express');
const router = express.Router();
require('dotenv').config();


module.exports = () => {
  router.get('/', (req, res) => {
    // console.log("here");
    return res.send('home page');
  })
  
  router.get('/friends/:uid', (req, res) => {
    user_id = req.params.uid;
    console.log(user_id);
    return res.send('friends for user')
  })

  router.get('/trips/:uid', (req, res) => {
    user_id = req.params['uid']
    console.log(user_id);
    return res.send('all trips for user');
  })

  router.get('/trips/:tid', (req, res) => {
    trip_id = req.params.tid;
    console.log(trip_id);
    return res.send('individual trip')
  })

  router.get('/trips/:tid/activities', (req, res) => {
    trip_id = req.params.tid;
    console.log(trip_id);
    return res.send('trip activities');
  })

  router.get('/activities/:aid/comments', (req, res) => {
    trip_id = req.params.tid;
    console.log(trip_id);
    return res.send('comments for a specific activity');
  })

  return router;
}
