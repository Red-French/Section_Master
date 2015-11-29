define(["jquery"],
  function($) {
  console.log("inside add_member");
    return {
      addMember: function() {
      	console.log("inside add_member file addMember fxn");

        $.ajax({url: "https://sectionmaster.firebaseio.com/.json"
        }).done(function(songsReturned) {
          console.log("songsReturned = ", songsReturned);
          console.log("add member button clicked!");
          var songKey = $(this).attr("id");
          var currentSong = event.target.parentElement;
          // console.log("currentSong = ", currentSong);
          for (var property in songsReturned) {
            if (songsReturned[property].title === "unwatched") {
              unwatchedMovies[property] = songsReturned[property];
            }
          }
        })
      }
    }
  }
)   // var songKey = $(this).attr("id");

    // // DELETE the song from Firebase by specifying the URL to 
    // // the exact song you are targeting.
    // $.ajax({
    //   url: "https://sectionmaster.firebaseio.com/songs/"+ songKey +"/.json",
    //   method: "DELETE"
    // })


    // var watchedMovies = {};
      // $.ajax({url: "https://sectionmaster.firebaseio.com/.json"
      // }).done(function(songs) {
      //   console.log("add member done!");
      // });
      //   for (var property in songData) {
      //     if (songData[property].Rating !== "unwatched") {
      //       watchedMovies[property] = songData[property];
      //     }
      //   }
      //   require(["hbs!../templates/filter_results"], function(resultsTemplate) {
      //     $("#movie-catcher").html(resultsTemplate(watchedMovies));
      //   });
      // });




