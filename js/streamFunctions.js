/* streamFunctions.js
 * Copyright (C) mattunderscore.us - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
var username = "JayTuu";

var pressPlay;

var uptime;

function displayTitle()
{
	document.getElementById('liveStatus').textContent = "is currently live";
	document.getElementById('liveStatus-m').textContent = "is currently live";
	function getInfo(){

$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/streams/' + username,
 headers: {
   'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
 },
 success: function(data) {
   console.log(data);

   var title = data.stream.channel.status;

	var linkedTitle = title.replace("@YaBaeJT", "<a href='https://twitter.com/yabaejt'>@YaBoiJT_</a>");

   document.getElementById('title').innerHTML = linkedTitle;

   if (data.stream.game == "Creative")
   {
	   document.getElementById('streaminfo').textContent = "Being " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
   }
   else{

   document.getElementById('streaminfo').textContent = "Playing " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
   }
 }
});
	}

	getInfo();
	setInterval(getInfo,10000);
	}

function onlineFrame()
{
	document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + username + "-800x450.jpg";
	pressPlay = function() {
		document.getElementById('button-play-span').style.background = "url(img/loading-ring.svg) no-repeat center center";
		document.getElementById('player').src = "https://player.twitch.tv/?channel=" + username +"&muted";
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		document.getElementById('button-play-link').style.visibility = "hidden";
		}, 2500);
	}
}

function ytDisplay() {
	$.ajax({
		 type: 'GET',
		 url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUECMfx0jSbcspun_yzxKhVA&maxResults=1&key=AIzaSyDRGoNzXk7wVpE2lCXG9SS7wPMZhmFSEhI',
		 success: function(data) {
			console.log(data);
			document.getElementById('yt-title').innerHTML = data.items[0].snippet.title;
			document.getElementById('yt-player').src = "https://www.youtube.com/embed/" + data.items[0].snippet.resourceId.videoId;


		 }, //end success
		 error: function () {
		}
		});	// end ajax
}

function toggleToTwitch() {
	document.getElementById('twitchContent').style.display = "block";
	document.getElementById('ytContent').style.display = "none";
	document.getElementById('toggleToTwitch').style.color = "#6441A4";
	document.getElementById('toggleToYt').style.color = "rgba(255, 255, 255, 0.5)";
}

function toggleToYt() {
	document.getElementById('ytContent').style.display = "block";
	document.getElementById('twitchContent').style.display = "none";
	document.getElementById('toggleToYt').style.color = "#e52d27";
	document.getElementById('toggleToTwitch').style.color = "rgba(255, 255, 255, 0.5)";
}

function streamOffline()
{
	$.ajax({
	 type: 'GET',
	 url: 'https://api.twitch.tv/kraken/channels/' + username + '/videos?broadcasts=true',
	 headers: {
	   'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
	 },
	 success: function(data) {
	   console.log(data);

	   	if (data._total == 0)
		{
			document.getElementById('title').textContent = "Error 404 - no stream data found";
			document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-800x450.jpg";
			document.getElementById('button-play-link').style.visibility = "hidden";
		}

		var thumbRaw;
		if (data.videos[0].thumbnails[2] == null)
		{
		thumbRaw = data.videos[0].thumbnails[0].url;
		}
		else {thumbRaw = data.videos[0].thumbnails[2].url;}

		var str2 = thumbRaw.split("-");
		var noRes = str2[0] + "-" + str2[1];
		var thumbHD = noRes + "-800x450.jpg"

		document.getElementById('vod-thumbnail').src = thumbHD;
		document.getElementById('title').textContent = "Most recent broadcast:";
		document.getElementById('liveStatus').textContent = "is currently offline";
		document.getElementById('liveStatus-m').textContent = "is currently offline";
		var title = data.videos[0].title;
		var linkedTitle = title.replace("@YaBoiJT_", "<a href='https://twitter.com/yaboijt_'>@YaBoiJT_</a>");

		document.getElementById('streaminfo').innerHTML = linkedTitle;

		pressPlay = function() {
		document.getElementById('button-play-span').style.background = "url(img/loading-ring.svg) no-repeat center center";
		document.getElementById('player').src = "https://player.twitch.tv/?video=" + data.videos[0]._id;
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		document.getElementById('button-play-link').style.visibility = "hidden";
		}, 2500);

		} //end pressPlay

	 }
	});
}
function playerError() {
	document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-800x450.jpg";
	document.getElementById('title').textContent = "Error loading video";
	document.getElementById('button-play-link').style.visibility = "hidden";
}
