addToFavsBtn = document.getElementById("addtofavorites");
addToFavsBtn.onclick = function() {
	let url = $(location).attr("search"); 
	const params = new URLSearchParams(url);
	let routeId = params.get("routeId");
	let routes;
	if (localStorage.getItem("routes") === null) {
		routes = [];
	} else {
		routes = JSON.parse(localStorage.getItem("routes"));
	}
	routes.push(routeId);
	localStorage.setItem('routes', JSON.stringify(routes));
}