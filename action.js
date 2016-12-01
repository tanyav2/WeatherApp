function getWeather(){
    var zipCode = document.getElementById("address").value;
    // This function gets called when the "Get Weather" button the the HTML page is clicked.
	// First, we need to retrieve the desired ZIP code from the page:
    // And now we can build the query to send to the weather API. An API is an interface that
	// lets us talk to a different machine - in this case one that provides weather data
	// If you want to try this code, you MUST get your own API key from openweathermap.org
	// and put it in place of the <yourkeygoeshere> placeholder !!!!!!!!!!!!!!!!!!!!!!!!!!
  	var url = "http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+",US&appid=6b06e3962426a9c9a76c2c98db1d56c2";
    // Now that we have a nice query, we can send it to the server. Note that this function will terminate
	// right after the request is sent.
	jsonRequest(url);
    // jsonRequest is a function that handles the actual communication with the server.
	// You can take a look at it at the bottom of this file if you like.
    //document.getElementById("zipCode").innerHTML="";

}

function showWeather(wxObject){

  document.getElementById("google-map-overlay-conditions").style.visibility = "hidden";

  if(wxObject.main.temp<277.594)
  {
      document.getElementById("google-map-overlay").style.backgroundColor = "blue";
      document.getElementById("google-map-overlay").style.visibility = "visible";
  }

  else if(wxObject.main.temp>299.817)
  {
    document.getElementById("google-map-overlay").style.backgroundColor = "red";
    document.getElementById("google-map-overlay").style.visibility = "visible";
  }

    var element=document.getElementById("showWeather");

    if(wxObject.weather[0].icon.charAt(2)=="d"){
        document.getElementById("showWeather").style.backgroundColor = "#ffffff";
    }

    if(wxObject.weather[0].icon.charAt(2)=="n"){
        document.getElementById("showWeather").style.backgroundColor = "#000000";
        document.getElementById("showWeather").style.color = "ffffff";
    }

    console.log(wxObject.weather[0].main);

    if(wxObject.weather[0].main=="Clouds"){
      document.getElementById("google-map-overlay-conditions").style.backgroundImage = "url('http://www.clker.com/cliparts/h/w/k/N/2/k/simple-clouds.svg')";
      document.getElementById("google-map-overlay-conditions").style.visibility = "visible";
    }
    if(wxObject.weather[0].main=="Rain"){
      document.getElementById("google-map-overlay-conditions").style.backgroundImage = "url('http://images.clipartpanda.com/rain-clipart-rain-clipart-4.png')";
      document.getElementById("google-map-overlay-conditions").style.visibility = "visible";
    }
    if(wxObject.weather[0].main=="Snow"){
        document.getElementById("google-map-overlay-conditions").style.backgroundImage = "url('http://images.clipartpanda.com/snow-clipart-grey-snow-md.png')";
        document.getElementById("google-map-overlay-conditions").style.visibility = "visible";
    }





}

function processResponse(wxObject,rawResponse){
    showWeather(wxObject);
    //alert(wxObject.weather[0].id);
    //alert(wxObject.weather[0].main);
    //alert(wxObject.weather[0].description);

    // We never call this function. It gets "magically" started as soon as we receive the response
    // from the weather API. This happens asynchronously.
   // alert(rawResponse); // This will print out the raw response you got from the server. You should delete this line later.
	// To find out what the response looks like, you can also manually enter a query into your browser. Like this:
    // http://api.openweathermap.org/data/2.5/weather?zip=61801,US&appid=<yourkeygoeshere>
	// You should use the wxObject object for your further coding.
	}

function processError(){
    // We never call this function either. It gets started if we encounter an error while retrieving info
    // from the weather API.
    // You can use this function to display an error message and image if something goes wrong
	}
function jsonRequest(url)
{
    var con = new XMLHttpRequest();
    // The following is a function within an event handler within an object.
	// We have not covered this in class, but basically this nested function
	// will get called whenever the "state" of the connection changes - usually
	// that means that we either got a valid response or an error message.
	// Sometimes a connection will time out and then this never gets called.
    con.onreadystatechange = function()
    {
        if (con.readyState === XMLHttpRequest.DONE) {
            // A connection's state can change multiple times, so we need to check whether
			// it is now done and whether the response was a good one (status 200 means everyhting is great)
    		if (con.status === 200) {
                    // If we have a good response, we take the JSON string and convert it to an object.
					// We then call the processResponse function to analye the received data
  			        processResponse(JSON.parse(con.responseText));
            } else {
                    return "There was an error";
            }
        }
    };
    // This opens the connection to teh server and sends the actual request:
    //alert(url);
    con.open("GET", url, true);
    con.send();
}




  function initMap() {


    document.getElementById('submit').addEventListener('click', function() {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: {lat: 40.110588, lng: -88.2073},
        mapTypeId: 'satellite'
      });
      var geocoder = new google.maps.Geocoder();
      geocodeAddress(geocoder, map);
    });
  }

  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
