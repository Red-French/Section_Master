define(["jquery"], 
	function($){
return function(){
		var newSong = {
			"title": $("#newTune").val(),
			"artist": $("#newArtist").val(),
			"album": $("#newAlbum").val()
		};
			$.ajax({
				url: "https://sectionmaster.firebaseio.com/songs.json",
				method: "POST",
				data: JSON.stringify(newSong)		
			}).done(function(songs) {
			$('#addSongModal').modal('show'); 
			});
	};
});

