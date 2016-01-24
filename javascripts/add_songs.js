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


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // NOT TESTED // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
  // ADDS NEW SONG TO FIREBASE
  $scope.newSong = function(addToThisList) {
    var dropSongRef = undefined;
    var songRef = undefined;
    var newSinger = undefined;

    var ref = new Firebase("https://sectionmaster.firebaseio.com/");  // make reference to database
    // console.log("ref", ref);
    var currentAuth = ref.getAuth().uid;  // get current user's ID
    // console.log("currentAuth = ", currentAuth);
    var listRef = new Firebase("https://sectionmaster.firebaseio.com/songs/");
    // console.log("listRef", listRef);
    // var songRef = $firebaseArray(listRef);  // move user's watchlists into an array
    // console.log("songRef = ", songRef);

    var newSinger = {
      "singer": $scope.addSinger
    };

    if ($scope.songName != undefined || null || "") {
        songRef = $scope.songName;  // obtain name of song from input field
        listRef.child(songRef).push(newSinger);  // add singer to user's chosen song
        $('#addTickerModal').modal('show'); 
    } 
    $scope.addSinger = "";  // clear 'Add Singer' input field
    $scope.songName = "";  // clear 'or enter new songName' field
};