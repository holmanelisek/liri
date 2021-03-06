require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var searchterm = process.argv.slice(3).join("+");
var searching = process.argv[2];
if(searching==="concert-this"){
    concertthis(searchterm);
}else if(searching==="spotify-this-song"){
    spotifythis(searchterm);
}else if(searching==="movie-this"){
    moviethis(searchterm);
}else if(searching==="do-what-it-says"){
    dothis();
}
//concert-this
//spotify-this-song
//movie-this
//do-what-it-says


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
    if(!name){
        name = "ace+of+base"
    }
    spotify.search({type:"track",query:name,limit:20},function(err, data) {
        if (err) {
          return console.log("Information Not Available");
        }
        for(i=0;i<data.tracks.items.length;i++){
            for(x=0;x<data.tracks.items[i].artists.length;x++){console.log(data.tracks.items[0].artists[x].name);}
            console.log(data.tracks.items[i].name);
            console.log(data.tracks.items[i].preview_url);
            console.log(data.tracks.items[i].album.name);
    }}
      );
}

//node liri.js movie-this '<movie name here>'

function moviethis(name){
    if(!name){
        name ="mr+nobody";
    }
    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t="+name;
    axios.get(queryURL).then(
        function(response){
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log("IMBD: "+response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes: "+response.data.Ratings[1].Value);
            console.log(response.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
        }
    )
}



//node liri.js do-what-it-says

function dothis(){
    fs.readFile('random.txt', 'utf8', function(err, contents) {
        if (err) {
            return console.log("Information Not Available");
        }
        var content = contents.split(",");
        console.log(content);
        var searching = content[0];
        var searchterm = content[1];
        if(searching==="concert-this"){
            concertthis(searchterm);
        }else if(searching==="spotify-this-song"){
            spotifythis(searchterm);
        }else if(searching==="movie-this"){
            moviethis(searchterm);
        }else if(searching==="do-what-it-says"){
            dothis();
        }
    });
     
}