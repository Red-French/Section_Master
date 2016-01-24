define(["jquery"],
  function($) {

  console.log("inside add_member");
    return {
      addMember: function(currentSong) {
        // var songKey = $(this).attr("id");
        $.ajax({url: "https://sectionmaster.firebaseio.com/.json"
          }).done(function(songs) {
            for (var property in songs.songs) {
              if (songs.songs[property].title === currentSong) {
                console.log("Firebase match is", songs.songs[property].title);
                // songs.songs[property].singer.push(newSinger);
              }
            }
          })
        }
      }
  });