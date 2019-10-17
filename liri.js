require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment")

var searchterm = process.argv[3];
var searching = process.argv[2];
if(searching==="concert-this"){
    console.log("Got this far");
    concertthis(searchterm);
}else if(searching==="spotify-this-song"){
    spotifythis(searchterm);
}
//concert-this
//spotify-this-song
//movie-this
//do-what-it-says



//What Each Command Should Do


//node liri.js concert-this <artist/band name here>

function concertthis(name){
    var queryURL = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(
        function(response){
            for(i=0; i<response.data.length;i++){
                //console.log(response.data[i]);
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city + ", " + response.data[i].venue.country);
                var datetime = response.data[i].datetime;
                console.log(moment(datetime));
            }
        }
    )
}




//node liri.js spotify-this-song '<song name here>'
function spotifythis(name){
    spotify.search({type:"track",query:name,limit:20},function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}



//This will show the following information about the song in your terminal/bash window

//if no song provided, info runs for the sign by ace of base
//spotify api call with song name
//console.log artist(s)
//console.log song name
//console.log spotify preview link
//console.log album name

//node liri.js movie-this '<movie name here>'




//This will output the following information to your terminal/bash window:

//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.


//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


//If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/

//It's on Netflix!


//You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.



//node liri.js do-what-it-says




//Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


//It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//Edit the text in random.txt to test out the feature for movie-this and concert-this.