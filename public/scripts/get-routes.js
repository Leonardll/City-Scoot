window.onload = getRoutes;
let xhr = false;
function getRoutes(){
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }else {
        if (window,ActiveXObject) {
                xhr = newActiveXobject("Microsoft.XMLHTTP");
        }
    } 
    if (xhr){
        xhr.open("GET","https://cityscoot-d6c37.web.app/data/routes.json", true);
        xhr.send();
        xhr.onreadystatechange = displayRoutes;
    } else {
        document.getElementById("statusmessage").innerHTML= "Error. Could not perform the stated request";
    }
}
function displayRoutes(){
        if (xhr.readyState == 4) {
            if(xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                let dataText = "";
                const url = $(location).attr("search");
                params = new URLSearchParams(url);
                for (let i in data.routes){
                    if (data.routes[i]){
                        dataText +="<tr><td><strong>" +
                        data.routes[i].name +"</strong><td class='text-center'>" +
                        data.routes[i].day+ "</td><td>" +
                        data.routes[i].time + "</td><td>" +
                        data.routes[i].highlights+ "</td><td>" +
                        "<a href='route-details.html?routeId=" + data.routes[i].routeID + "' class='btn btn-sm btn-primary'>Details</a>" +
                        "</td><tr>";
                    }
                    
                }
                if (dataText.length < 1) {
                    document.getElementById("datatable").style.display = "none";
                    document.getElementById("statusmessage").style.display = "block";
                    document.getElementById("statusmessage").innerHTML = "No Trails Found";

                }
                
                document.getElementById("insertpoint").innerHTML = dataText;
            } else {
                document.getElementById("statusmessage").innerHTML = "error" + xhr.status;  
            }
        }
}