// const Flickr = require('flickr-sdk')

// const flickr = new Flickr("c2b4e258b6f0175ae0604b61c7186c42")

// flickr.photos.search({
//   text: "vancouver, landscape",
//   url_o: true
// }).then(function(res) {
//   console.log('Yay!', res.body.photos.photo[0]);
//   const photoInfo = res.body.photos.photo[0];
//   console.log(`https://www.flickr.com/photos/${photoInfo.owner}/${photoInfo.id}`)
//   console.log(`https://farm${photoInfo.farm}.staticflickr.com/${photoInfo.server}/${photoInfo.id}_${photoInfo.secret}_m.jpg`)
// }).catch(function(err){
//   console.error('Damn', err);
// });
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
// https://flic.kr/p/EbNDvH
// https://www.flickr.com/photos/118719274@N07/25063823487/in/photolist-EbNDvH


const cityImages = {
  "Vancouver": "https://images.pexels.com/photos/63332/science-world-false-creek-vancouver-british-columbia-63332.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
  "Seattle": "https://static.pexels.com/photos/656195/pexels-photo-656195.jpeg",
  "San Francisco": "https://static.pexels.com/photos/7653/pexels-photo.jpeg",
  "New York": "https://static.pexels.com/photos/450597/pexels-photo-450597.jpeg",
  "Portland": "https://static.pexels.com/photos/710908/pexels-photo-710908.jpeg",
  "Boston": "https://images.pexels.com/photos/275606/pexels-photo-275606.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
  "Paris": "https://static.pexels.com/photos/338515/pexels-photo-338515.jpeg",
  "London": "https://static.pexels.com/photos/50632/pexels-photo-50632.jpeg",
  "Berlin": "https://static.pexels.com/photos/109630/pexels-photo-109630.jpeg",
  "Cape Town": "https://static.pexels.com/photos/259447/pexels-photo-259447.jpeg",
  "Cancun": "https://www.pexels.com/photo/beach-beautiful-bridge-carribean-449627/",
  "Seoul": "https://static.pexels.com/photos/237211/pexels-photo-237211.jpeg",
  "Tokyo":"https://static.pexels.com/photos/34142/pexels-photo.jpg"
}

module.exports = {
  cityImages: cityImages
}