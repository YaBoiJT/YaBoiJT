var username = "yaboijt_gaming";

var pressPlay;

var uptime;

function displayTitle()
{
	document.getElementById('liveStatus').textContent = "is currently live";
	function getInfo(){
			
$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/streams/' + username,
 headers: {
   'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
 },
 success: function(data) {
   console.log(data);
   document.getElementById('title').textContent = data.stream.channel.status;
   if (data.stream.game == "Creative")
   {
	   document.getElementById('streaminfo').textContent = "Being " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
   }
   else{
   
   document.getElementById('streaminfo').textContent = "Playing " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
   }
 }
});	
		$.ajax({
		url: "https://api.rtainc.co/twitch/uptime?channel=pandaplayshd",
		success: function (data) {
			var name = data.split(' ');
			if (name[1] == "is" && name[2] == "not")
			{
				document.getElementById('uptime').textContent = "(uptime api error)";
			}
			else
			{
			document.getElementById('uptime').textContent = "(" + data + " uptime)";
			}
		},
		dataType: "html"
		});
	}
	
	getInfo();
	setInterval(getInfo,10000);
	}

function onlineFrame()
{
	document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + username + "-1280x720.jpg";
	pressPlay = function() {
		document.getElementById('playButton').style.visibility = "hidden";
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		document.getElementById('player').src = "https://player.twitch.tv/?channel=" + username +"&muted";
		}
		
	document.getElementById('chatframe').src = "https://twitch.tv/" + username + "/chat";
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
			document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-1280x720.jpg";
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
		var thumbHD = noRes + "-1280x720.jpg"
		
		document.getElementById('vod-thumbnail').src = thumbHD;
		document.getElementById('title').textContent = "Most recent broadcast:";
		document.getElementById('liveStatus').textContent = "is currently offline";
		document.getElementById('streaminfo').textContent = " " + data.videos[0].title;
		
		pressPlay = function() {
		document.getElementById('playButton').style.visibility = "hidden";
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		document.getElementById('player').src = "https://player.twitch.tv/?video=" + data.videos[0]._id;
		}

		
		
		
		
	 }
	});
}