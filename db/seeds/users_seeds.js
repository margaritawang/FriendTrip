const bcrypt = require('bcrypt');

const userData = [
  {first_name: 'jim', last_name: 'bob', email: 'a@a.com', password: bcrypt.hashSync('1', 10)},
  {first_name: 'joe', last_name: 'bob', email: 'a2@a.com', password: bcrypt.hashSync('1', 10)},
  {first_name: 'john', last_name: 'bob', email: 'a3@a.com', password: bcrypt.hashSync('1', 10)}
]

const tripsData = [
  { location: 'Seattle', owner: 'jim', start_date: '2017-12-01', end_date: '2017-12-15', imgURL: 'https://static.pexels.com/photos/656195/pexels-photo-656195.jpeg'},
  { location: 'Portland', owner: 'jim', start_date: '2018-02-01', end_date: '2018-02-15', imgURL: 'https://static.pexels.com/photos/710908/pexels-photo-710908.jpeg'},
  { location: 'San Francisco', owner: 'jim', start_date: '2018-05-01', end_date: '2018-08-15', imgURL: 'https://static.pexels.com/photos/7653/pexels-photo.jpeg'}
]

const usersTripsData = [
  {trip: 'First Friend Trip!', user: 'joe'},
  {trip: 'First Friend Trip!', user: 'john'}
]

const friends = [
  {trip: 'Seattle', user: 'joe'},
  {trip: 'Seattle', user: 'john'}
]


function returnData(knex, data) {
  let query = data.map((data) => {
    let user = data.user;
    let trip = data.trip;
    let userpromise = knex('users').where('first_name', user).first();
    let trippromise = knex('trips').where('location', trip).first();
    return Promise.all([userpromise, trippromise]).then((result) => {
      return {
        user_id: result[0].id,
        trip_id: result[1].id
      }
    })
  })
  return Promise.all(query);
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_trips').del()
    .then(() => {
      return knex('trips').del()
    }).then(() => {
      return knex('users').del()
    })
    .then( () => {
      return knex('users').insert(userData)
    })
    .then(() => {
      let tripPromises = [];
      tripsData.forEach((trip) => {
        let owner = trip.owner;
        tripPromises.push(
          knex('users').where('first_name', owner).first()
            .then( (userRecord) => {
              return knex('trips').insert({
                location: trip.location,
                owner_id: userRecord.id,
                start_date: trip.start_date,
                end_date: trip.end_date,
                imgURL: trip.imgURL
              })
            })
          );
      })
      return Promise.all(tripPromises);
    }).then(() => {
      return returnData(knex, friends).then((result) => {
        console.log(result);
        let promises = result.map((item) => {
          console.log(item);
          return knex('users_trips').insert(item);
          // return knex('users_trips').insert({user_id: 105, trip_id: 103})  
        })
        return Promise.all(promises);
      }).then(() => {
        return knex('users_trips');
      }).then((result) => {
        console.log(result);
      })
    })
};
