
var map;
var infowindow;
var placeholder = document.getElementById("userLocation");
var markers = [];
var usercenter;

//initialise map
function init() {
	//map options
	//default map options to use if geolocation service is not supported
	var mapOpts = {
		center: {lat: -27.4980876, lng: 152.9933706},
		zoom: 15
	}
	map = new google.maps.Map(document.getElementById("map"), mapOpts);
	//map.setTilt(45);

	//get user position
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(swooty);
	} else {
		placeholder.innerHTML = "Geolocation service is not supported by your browser."
	}

	//event listener to find new places once the map has been panned by the user
	/*dragListener = google.maps.event.addListener(map, 'dragend', function() {
		//wait 2 secs before calling getPlaces() function
		window.setTimeout(function() {
			var getCenter = map.getCenter();
			getPlaces(getCenter);
		}, 2000);
	});*/
}

//callback function for geolocation service and getting randomizer place information simultaneously
function swooty(pos) {
	//update map center position
	usercenter = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
	//console.log(center);
	map.setCenter(usercenter);
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'latLng': {lat: pos.coords.latitude, lng: pos.coords.longitude}}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var result = results[0];
			//gets first (most detailed address information) object from geocode result
			var swiggity = result.address_components.length;
			var street, suburb;
			for (var i=0; i<swiggity; i++) {
				var temp = result.address_components[i];
				if (temp.types.indexOf("route") >= 0) {
					street = result.address_components[i].long_name;
				}
				if (temp.types.indexOf("locality") >= 0) {
					suburb = result.address_components[i].short_name;
				}
			}
			//placeholder.innerHTML = "Hi there, you are at " + street + ", " + suburb + ".";
			placeholder.innerHTML = "Hi there, you are at " + street + ".";
		} else {
			placeholder.innerHTML = "Geolocation service failed to get your location information.";
		}
	});
	getPlace(usercenter);
}

//get RANDOMIZER place information with google javascript places api
function getPlace(location) {
	//location parameter contains info about user's current information
	var placesServ = new google.maps.places.PlacesService(map);
	//infowindow for basic showing place name
	infowindow = new google.maps.InfoWindow();
	placesServ.nearbySearch({
		location: location,
		radius: 400,
		type: ["store"]
	}, function(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			var randomizedIndex = Math.floor((Math.random() * results.length) + 1);
			console.log(randomizedIndex);

			//create randomized place marker
			var randomizerPlace = results[randomizedIndex];
			var marker = new google.maps.Marker({
				map: map,
				position: randomizerPlace.geometry.location
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(randomizerPlace.name);
				infowindow.open(map, this);
			});
		}
	});
}
//get places information with ajax call to php file which calls to google places api
/*function getPlaces(location) {
	var coords = location.lat() + "," + location.lng();
	var muppet = new XMLHttpRequest();
	muppet.onreadystatechange = function() {
		if (muppet.readyState == 4 && muppet.status == 200) {
			var result = JSON.parse(muppet.responseText);
			var bleh;
			for (var i=0; i<result.length; i++) {
				//place a marker on the map
				var marker = new google.maps.Marker({
					position: {lat: parseFloat(result[i].location["lat"]), lng: parseFloat(result[i].location["lng"])},
					map: map,
					title: result[i].name
				});
				//if markers array is not empty at the first iteration i.e. already got some markers from previous/not current map position i.e. need to remove markers + restaurants table first
				if (i==0 && markers.length > 0) {
					for (var j=0; j<markers.length; j++) {
						markers[j].setMap(null);
					}
					markers = [];
					$('restaurantsTable').html('');
				}
				markers.push(marker);
				bleh = bleh + "<tr><td colspan='2'><strong>"+result[i].name+"</strong></td></tr>" +
					"<tr>" +
						"<td colspan='2'>" +
							result[i].address + "<br>" +
							"<a href='moreInfo.php?ref="+result[i].id+"'>More Info</a>" +
						"</td>" +
					"</tr>";
			}
			$('#restaurantsTable').html(bleh);
		}
	};
	muppet.open("GET", "getPlaces.php?coords="+coords, true);
	muppet.send();
}*/

//search places information by user query with ajax call to php file which calls to google places api
/*function searchPlaces(query) {
	var temp = map.getCenter();
	var coords = temp.lat() + "," + temp.lng();
	var muppet = new XMLHttpRequest();
	muppet.onreadystatechange = function() {
		if (muppet.readyState == 4 && muppet.status == 200) {
			var result = JSON.parse(muppet.responseText);
			var bleh;
			for (var i=0; i<result.length; i++) {
				//place a marker on the map
				var marker = new google.maps.Marker({
					position: {lat: parseFloat(result[i].location["lat"]), lng: parseFloat(result[i].location["lng"])},
					map: map,
					title: result[i].name
				});
				//if markers array is not empty i.e. already got some markers in i.e. need to remove markers + restaurants table first
				if (i==0 && markers.length > 0) {
					for (var j=0; j<markers.length; j++) {
						markers[j].setMap(null);
					}
					markers = [];
					$('restaurantsTable').html('');
				}
				markers.push(marker);
				bleh = bleh + "<tr><td colspan='2'><strong>"+result[i].name+"</strong></td></tr>" +
					"<tr>" +
						"<td colspan='2'>" +
							result[i].address + "<br>" +
							"<a href='moreInfo.php?ref="+result[i].id+"'>More Info</a>" +
						"</td>" +
					"</tr>";
			}
			$('#restaurantsTable').html(bleh);
		}
	};
	muppet.open("GET", "searchPlaces.php?coords="+coords+"&query="+query, true);
	muppet.send();
}*/