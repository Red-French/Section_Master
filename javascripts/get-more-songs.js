define(["jquery"],
  function($) {
  console.log("inside get-more-songs");
  return {
    getMeSomeData: function(callbackFunctionReference) {
      // console.log("inside get-more-songs function");
      $.ajax({url: "javascripts/more-songs.json",
      }).done(function(firstSongsReturned) {
        callbackFunctionReference(firstSongsReturned);
      });
    }
  };
});


// define( [], function() {
// console.log("inside get-more-songs.js");

//     $.ajax({
//       url: "javascripts/more-songs.json",
//     }).done(function(moreSongs) {
//       addSong(songArray);
//     });


// // var songlist = document.getElementById("results");
//   function addSong(songArray) {
//     console.log("in addSong function");
//     console.log(songArray);
//     var results = $("#results");
//     // for (var i = 0; i < songArray.length; i++) {
//     songArray.songs.forEach(function(song){
//     var string = "<div>" + song.title + " " + song.artist + " " + song.album + "<input class='clear-message' type='button' value='Delete'>" + "</div>";
//     results.append(string);
//       });
//         $("#results").after("<button type='button' id='moreButton'>More</button>");
//   }
// });

