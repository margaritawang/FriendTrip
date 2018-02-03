const bayes = require('bayes');

const classifier = bayes();

// Accommodation  
classifier.learn('Space Hostel', 'Accommodation');
classifier.learn('Fairmont Hotel', 'Accommodation');
classifier.learn('Grand Mercure', 'Accommodation');
classifier.learn('Hyatt Regency', 'Accomodation');
classifier.learn('Accor Hotels', 'Accomodation');
classifier.learn('Ibis Hotel', 'Accomodation');
classifier.learn('Aman Resort', 'Accomodation');
classifier.learn('Comfort Inn', 'Accomodation');
classifier.learn('Sheraton Hotel', 'Accomodation');
classifier.learn('Mandarin Oriental', 'Accomodation');
classifier.learn('Sheraton Hotel', 'Accomodation');
classifier.learn('Four Seasons Resort', 'Accomodation');
classifier.learn('Ritz-Carlton', 'Accomodation');
classifier.learn('Whiteface Lodge', 'Accomodation');
classifier.learn('Shangri-La Hotel', 'Accomodation');
classifier.learn('Marriot', 'Accomodation');
classifier.learn('Taj Hotels', 'Accomodation');
classifier.learn('Ramada Worldwide', 'Accomodation');
classifier.learn('Days Inn', 'Accomodation');
classifier.learn('Howard Johnson', 'Accomodation');
classifier.learn('Econo Lodge', 'Accomodation');
classifier.learn('Best Western Hotels', 'Accomodation');

// Attractions
classifier.learn('Golden Gate Bridge', 'Attraction');
classifier.learn('Stanley Park', 'Attraction');
classifier.learn('Vancouver Aquarium');
classifier.learn('Grouse Mountain', 'Attraction');
classifier.learn('Eiffel Tower', 'Attraction');
classifier.learn('Great Wall', 'Attraction');
classifier.learn('Taj Mahal', 'Attraction');
classifier.learn('Disney World', 'Attraction');
classifier.learn('Machu Picchu', 'Attraction');
classifier.learn('Notre Dame', 'Attraction');
classifier.learn('Disneyland', 'Attraction');
classifier.learn('Opera House', 'Attraction');
classifier.learn('Central Park', 'Attraction');
classifier.learn('British Museum', 'Attraction');
classifier.learn('Stonehenge', 'Attraction');
classifier.learn('Big Ben', 'Attraction');
classifier.learn('Empire State Building', 'Attraction');
classifier.learn('Niagara Falls', 'Attraction');
classifier.learn('Alcatraz', 'Attraction');
classifier.learn('Tokyo Tower', 'Attraction');
classifier.learn('London Eye', 'Attraction');
classifier.learn('Metropolitan Museum of Art', 'Attraction');
classifier.learn('Pyramid', 'Attraction');
classifier.learn('Banff National Park', 'Attraction');

// restaurants
classifier.learn('Medina Cafe', 'Restaurant');
classifier.learn('Chambar Restaurant', 'Restaurant');
classifier.learn('Blue Water Cafe', 'Restaurant');
classifier.learn('Meat and Bread', 'Restaurant');
classifier.learn('The Oakwood Canadian Bistro', 'Restaurant');
classifier.learn('The Keg Steakhouse', 'Restaurant');
classifier.learn('Bacchus Restaurant & Lounge', 'Restaurant');
classifier.learn('CinCin Ristorante + Bar', 'Restaurant');
classifier.learn('Italian Kitchen', 'Restaurant');
classifier.learn('Cora Breakfast & Lunch', 'Restaurant');
classifier.learn('The Fish Shack', 'Restaurant');
classifier.learn('Old Spaghetti Factory', 'Restaurant');
classifier.learn('Nicli Antica Pizzeria', 'Restaurant');
classifier.learn('SURA Korean Cuisine', 'Restaurant');
classifier.learn('Momo Sushi', 'Restaurant');
classifier.learn('Joes Grill', 'Restaurant');
classifier.learn('Japadog', 'Restaurant');
classifier.learn('Ramen Jinya', 'Restaurant');
classifier.learn('Elbow Room Coffee Shop', 'Restaurant');
classifier.learn('Red Robin Gourmet Burgers', 'Restaurant');
classifier.learn('The Mexican', 'Restaurant');
classifier.learn('Go Fish', 'Restaurant');
classifier.learn('6 Degrees Eatery', 'Restaurant');
classifier.learn('Mahony & Sons Pub', 'Restaurant');
classifier.learn('Guu with Garlic', 'Restaurant');
classifier.learn('Las Margaritas', 'Restaurant');
classifier.learn('Brioche Urban Eatery', 'Restaurant');
classifier.learn('Basil Pasta Bar', 'Restaurant');
classifier.learn('Dominos Pizza', 'Restaurant');
classifier.learn('Mcdonalds', 'Restaurant');
classifier.learn('Noodle Box', 'Restaurant');
classifier.learn('Fable Diner', 'Restaurant');
classifier.learn('Suika Snackbar', 'Restaurant');
classifier.learn('New Town Bakery & Restaurant', 'Restaurant');
classifier.learn('The Holy Crab', 'Restaurant');
classifier.learn("Stepho's Souvlaki Greek Tavern", 'Restaurant');
classifier.learn('Poke Time', 'Restaurant');
classifier.learn("Vera's Burger Shack", 'Restaurant');
classifier.learn('Delicious Pho', 'Restaurant');


module.exports = {
  getCategory: function(data) {
    return classifier.categorize(data);
  }
}