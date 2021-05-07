window.onload = getRouteDetails;

	
function initMap(startLat, startLng, endLat, endLng, userLat, userLng) {
    if (!navigator.geolocation){
        alert("geolocation is not supported by your browser");
    } else {
        navigator.geolocation.getCurrentPosition(success,error);
    }

    function success(position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
    
        
    
        const usermarkerPos = new google.maps.LatLng(userLat, userLng);
        const usermarker = new google.maps.Marker({
            position: usermarkerPos,
            map: map,
            title:"You are here."
        });
        usermarker.setIcon("https://maps.google.com/mapfiles/ms/icons/blue.png");
    }
    
    function error() {
        alert("unable to retreive your location");
    }

	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 10,
		center: {lat: parseFloat(startLat, userLat), lng: parseFloat(startLng, userLng)},
		mapTypeId: "terrain"
	});
	
	const startMarker = new google.maps.Marker({
    position: {lat: parseFloat(startLat), lng: parseFloat(startLng)},
    map: map,
    title: "Route Start"
	});
  
	const endMarker = new google.maps.Marker({
		position: {lat: parseFloat(endLat), lng: parseFloat(endLng)},
		map: map,
		title: "Route End"
	});
  
	const routeCoords = [
		{lat: parseFloat(startLat), lng: parseFloat(startLng)},
		{lat: parseFloat(endLat), lng: parseFloat(endLng)}
	];
	
	const route = new google.maps.Polyline({
    path: routeCoords,
    geodesic: true,
    strokeColor: "#38513B",
    strokeOpacity: 1.0,
    strokeWeight: 2
	});
	route.setMap(map);
}



let xhr = false;
function getRouteDetails(){
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        if (window.ActiveXObject) {  

            xhr = newActiveXObject("Microsoft.XMLHTTP");

        }
    }

    if (xhr){
        xhr.open("GET","https://cityscoot-d6c37.web.app/data/routes.json", true);
        xhr.send();
        xhr.onreadystatechange = displayRouteDetails;
    } else {
        document.getElementById("statusmessage").innerHTML= "Error. Could not perform the stated request";
    }
}
function displayRouteDetails(){
        if (xhr.readyState == 4) {
            if(xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                let dataText = "";
                const url = $(location).attr("search"); 
                const params = new URLSearchParams(url);
                for (let i in data.routes) {
                    if (data.routes[i].routeID === params.get("routeId")){
                        dataText += "<h4 class='text-left'>" + data.routes[i].name + "</h4>" +
					"<img src='https://cityscoot-d6c37.web.app/images/" + data.routes[i].routeImage + "' class='float-left mb-4' alt='Image of route'>" +
					"<table class='table-responsive table-striped'><tbody><tr><th>Start Point:</th><td>" + 
					data.routes[i].start.lat + " / " + data.routes[i].start.lng +
					"</td></tr><tr><th>End Point:</th><td>" + 
					data.routes[i].end.lat + " / " + data.routes[i].end.lng +
					"</td></tr><tr><th>Day:</th><td>" + 
					data.routes[i].day +
					"</td></tr><tr><th>Time:</th><td>" + 
					data.routes[i].time +
					"</td></tr><tr><th>Highlights:</th><td>" + 
					data.routes[i].highlights +
                    "</td></tr></tbody></table>"; 
                    initMap(data.routes[i].start.lat, data.routes[i].start.lng, data.routes[i].end.lat, data.routes[i].end.lng)
                                           
                    }

                }
                
                document.getElementById("insertpoint").innerHTML = dataText;
                
            } else {
                document.getElementById("statusmessage").innerHTML = "error" + xhr.status;  
            }
        }
}

