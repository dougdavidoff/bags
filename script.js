var results;
var storeLat;
var storeLng;
var userLat;
var userLng;
var map, infoWindow;
var storeEntry;





storeGeocode();

console.log("Repeating: The store is located at " + storeLat + " and " + storeLng);

initMap();

// Below is math to see if user location is within 1/8th-mile of the store location. If it is, launch alert to "Remember the Bags"
if ((userLat < (storeLat + 0.00208)) || (userLat > (storeLat - 0.00208)) || (userLng < (storeLng + 0.00208)) || (userLng > (storeLng - 0.00208))) {
    alert("Remember the Bags!");
}






// This function geocodes the store after it is identified by the user.
function storeGeocode() {
    storeEntry = prompt("Please enter your store location", "Type store info here");
    if (storeEntry != null) {
        document.getElementById("storeField").innerHTML = "You entered: <strong>" + storeEntry + "</strong>";
    }

    // This is the Google forward geocoding API call.
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + storeEntry + "&key=AIzaSyCp1Hm5-sM97iQxz_XdACafduJ7_LMMdlk";

    $.ajax({
    url: queryURL,
    method: "GET"
    })

    // We receive the response and report back to both the user and the console log.
    .then(function(response) {
        results = response.results;
        document.getElementById("storeLocale").innerHTML = "Your store is located at Latitude <strong>" + response.results[0].geometry.location.lat + "</strong> and Longitude <strong>" + response.results[0].geometry.location.lng + "</strong>, and its Google-formatted street address is " + response.results[0].formatted_address + ".";
        
        console.log(response.results);

        storeLat = response.results[0].geometry.location.lat;
        storeLng = response.results[0].geometry.location.lng;

        console.log("First time: The store is located at " + storeLat + " and " + storeLng);
        
    })
}





// Note: This code in the function below requires that the user consent
// to location sharing when
// prompted by the browser. If the user sees the error "The Geolocation service
// failed.", it means the user probably did not give permission for the browser to
// locate the user.    
           
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: storeLat, storeLng: -73.1977},
        zoom: 12
    });

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('User location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        }); 
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}