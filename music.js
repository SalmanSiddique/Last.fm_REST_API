// Put your Last.fm API key here
var api_key = "9397cb13b0c95911a6f6c20afed158bb";
var request = new XMLHttpRequest();

function displayResult (method) {
    
	var json = JSON.parse(request.responseText);
    
	if(method=='artist.getinfo')
	{
	  var artist_bio = json.artist.name +"<br><br>"+json.artist.bio.content;
	  document.getElementById("arname").innerHTML = artist_bio;
	  document.getElementById("arpic").innerHTML = "";
	  var para = document.createElement("img");
	  var att = document.createAttribute("src");
	  att.value = json.artist.image[2]["#text"];
	  para.setAttributeNode(att);
	  document.getElementById("arpic").appendChild(para);
	}
	
	if(method=='artist.getTopAlbums')
	{
	var text = "";
		for (i = 0; i < json.topalbums.album.length; i++) 
		{
		  text += "<img src='"+json.topalbums.album[i].image[1]["#text"]+"'/>&nbsp;&nbsp;"+"Album Name: "+json.topalbums.album[i].name+"<br><br>";
		}
	document.getElementById("alb").innerHTML = text;
	}
	
	if(method=="artist.getEvents")
	{
	var text = "";
		for (i = 0; i < json.events.event.length; i++) 
		{
		  text += "<img src='"+json.events.event[i].image[1]["#text"]+"'/>&nbsp;&nbsp;"+"Title: "+json.events.event[i].title + "<br>"+"Venue: "+json.events.event[i].venue.name+"<br>"+"Event Start Date: "+json.events.event[i].startDate+"<br><br><br>";
		}
	document.getElementById("upcevnt").innerHTML = text;
	}
}

function sendRequest (method) {
	   request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status==200) {
		displayResult(method);
		}
	  }
    var artist = document.getElementById("form-input").value;
    request.open("GET","proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
    request.withCredentials = "true";
    request.send(null);
}
