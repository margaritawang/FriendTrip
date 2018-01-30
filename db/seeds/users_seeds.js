const bcrypt = require('bcrypt');

const userData = [
  {first_name: 'jim', last_name: 'bob', email: 'a@a.com', password: bcrypt.hashSync('1', 10)},
  {first_name: 'joe', last_name: 'bob', email: 'a2@a.com', password: bcrypt.hashSync('1', 10)},
  {first_name: 'john', last_name: 'bob', email: 'a3@a.com', password: bcrypt.hashSync('1', 10)}
]

const tripsData = [
  {name: 'First Friend Trip!', location: 'Seattle', owner: 'jim'},
  {name: 'Second Friend Trip!', location: 'Portland', owner: 'jim'},
  {name: 'Third Friend Trip!', location: 'San Diego', owner: 'jim'}
]

const usersTripsData = [
  {trip: 'First Friend Trip!', user: 'joe'},
  {trip: 'First Friend Trip!', user: 'john'}
]



exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_trips').del()
    .then(() => {
      return knex('trips').del()
    })
    .then( () => {
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
                name: trip.name,
                location: trip.location,
                owner_id: userRecord.id
              })
            })
          );
      })
      return Promise.all(tripPromises);
    })
    // .then(() => {
    //   let usersTripsPromises = [];
    //   usersTripsData.forEach((userTrip) => {
    //     usersTripsPromises.push(
    //       knex('users').where('first_name', userTrip.user).first()
    //       .then( (userRecord) => {
    //         return knex('users_trips').insert({
    //           user_id: userRecord.id,
    //           trip_id:
    //         })
    //       })
    //       )
    //   })

    // })
};
