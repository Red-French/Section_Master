// define(["jquery"],  


  function loadSongs(songArray) {
    console.log("in addSong function");
    console.log(songArray);
    var results = $("#results");
    // for (var i = 0; i < songArray.length; i++) {
    songArray.songs.forEach(function(song){
    var string = "<div>" + song.title + " " + song.artist + " " + song.album + "<input class='clear-message' type='button' value='Delete'>" + "</div>";
    results.append(string);
    });
    // $("#results").after("<button type='button' id='moreButton'>More</button>");
  }
  // )