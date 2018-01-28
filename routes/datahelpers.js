module.exports = function makeDataHelpers(db) {
  return {
    // Get all trips that belong to a given user
    queryUserTrips: function(userid){
      return db.select('*').from('trips').where('owner_id', userid);
    },

    // Select a single trip
    queryTrip: function(tripid){
      return db.select('*').from('trips').where('id', tripid);
    },

    // Get activities within a trip
    getActivities: function(tripid){
      return db.select('*').from('activities').where('trip_id', tripid);
    },

    // Get comments from an activity
    getComments: function(activityid){
      return db.select("*").from('comments').where('activity_id', activityid);
    },

  }
}