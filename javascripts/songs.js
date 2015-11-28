// $(document).ready(function() { // BEGIN JQUERY WRAP
define( [], function() {
	  // All the JavaScript that depends on jQuery will be written here
var songDetail = "";
var songs = [];

	//   // Select the article DOM element by its id attribute
	  // var article = $("#top-article");
	  // console.log(article);
	  // console.log(article.html());
	  // console.log("article", article);
	// });


	// You can also select an element by its class.

	  // Select the article DOM element by its class attribute
	  // var article = $(".article--main");
	  // console.log("article", article);


	// var badCharPosition;
	// var songlist = document.getElementById("results"); // replaced by JQuery below
	var songlist = $("#results"); // JQuery replaces line above

	addSong();

	function addSong(newSong) {
	for (var i = 0; i < songs.length; i++) {
		songs[i] = songs[i].replace(/[^A-Za-z" "0-9>-]/g, "");
		songs[i] = songs[i].replace(" > ", " - ");

		// songlist.innerHTML += "<blockquote>" + songs[i] + "</blockquote>"; // replaced by JQuery below
		songDetail += "<blockquote>" + songs[i] + "</blockquote>"; // for Jquery
		// $(songlist).empty();
		songlist.html(songDetail); // DISPLAY SONG LIST
		}
	}

	// DISPLAY FORM
	// 	'ADD' BUTTON (IN NAV) EVENT LISTENER DISPLAYS FORM AND HIDES SONGLIST
	// document.getElementById("add").addEventListener("click", function() {
	// 	songlist.innerHTML = "<p>Song: <input id='newTune' class='inputButton' type='text' value=''></p>" + "<p>Artist: <input id='newArtist' class='inputButton' type='text' value=''></p>" + "<p>Album: <input id='newAlbum' class='inputButton' type='text' value=''></p>" + "<p><input class='addToSongList' type='button' value='Add Song to List'></p>";
	// });

	// JQUERY REPLACING JS ABOVE (DISPLAY FORM)
	$("#add").click(function() {
	// console.log("add clicked");
	songlist.html("<p>Song: <input id='newTune' class='inputButton' type='text' value=''></p>" + "<p>Artist: <input id='newArtist' class='inputButton' type='text' value=''></p>" + "<p>Album: <input id='newAlbum' class='inputButton' type='text' value=''></p>" + "<p><input class='addToSongList' type='button' value='Add Song to List'></p>");
	});


	// SHOW SONG LIST
	// 'LIST' BUTTON (IN NAV) EVENT LISTENER DISPLAYS SONGLIST AND HIDES FORM
	// document.getElementById("list").addEventListener("click", function() {
	// 	console.log("list link clicked");
	// 	songlist.innerHTML = "";
	// 	for (var i = 0; i < songs.length; i++) {
	// 		songlist.innerHTML += "<blockquote>" + songs[i] + "</blockquote>";
	// 	}
	// });

	// JQUERY REPLACING JS ABOVE (SHOW SONG LIST)
	$("#list").click(function() {
	// var songDetail;
		// songDetail.html();
		// for (var i = 0; i < songs.length; i++) {
		// 	songDetail += "<blockquote>" + songs[i] + "</blockquote>"; // for JQuery to work
		// $(songlist).show(); // SHOW SONG LIST
		songlist.html(songDetail);
		// }
	});


	// ++++++++++++++++++++++++++++
	  // Handling events
	  // $("#destroyer").click(function() {
	  //   $(".container").hide();
	  // });



	// 'ADD SONG TO LIST' BUTTON (DYNAMICALLY PRODUCED BY 'ADD' BUTTON (IN NAV)
	// ADDS SONG TO SONG ARRAY
	// document.querySelector("body").addEventListener("click", function(event) {
	$("#body").click(function() { // JQUERY REPLACES JS LINE ABOVE
		// console.log(event);
		if (event.target.className === "addToSongList") {
		// var newTune = "";
		// var newArtist = "";
		// var newAlbum = "";
			// newTune = document.getElementById("newTune");
			// newTune = $("#newTune").val();
			// console.log(newTune);
			// newArtist = $("newArtist").val();
			// console.log(newArtist);
			// newAlbum = $("newAlbum").val();
			// console.log(newAlbum);
			songs.push($("#newTune").val() + " by " + $("newArtist").val() + " on the album " + newAlbum);
			songDetail = songDetail + "<blockquote>" + songs.slice(-1)[0] + "</blockquote>";
			songlist.html(songDetail);
			console.log(songs.slice(-1)[0]);
			console.log("array = ", songs);
			// songlist.innerHTML = ""; // TURN TO JQUERY
			// $(songlist).hide(); // 	HIDE SONG LIST
			// $(songlist).empty();
			// addSong();
	  	}
	});
}); // END JQUERY WRAP

