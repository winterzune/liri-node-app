
//required lines stored in variables.

require("dotenv").config();

//variables
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var keys = require("keys.js");
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);


//commands that the app needs to follow
//* `concert-this`
//* `spotify-this-song`
//* `movie-this`
//* `do-what-it-says`



//spotify-this-song command
//
//
//  
//Spotify search
var spotifySearch = function(song) {
if (song === undefined) {
    song = "Alejandro";
    }
  
spotify.search(
{
    type: "track",
    query: song
},

function(err, data) {
if (err) {
console.log("Error occurred: " + err);
return;
}
  
var single = data.tracks.items;
  
for (var i = 0; i < single.length; i++) {
    console.log(i);
    console.log("artist(s): " + single[i].artist.map(artistName));
    console.log("song name: " + single[i].name);
    console.log("preview song: " + single[i].preview_url);
    console.log("album: " + single[i].album.name);
    console.log("-----------------------------------");
}
}
);
};

// concert-this command
var singer = function(artist) {
var queryURL = "https://rest.bandsintown.com/artists/" + singer + "/events?app_id=codingbootcamp";
  
request(queryURL, function(error, response, body) {
if (!error && response.statusCode === 200) {
var jsonBoiii = JSON.parse(body);
  
if (!jsonBoiii.length) {
console.log("No results found for " + singer);
return;
}
  
console.log("Upcoming concerts for " + singer + ":");
  
for (var i = 0; i < jsonBoiii.length; i++) {
    var show = jsonBoiii[i];
  
console.log(
show.venue.city +
"," + (show.venue.region || show.venue.country) + " at " + show.venue.name + " " + moment(show.datetime).format("MM/DD/YYYY")
);
}
}
});
};

//Movie-this command
var searchMovie = function(movieName) {
if (movieName === undefined) {
    movieName = "Mr Nobody";
}
  
var urlMovie =
"http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
  
request(urlMovie, function(error, response, body) {
if (!error && response.statusCode === 200) {
var jsonBoiii = JSON.parse(body);
  
console.log("Title: " + jsonBoiii.Title);
console.log("Year: " + jsonBoiii.Year);
console.log("Rated: " + jsonBoiii.Rated);
console.log("IMDB Rating: " + jsonBoiii.imdbRating);
console.log("Country: " + jsonBoiii.Country);
console.log("Language: " + jsonBoiii.Language);
console.log("Plot: " + jsonBoiii.Plot);
console.log("Actors: " + jsonBoiii.Actors);
console.log("Rotten Tomatoes Rating: " + jsonBoiii.Ratings[1].Value);
}
});
};

//Random for do-what-it-says command
var doIt = function() {
fs.readFile("random.txt", function(error, data) {
console.log(data);
    
var myArray = data.split(",");
    
if (myArray.length === 2) {
pick(myArray[0], myArray[1]);
} else if (myArray.length === 1) {
pick(myArray[0]);
}
});
};
/////////END OF VARIABLES
/////////

console.log("Hello, I'm Liri!")
console.log("Nice to meet you.")
console.log("I am your handy dandy sarching machine!")
console.log("You can search music, where a band is playing, information about your favorite movies or be random!")

inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is your name?",
      name: "username"
    },
    // Here we give the user a list to choose from.
    {
      type: "list",
      message: "Choose one of the following",
      choices: ["Search Song", "Search Movie", "Search Concert", "Be Random"],
      name: "options"
    },
    // Here we repeat the list so that it loops.
    {
        type: "list",
        message: "Choose one of the following",
        choices: ["Search Song", "Search Movie", "Search Concert", "Be Random"],
        name: "options"
      },
  ])

  .then(function(inquirerResponse) {
    // when the user chooses, we displays then
    if (inquirerResponse.options.choices[0]) {
    inquirer
        .prompt([
    {
    type: "input",
    message: "What song do you want me to search?",
    name: "song"
},
spotifySearch();
}
else if (inquirerResponse.options.choices[1]) {
    inquirer
        .prompt([
    {
    type: "input",
    message: "What movie do you want me to search?",
    name: "movie"
},
searchMovie();

else if (inquirerResponse.options.choices[2]) {
    inquirer
        .prompt([
    {
    type: "input",
    message: "What Concerts are you looking for?",
    name: "concerts"
},
singer();

else if (inquirerResponse.options.choices[3]) {
    inquirer
        .prompt([
    {
    type: "confirm",
    message: "You choose random!",
    name: "random"
},
doIt();

if (inquirerResponse.confirm) {
    doIt();
else {

    {
    type: "list",
    message: "Choose one of the following",
    choices: ["Search Song", "Search Movie", "Search Concert", "Be Random"],
    name: "options"
    },


}

});

///////////////////////RUN THE PROGRAM
// Function which takes in command line arguments and executes correct function accordingly
var runTime = function(argOne, argTwo) {
    pick(argOne, argTwo);
  };
  
  // MAIN PROCESS
  // =====================================
  runTime(process.argv[2], process.argv.slice(3).join(" "));
  