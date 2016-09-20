$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/channels/yaboijt_gaming/videos?broadcasts=true',
 headers: {
   'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
 },
 success: function(data) {
   console.log(data);
   var thumbRaw;
		if (data.videos[1].thumbnails[2] == null)
		{
		thumbRaw = data.videos[1].thumbnails[0].url;
		}
		else {thumbRaw = data.videos[1].thumbnails[2].url;}
	   
		var str2 = thumbRaw.split("-");
		var noRes = str2[0] + "-" + str2[1];
		var thumbHD = noRes + "-400x225.jpg"
   
   document.getElementById('vod1link').href = data.videos[1].url;
   document.getElementById('vod1img').src = thumbHD;
   
   
   var thumbRaw2;
		if (data.videos[2].thumbnails[2] == null)
		{
		thumbRaw2 = data.videos[2].thumbnails[0].url;
		}
		else {thumbRaw2 = data.videos[2].thumbnails[2].url;}
	   
		var str22 = thumbRaw2.split("-");
		var noRes2 = str22[0] + "-" + str22[1];
		var thumbHD2 = noRes2 + "-400x225.jpg"
   
   document.getElementById('vod2link').href = data.videos[2].url;
   document.getElementById('vod2img').src = thumbHD2;
 }
});	