module.exports = function makeDataHelpers(db) {
  return {
    // Get all trips that belong to a given user
    queryUserTrips: function(userid){
      return db.select('*').from('trips').where('owner_id', userid)
      .then((data) => {
        // let invites = this.getTripInvites(userid);
        // data.concat(invites);
        return this.getTripInvites(userid).then((invites) => {
          // console.log(data.concat(invites));
          return data.concat(invites);
        })
      })
    },

    getTripInvites: function(userid) {
      return db.table('trips').innerJoin('users_trips','trips.id', 'users_trips.trip_id').where('users_trips.user_id', userid)
        .then((data) => {
          // console.log('getting trip invites', data);
          return data;
        })
    },

    //create a new trip for a given user
    addTrip: function(tripinfo){
      return db('trips').returning('id').insert(tripinfo)
      .then((id) => {
        // console.log(typeof(id[0]));
        return id;
      })
    },

    // get friends on the trip
    getFriends: function(tripid) {
      return db.table('users').innerJoin('users_trips','users.id', 'users_trips.user_id').where('users_trips.trip_id', tripid);
    },

    inviteFriend: function(tripid, friendEmail) {
      return db.table('users').where('email', friendEmail).first()
      .then((data) => {
        return db.table('users_trips').insert({
          user_id: data.id,
          trip_id: tripid
        });
      })
    },

    // Select a single trip
    queryTrip: function(tripid){
      return db.select('*').from('trips').where('id', tripid);
    },

    // update a trip
    updateTrip: function(tripinfo){
      return db('trips').where('id', '=', tripinfo.id)
      .update({
        name: tripinfo.name,
        location: tripinfo.location
      });
    },

    // delete a trip
    deleteTrip: function(tripid){
      return db('activities').where('trip_id', tripid)
        .then((data) => {
          // console.log(data);
          return data.forEach((activity) => {
            return this.deleteActivity(activity.id);
          })

        }).then(() => {
          return db('activities').where('trip_id', tripid).del();
        }).then(() => {
          return db('users_trips').where('trip_id', tripid).del();
        }).then(() => {
          return db('trips').where({ id: tripid }).del();
        })
    },

    // Get activities within a trip
    getActivities: function(tripid){
      return db.select('*').from('activities').where('trip_id', tripid);
    },

    // add activities within a trip
    addActivities: function(activityinfo) {
      return db('activities').returning('id').insert(activityinfo)
      .then((id) => {
        return id;
      })
    },

    // delete activities
    deleteActivity: function(activityid) {
      return db('comments').where('activity_id', activityid).del()
        .then(() => {
          return db('activities').where({ id: activityid }).del();
        })
    },

    updateActivity: function(activityInfo, activityId){
      return db('activities').update(activityInfo).where('id', activityId);
    },

    // Get comments from an activity
    getComments: function(activityid){
      return db.table('users').innerJoin('comments', 'users.id', 'comments.owner_id').where('comments.activity_id', activityid);

      // db.select("*").from('comments').where('activity_id', activityid);
    },

    // add a new comment for an activity
    postComments: function(commentinfo) {
      return db('comments').returning('id').insert(commentinfo)
        .then((id) => {
          return db.table('users').innerJoin('comments', 'users.id', 'comments.owner_id').where('comments.id', Number(id));
        })
    },

    getUserByEmail: function(email) {
      return db.select("*").from('users').where('email', email);
    }
  }
}
