/*
streamFunctions.js
Copyright (C) Matt Jones - All Rights Reserved
*/
var username = "jaytuu";
var userId = "95549069";
var clientId = "f2cmg4s30fnzmq7zbcx8rcsfxdc1san";

var uptime;

function online() {
	$("#liveStatus").text("is currently live");
	$("#liveStatus-m").text("is currently live");

	function getInfo(){
		$.ajax({
			 type: 'GET',
			 url: 'https://api.twitch.tv/kraken/streams/' + username,
			 headers: {
			   'Client-ID': clientId
			 },
			 success: function(data) {
				console.log(data);

				// assign title and set iframe
				var title = data.stream.channel.status;
				$("#player").attr("src", "https://player.twitch.tv/?channel=" + username +"&autoplay=false");

				// add link to title
				var linkedTitle = title.replace("@YaBaeJT", "<a href='https://twitter.com/yabaejt'>@YaBoiJT_</a>");

				// set title
				$("#title").html(linkedTitle);

				// set info
				$("#streaminfo").text("Playing " + data.stream.game + " for "
				+ data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and "
				+ data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers");
			}
		});
	} // end getInfo

getInfo();

} //end online

function ytDisplay() {
	$.ajax({
		 type: 'GET',
		 url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUECMfx0jSbcspun_yzxKhVA&maxResults=1&key=AIzaSyDRGoNzXk7wVpE2lCXG9SS7wPMZhmFSEhI',
		 success: function(data) {
			console.log(data);
			$("#yt-title").html(data.items[0].snippet.title);
			$("#yt-player").attr("src", "https://www.youtube.com/embed/" + data.items[0].snippet.resourceId.videoId)


		 }, //end success
		 error: function () {
		}
		});	// end ajax
}

function toggleToTwitch() {
	$("#twitchContent").css("display", "block");
	$("#ytContent").css("display", "none");
	$("#toggleToTwitch").css("color", "#6441A4");
	$("#toggleToYt").css("color", "rgba(255, 255, 255, 0.5)");
}

function toggleToYt() {
	$("#twitchContent").css("display", "none");
	$("#ytContent").css("display", "block");
	$("#toggleToTwitch").css("color", "rgba(255, 255, 255, 0.5)");
	$("#toggleToYt").css("color", "#e52d27");
}

function streamOffline() {
	$.ajax({
		 type: 'GET',
		 url: 'https://api.twitch.tv/kraken/channels/' + username + '/videos?broadcasts=true',
		 headers: {
		   'Client-ID': clientId
		 },
		 success: function(data) {
		   console.log(data);

		   	if (data._total == 0) {
				$("#title").text("Error 404 - no stream data found");
			}

			$("#title").text("Most recent broadcast:");
			$("#liveStatus").text("is currently offline");
			$("#liveStatus-m").text("is currently offline");
			$("#streaminfo").html(data.videos[0].title);
			$("#player").attr("src", "https://player.twitch.tv/?video=" + data.videos[0]._id + "&autoplay=false");

		 }
	});
}
function playerError() {
	$("#title").text("Error loading video");
}
