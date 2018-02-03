module.exports = function makeDataHelpers(db) {
  return {
    // Get all trips that belong to a given user
    queryUserTrips: function(userid){
      return db.select('*').from('trips').where('owner_id', userid);
    },

    //create a new trip for a given user
    addTrip: function(tripinfo){
      return db('trips').returning('id').insert(tripinfo)
      .then((id) => {
        return id;
      })
    },

    // get friends on the trip
    getFriends: function(tripid) {
      return db.table('users').innerJoin('users_trips','users.id', 'users_trips.user_id').where('users_trips.trip_id', tripid);
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
      return db('activities').where('trip_id', tripid).del()
        .then(() => {
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

    // Get comments from an activity
    getComments: function(activityid){
      return db.select("*").from('comments').where('activity_id', activityid);
    },

    // add a new comment for an activity
    postComments: function(commentinfo) {
      return db('comments').returning('id').insert(commentinfo)
        .then((id) => {
          return id;
        })
    }
  }
}