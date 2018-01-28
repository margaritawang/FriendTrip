module.exports = function makeDataHelpers(db) {
  return {
    // Get all trips that belong to a given user
    queryUserTrips: function(userid){
      return db.select('*').from('trips').where('owner_id', userid);
    },

    //create a new trip for a given user
    addTrip: function(tripinfo){
      return db('trips').insert(tripinfo);
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
      return db('trips').where({ id: tripid }).del();
    },

    // Get activities within a trip
    getActivities: function(tripid){
      return db.select('*').from('activities').where('trip_id', tripid);
    },

    // add activities within a trip
    addActivities: function(activityinfo) {
      return db('activities').insert(activityinfo);
    },

    // Get comments from an activity
    getComments: function(activityid){
      return db.select("*").from('comments').where('activity_id', activityid);
    },

    postComments: function(commentinfo) {
      return db('comments').insert(commentinfo);
    }
  }
}