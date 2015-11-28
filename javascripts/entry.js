requirejs.config({
  baseUrl: "./javascripts",
  paths:{
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "lodash": "../lib/bower_components/lodash/lodash.min",
    "firebase": "../lib/bower_components/firebase/firebase",
    'q': '../lib/bower_components/q/q'
  },
  shim: { // WHAT'S THIS?
  "bootstrap": ["jquery"],
  "firebase": {
    exports: "Firebase"
	}
  }
});
require(
  ["hbs", "lodash", "firebase", "populate-songs", "handlers", "delete-song", "refresh"], 
  function(Handlebars, _, Firebase, populate_songs, handlers, delete_song, refresh) {

// Once you get this working, click on one of the delete buttons, or add a new song, 
// and the on("value") event will trigger immediately and your view of songs updates.

// Create a reference to your Firebase database (the root of my Firebase)
	var myFirebaseRef = new Firebase("https://sectionmaster.firebaseio.com");

// Listen for when anything changes on the "sectionmaster" key
	myFirebaseRef.on("value", function(snapshot) {

// Store the entire songs key in a local variable
	var songs = snapshot.val();

// Bind the allSongsObject to the song list Handlebar template
    require(["hbs!../templates/songs"], function(songTemplate) {
		$("#results").html(songTemplate(songs));  // turned array into an object of array with 
													// name of 'songs' since handlebars is looking
													// for key of songs
// Loads/refreshes dropdown menus
	refresh.getMeSomeData();

// Bind the unique artists to the artists template
	// require(["hbs!../templates/artist"], function(artistTemplate) {
	// (artistTemplate(uniqueArtists));

// Bind the unique albums to the albums template
	// require(["hbs!../templates/album"], function(albumTemplate) {
	// (albumTemplate(uniqueAlbums));

	// })
	// })
	});
	});
});



// James explaining BEGIN
// require(
//   ["jquery", "ajax", "songs"], 
//   function($, ajax, songs) {

//   }
// );

// define(['jquery', 'ajax'], function (){
// 	var cat = "jojo"

// 	return {
// 		someKey: function () {
// 			//does something
// 			console.log(cat)
// 		}
// 	}
// })

// require(['awesome-songs'], function (awesome_songs){

// 	awesome_songs.someKey(); // can call key/value from file awesome-songs

// })
// James explaining END


// require js is ALL callback functions
// *** keep this file as clean as possible
// *** put logic, event handlers, etc in another file!!!

//require(["songCollection"]), 
//function($) {  // these are .js files --> ".js" is not required


// ["bread"]), function(bread) {
// }
