$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/streams/' + username,
 headers: {
   'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
 },
 success: function(data) {
   console.log(data);
   if (data.stream)
   {
   displayTitle();
   onlineFrame();
   }
   else 
   {
	$.ajax({
	 type: 'GET',
	 url: 'https://jsonp.afeld.me/?url=https%3A%2F%2Ftmi.twitch.tv%2Fhosts%3Finclude_logins%3D1%26host%3D95549069',
	 success: function(data) {
	   console.log(data);
	   if (data.hosts[0].target_login == null)
	   {
			streamOffline();
	   }
	   else
	   {
		document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + data.hosts[0].target_login + "-1280x720.jpg";
		
		pressPlay = function() {
		document.getElementById('playButton').style.visibility = "hidden";
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		document.getElementById('player').src = "https://player.twitch.tv/?channel=" + data.hosts[0].target_login +"&muted";
		}
		function getHostInfo() {
		$.ajax({
		 type: 'GET',
		 url: 'https://api.twitch.tv/kraken/streams/' + data.hosts[0].target_login,
		 headers: {
		   'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
		 },
		 success: function(data) {
		   console.log(data);
		   document.getElementById('title').innerHTML = "JT is currently hosting " + data.stream.channel.display_name + "<br />" + data.stream.channel.status;
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
		getHostInfo();
		setInterval(getHostInfo,10000);
		
	   }
	 }
	});
   }
 }
});