define(["jquery", "lodash", "populate-songs", "add_songs", "q", "refresh", "add_member"], 
	function($, _, populate_songs, add_songs, Q, refresh, add_member) {

var deferred = Q.defer;  //  promises
var chosenArtist;
var chosenAlbum;

// EVENT LISTENER FOR 'ADD MUSIC' BUTTON IN NAV BAR (DISPLAYS FORM FOR USER SONG-DATA INPUT)
$("#add").click(function(e) {
	var results = $("#results");
	htmlString = $("#results").html();
	// display 'add song' form
	results.html("<p>Song: <input id='newTune' class='inputButton' type='text' value=''></p>" + "<p>Member: <input id='newArtist' class='inputButton' type='text' value=''></p>" + "<p>Status: <input id='newAlbum' class='inputButton' type='text' value=''></p>" + "<p><input class='addToSongList' type='button' value='Add Song to List'></p>");
});

// EVENT LISTENER FOR DYNAMICALLY CREATED INPUT BUTTON
document.querySelector("body").addEventListener("click", function(event) {
		if (event.target.className === "addToSongList") {
			add_songs();
		}
	});

// EVENT LISTENER FOR 'LIST MUSIC' BUTTON TO SHOW SONG LIST IN DIV#RESULTS
$("#list").click(function() {
	// on click of 'List Music' refresh results and dropdown menu
	refresh.getMeSomeData();
});

// on click of artist dropdown, refresh dropdowns to force them to defalut value
$("#artist").click(function(){
	refresh.getMeSomeData();
});

// on click of album dropdown, refresh dropdowns to force them to defalut value
$("#album").click(function(){
	refresh.getMeSomeData();
});

// on click of song dropdown, refresh dropdowns to force them to defalut value
$("#songTitle").click(function(){
	refresh.getMeSomeData();
});






// EVENT LISTENER FOR DYNAMICALLY-CREATED ADD MEMBER BUTTON AFTER EACH SONG
$(document).on("click",".add-member-button", function(event) {
	var currentSong = event.target.previousSibling.innerHTML;
	console.log("Add member to", currentSong);
	add_member.addMember(currentSong);
	var addThisSinger = $("#newSinger").val();
	console.log("Member to be added is -->", addThisSinger);
});

// EVENT LISTENER FOR DYNAMICALLY-CREATED EDIT BUTTON AFTER EACH SONG
$(document).on("click",".edit-button", function(event) {
		console.log("edit click");
});






// LOAD USES'S CHOSEN DATA (ARTIST, ALBUM, OR SONG) INTO DIV>'#RESULTS'
$("#filterButton").click(function(){
	populate_songs.getMeSomeData(function(songs) {
// console.log("inside filter-click = ", songs);
	chosenArtist = $("#artist").val();
	chosenAlbum = $("#album").val();
	chosenSong = $("#songTitle").val();

// lodash
// define(["lodash"], function(_) {
	return (function() {  // WHY A RETURN???
			populate_songs.getMeSomeData(function(songs) {
console.log("inside filter-click 'return' = ", songs);


// CREATES AN ARRAY OF THE SONGS OBJECT (ALL KEY:VALUES) --> DONE PURELY FOR MY PLEASURE!
// var totalArray = jQuery.makeArray(songs);
// console.log("totalArray = ", totalArray);


// +++++++ 	BEGIN MOVING OBJECTS OF 'SONGS' OBJECT INTO SEPARATE ARRAYS +++++++++ //

// MOVE SONG TITLES INTO AN ARRAY
var songTitleArray = [];  // create new array to move song titles into
	for(var key in songs.songs){  // for each song object key
		// console.log(songs.songs[key].title);
		songTitleArray.push(songs.songs[key].title);  // push the song title of that key into the created array
	}
// console.log("songTitleArray (entire array) = ", songTitleArray);


// MOVE ARTIST NAMES INTO AN ARRAY
var artistArray = [];  // create new array to move artists into
	for(key in songs.songs){  // for each song object key
		// console.log(songs.songs[key].artist);  
		artistArray.push(songs.songs[key].artist);  // push the artist of that key into the created array
	}
// console.log("artistArray (entire array) = ", artistArray);


// MOVE ALBUM TITLES INTO AN ARRAY
var albumArray = [];  // create new array to move album titles into
	for (key in songs.songs){  //  for each song object key
		// console.log(songs.songs[key].album);
		albumArray.push(songs.songs[key].album);  // push the album of that key into the created array
	}
// console.log("albumArray (entire array) = ", albumArray);

// +++++++ END MOVING OBJECTS OF 'SONGS' OBJECT INTO SEPARATE ARRAYS +++++++++ //




// +++++++ BEGIN PULLING SPECIFIC INFO FROM ARRAYS +++++++++ //


// PLUCK THE ARTISTS FROM THE WHOLE OBJECT AND MOVE THEM INTO AN ARRAY
var pluckedArtists = _.chain(songs.songs)  // chain methods together for data.songs
					//.uniq("album.name") // for each unique album name
					.pluck("artist")  // pluck the album's....
					.value();  // name (value)
					// console.log("From 'songs' OBJECT, 'plucked' artists = ", pluckedArtists);


// non-chained syntax:
	// UNIQUE ARTISTS IN ARTIST ARRAY
var uniqueArtists = _.uniq(artistArray);  // .uniq will NOT work on an object, so moved object to an array 
// console.log("From artistArray, uniqueArtists = ", uniqueArtists);


// UNIQUE ALBUMS IN ALBUM ARRAY
var uniqueAlbums = _.uniq(albumArray);  // .uniq will NOT work on an object, so moved object to an array 
// console.log("From albumArray, uniqueAlbums = ", uniqueAlbums);


// UNIQUE SONGS IN ALBUM ARRAY
var uniqueSongs = _.uniq(songTitleArray);  // .uniq will NOT work on an object, so moved object to an array 
// console.log("From songTitleArray, uniqueSongs = ", uniqueSongs);

	// 			var justTheArtists = _.pluck(uniqueArtists, "artist");
	// console.log("justTheArtists", justTheArtists);

// +++++++ END PULLING SPECIFIC INFO FROM ARRAYS +++++++++ //


// LOOP (W/ FOR-IN LOOP) THROUGH SONGLIST ARRAY-OBJECT TO FIND INFO THAT MATCHES USER'S ARTIST CHOICE
if (chosenArtist !== "Choose Artist") {
console.log("chosenArtist is = ", chosenArtist);
	for (var property in songs.songs) {
			// console.log(songs.songs[property]);
		if (songs.songs[property].artist === chosenArtist) {
			// console.log("'for-in' says artist = ", chosenArtist);
			// console.log("songs.songs[property] = ", songs.songs[property]);


			var output = {  // 'dummy' object to store info of song chosen due to handlebars looking for 'songs'.
				songs: {
				}
			};
			output.songs[property] = songs.songs[property]; // moves chosen song info into 'dummy' object created above.
			console.log(songs.songs[property]);
			console.log("output = ", output);

			require(["hbs!../templates/songs"], function(songTemplate) {
	    	$("#results").html(songTemplate(output));  // FORCE NEW LINE!!
			});
		}
	}
}

// LOOP (W/ FOR-IN LOOP) THROUGH SONGLIST ARRAY-OBJECT TO FIND INFO THAT MATCHES USER'S ALBUM CHOICE
if (chosenAlbum !== "Choose Album") {
console.log("chosenAlbum is = ", chosenAlbum);
	for (property in songs.songs) {
			// console.log(songs.songs[property]);
		if (songs.songs[property].album === chosenAlbum) {
			console.log("'for-in' says album = ", chosenAlbum);
			console.log("songs.songs[property] = ", songs.songs[property]);


			var output = {  // 'dummy' object to store info of song chosen due to handlebars looking for 'songs'.
				songs: {
				}
			};
			output.songs[property] = songs.songs[property]; // moves chosen song info into 'dummy' object created above.
			// console.log(songs.songs[property]);
			// console.log("output = ", output);

			require(["hbs!../templates/songs"], function(songTemplate) {
	    	$("#results").html(songTemplate(output));  // FORCE NEW LINE!!

			});
		}
	}
}

// LOOP (W/ FOR-IN LOOP) THROUGH SONGLIST ARRAY-OBJECT TO FIND INFO THAT MATCHES USER'S SONG CHOICE
if (chosenSong !== "Choose Song") {
console.log("chosenSong is = ", chosenSong);
	for (property in songs.songs) {
			// console.log(songs.songs[property]);
		if (songs.songs[property].title === chosenSong) {
			console.log("'for-in' says album = ", chosenSong);
			console.log("songs.songs[property] = ", songs.songs[property]);

			var output = {  // 'dummy' object to store info of song chosen due to handlebars looking for 'songs'.
				songs: {
				}
			};
			output.songs[property] = songs.songs[property]; // moves chosen song info into 'dummy' object created above.
			// console.log(songs.songs[property]);
			// console.log("output = ", output);

			require(["hbs!../templates/songs"], function(songTemplate) {
	    	$("#results").html(songTemplate(output));  // FORCE NEW LINE!!

			});
		}
	}
}



				});
			}());
		});
	});
    


// ADD SINGER TO CHOSEN SONG
$("#addSinger").click(function(){
	populate_songs.getMeSomeData(function(songs) {
 console.log("inside add-singer-click = ", songs);
	chosenSong = $("#songTitle").val();

// lodash
// define(["lodash"], function(_) {
	return (function() {  // WHY A RETURN???
			populate_songs.getMeSomeData(function(songs) {
console.log("inside filter-click 'return' = ", songs);

// +++++++ 	BEGIN MOVING OBJECTS OF 'SONGS' OBJECT INTO SEPARATE ARRAYS +++++++++ //

// MOVE SONG TITLES INTO AN ARRAY
var songTitleArray = [];  // create new array to move song titles into
	for(var key in songs.songs){  // for each song object key
		// console.log(songs.songs[key].title);
		songTitleArray.push(songs.songs[key].title);  // push the song title of that key into the created array
	}
// console.log("songTitleArray (entire array) = ", songTitleArray);


// +++++++ END MOVING OBJECTS OF 'SONGS' OBJECT INTO SEPARATE ARRAYS +++++++++ //


// +++++++ BEGIN PULLING SPECIFIC INFO FROM ARRAYS +++++++++ //

// LOOP (W/ FOR-IN LOOP) THROUGH SONGLIST ARRAY-OBJECT TO FIND INFO THAT MATCHES USER'S SONG CHOICE
if (chosenSong !== "Choose Song") {
console.log("chosenSong is = ", chosenSong);
	for (property in songs.songs) {
			// console.log(songs.songs[property]);
		if (songs.songs[property].title === chosenSong) {
			console.log("'for-in' says album = ", chosenSong);
			console.log("songs.songs[property] = ", songs.songs[property]);

			var output = {  // 'dummy' object to store info of song chosen due to handlebars looking for 'songs'.
				songs: {
				}
			};
			output.songs[property] = songs.songs[property]; // moves chosen song info into 'dummy' object created above.
			// console.log(songs.songs[property]);
			// console.log("output = ", output);

			require(["hbs!../templates/songs"], function(songTemplate) {
	    	$("#results").html(songTemplate(output));  // FORCE NEW LINE!!

			});
		}
	}
}



				});
			}());
		});
	});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});
