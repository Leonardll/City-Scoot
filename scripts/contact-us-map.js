function initMap() {
	
	if (!navigator.geolocation) {
		alert("Geolocation is not supported by your browser");
	} else {
		navigator.geolocation.getCurrentPosition(success, error);
	}	

    function success(position) {
		const map = new google.maps.Map(document.getElementById("map"), {
			zoom: 8,
			center: {lat: 51.503753, lng: -0.063518},
			mapTypeId: "terrain",
		});
		
		const userLat  = position.coords.latitude;
		const userLng = position.coords.longitude;
		
		const usermarkerPos = new google.maps.LatLng(userLat, userLng);
		const userMarker = new google.maps.Marker({
				position: usermarkerPos,
				map: map,
				title: "You are Here." 
		});
		 userMarker.setIcon("http://maps.google.com/mapfiles/ms/icons/blue.png");
		 
		const adminMarkerPos = new google.maps.LatLng(51.503753, -0.063518);
		const adminMarker = new google.maps.Marker({
				position: adminMarkerPos,
				map: map,
				title: "City Scoot Headquater Office." 
		});
		 adminMarker.setIcon("http://maps.google.com/mapfiles/ms/icons/red.png");
		 
	}
  
	function error() {
		alert("Unable to retrieve your location");
	}
  
}

