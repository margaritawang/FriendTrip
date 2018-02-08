const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const nlp = require('./classification.js');
const place = require('./placehelpers.js')();
const imghelper = require('./cityImages.js');
require('dotenv').config();


module.exports = (datahelper) => {
  router.get('/', (req, res) => {
    return res.send('home page');
  });

  router.get('/friends/:tid', (req, res) => {
    let trip_id = req.params.tid;
    datahelper.getFriends(trip_id).then((data) => {
      return res.send({
        friends: data.length,
        trip_id: trip_id
      });
    })
  });

  router.post('/friends/:tid', (req, res) => {
    let trip_id = req.params.tid;
    let email = req.body.email;
    console.log(req.body);
    datahelper.inviteFriend(trip_id,email). then((data) => {
      console.log(data);
    })
    return res.send(200);
  })


  // get all trips that belong to a given user
  router.get('/users/:uid/trips', (req, res) => {
    let user_id = req.params.uid
    datahelper.queryUserTrips(user_id).then((data) => {
      return res.send(data);
    });
  });

  // create a new trip for the user
  router.post('/users/:uid/trips', (req, res) => {
    let trip = {
      location: req.body.location,
      owner_id: req.params.uid,
      start_date: req.body.start_date,
      end_date: req.body.end_date
    };
    let location = req.body.location;
    // console.log('location:', location);
    // console.log('imageeeeeeeeeeee', imghelper.cityImages);
    // console.log(imghelper.cityImages[location]);
    if (imghelper.cityImages[location]) {
      trip.imgURL = imghelper.cityImages[location];
    } else {
      trip.imgURL =  'https://www.freevector.com/uploads/vector/preview/6318/FreeVector-New-York-Skyline-1.jpg';
    }
    console.log(trip);
    datahelper.addTrip(trip).then((data) =>{
      trip.id = data[0];

      console.log('back new trip', trip);
      res.send(trip);
    });
  });


  // select a single trip
  router.get('/trips/:tid', (req, res) => {

    let trip_id = req.params.tid;
    console.log(trip_id);
    datahelper.queryTrip(trip_id)
      .then((data) => {
        return res.json(data);
    })
  });

  // update a trip
  router.put('/trips/:tid', (req, res) =>{
    let trip = {
      id: req.params.tid,
      name: req.body.name,
      location: req.body.location
    }
  });

  // delete a trip
  router.delete('/trips/:tid', (req, res) => {
    datahelper.deleteTrip(req.params.tid).then(()=>{
      console.log('deleted');
      return res.send(200);
    });
  });

  // get activities within a trip
  router.get('/trips/:tid/activities', (req, res) => {
    let trip_id = req.params.tid;
    console.log('selecting activities in ',trip_id);
    datahelper.getActivities(trip_id).
    then((data) => {
      console.log('get all acts',data);
      return res.json(data);
    });
  });

  // add activities within a trip
  router.post('/trips/:tid/activities', (req, res) => {
    let activity = {
      // start_date: req.body.start,
      // end_date: req.body.end,
      description: req.body.description,
      trip_id: req.params.tid,
      owner_id: req.session.user_id,
      category: nlp.getCategory(req.body.description),
      imgURL: req.body.imgURL
    };
    datahelper.addActivities(activity).then((data) =>{
      activity.id = data[0];
      return res.send(activity);
      //res.redirect(`/trips/${req.params.tid}`)
    });
  });

  router.put('/trips/:tid/activities', (req, res) => {
    console.log('updating activity::::', req.body);
    let activity = {
      start_date: req.body.start_date,
      end_date: req.body.end_date
    }
    datahelper.updateActivity(activity, req.body.id).then((data) => {
      // console.log(data);
    })
  })

  router.get('/recommendations/:tid', (req, res) => {
    let tripid = req.params.tid;
    console.log('trip id',tripid);
    let name = '';
    datahelper.queryTrip(tripid).then((data) => {
      // console.log(data[0].location);

      name = data[0].location;
       console.log('placename:::::::', name);
      place.getPlaceID(`things to do in ${name}`).then((data) => {
        // console.log('api return data', data);
        // console.log("back data", data.results);
        return res.json(data.results);
      })
    })
  })

  // get comments from an activity
  router.get('/activities/:aid/comments', (req, res) => {
    let activity_id = req.params.aid;
    datahelper.getComments(activity_id).
    then((data) => {
      console.log("Comments: ", data);
      if (data.length > 0) {
        data.forEach((item, index) => {
          console.log(`each ${index}`, item);
        })
        return res.json(data);
      }
      else {
        return res.send(404);
      }
    });
  });

  router.delete('/activities/:aid', (req, res) => {
    console.log('heerrr');
    datahelper.deleteActivity(req.params.aid).then(()=>{
      console.log('deleted activity');
      return res.send(200);
    });
  });

  // add a new comment for an activity
  router.post('/activities/:aid/comments', (req, res) => {
    let comment = {
      description: req.body.description,
      activity_id: req.params.aid,
      owner_id: req.session.user_id
    };
    console.log('posting comment-----------', comment);
    datahelper.postComments(comment).then((data) => {
      // comment.id = data[0];
      // res.send(comment);
      console.log('after helper comment--------', data[0]);
      return res.send(data[0]);
    });
  });
  // get user id by Email
  router.get('/invite/:email', (req, res) => {
    datahelper.getUserByEmail(req.params.email).
    then((data) => {
      console.log('user by email', data);
      return res.send(data[0]);
    }).
    catch((err) => {
      return res.send(404);
    })
  })



  return router;
}
