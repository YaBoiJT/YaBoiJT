/* status.js
 * Copyright (C) mattunderscore.us - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
ytDisplay();
toggleToTwitch();
$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/streams/' + username,
 headers: {
   'Client-ID': clientId
 },
 success: function(data) {
   console.log(data);
   if (data.stream)
   {
   online();
   }
   else
   {
	$.ajax({
	 type: 'GET',
	 url: 'https://cors-anywhere.herokuapp.com/https://tmi.twitch.tv/hosts?include_logins=1&host=' + userId,
	 success: function(data) {
	   console.log(data);
	   if (data.hosts[0].target_login == null) {
			streamOffline();
	   }
	   else {
		document.getElementById('liveStatus').textContent = "is currently hosting " + data.hosts[0].target_display_name;
		document.getElementById('liveStatus-m').textContent = "is currently hosting " + data.hosts[0].target_display_name;
		document.getElementById('popout-chat').onclick = function () { window.open('https://www.twitch.tv/'+ data.hosts[0].target_login +'/chat', 'popoutChat', 'width=400,height=650'); return false; }
        document.getElementById('player').src = "https://player.twitch.tv/?channel=" + data.hosts[0].target_login +"&autoplay=false";

		function getHostInfo() {
		$.ajax({
		 type: 'GET',
		 url: 'https://api.twitch.tv/kraken/streams/' + data.hosts[0].target_login,
		 headers: {
		   'Client-ID': clientId
		 },
		 success: function(data) {
		   console.log(data);

		   if (data.stream) {
		   document.getElementById('title').innerHTML = data.stream.channel.status;
		   document.getElementById('streaminfo').textContent = "Playing " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";

		   } //endif stream
		   else streamOffline();
		 }
		});


		}
		getHostInfo();

	   }
	 },
	 error: function()
	 {
		playerError();
	 }
	});
   }
 },
 error: function() {
	 playerError();
 }
});
