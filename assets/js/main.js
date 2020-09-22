// No code above this line - it is before document.ready

// Document Ready

$(document).ready(function(){

    // Begin Code Here
  
  
  
    //Date
    const today = moment();
    var todaysDateDisplay = today.format("dddd, MMMM Do");
  
    // User Name
    var userName = localStorage.getItem('yourName');
    console.log(userName);
  
    var storeName //= $( "select#storeInput option:checked" ).val();
    var cityName //= $( "#cityInput").val();
    var stateName //= $( "select#stateInput option:checked" ).val();
  
    // Displays My Store based on local storage
    //$('#myStores').append('<p>'+ localStorage.getItem('store1') + '');
  
    //console.log(storeName);
    //console.log(cityName);
    //console.log(stateName);
  
    // TEST CODE =========================================
  
     // Display Closest Store based on user location    
     $('#myStoreDisplay').empty();
  
     if(localStorage.getItem('savedStore') === 'Big Y'){
        $('#myStoreDisplay').empty();
        $('#myStoreDisplay').append('<h5 class="myStoresHeading">My Store</h5>');
        $('#myStoreDisplay').append('<div><img id="bigYDisplayImg" src="assets/img/Big_Y_Logo.jpg" alt=""></div>');
        $('#myStoreDisplay').append('<br>');
        $('#myStoreDisplay').append(localStorage.getItem('address'));
        $('#myStoreDisplay').append('<br>');
        $('#myStoreDisplay').append(localStorage.getItem('weather1'));
        $('#myStoreDisplay').append('<br>');
        $('#myStoreDisplay').append(localStorage.getItem('weather2'));
        
      }else if(localStorage.getItem('savedStore') === 'Stop and Shop'){
        $('#myStoreDisplay').empty();
        $('#myStoreDisplay').append('<h5 class="myStoresHeading">My Store</h5>');
        $('#myStoreDisplay').append('<div><img id="stopAndShopDisplayImg" src="assets/img/stopShopLogo.jpg" alt=""></div>');
        $('#myStoreDisplay').append('<br>');
        $('#myStoreDisplay').append(localStorage.getItem('address'));
        $('#myStoreDisplay').append('<br>');
        $('#myStoreDisplay').append(localStorage.getItem('weather1'));
        $('#myStoreDisplay').append('<br>');
        $('#myStoreDisplay').append(localStorage.getItem('weather2'));
       
  
      }else if(localStorage.getItem('savedStore') === 'Price Chopper'){
        $('#myStoreDisplay').empty();
        $('#myStoreDisplay').append('<h5 class="myStoresHeading">My Store</h5>');
        $('#myStoreDisplay').append('<div><img id="priceChopperDisplayImg" src="assets/img/priceChopper2.jpg" alt=""></div>');
        $('#myStoreDisplay').append('<br>');
        $('#myStoreDisplay').append(localStorage.getItem('address'));
        $('#myStoreDisplay').append('<br>');
        $('#myStoreDisplay').append(localStorage.getItem('weather1'));
        $('#myStoreDisplay').append('<br>');
        $('#myStoreDisplay').append(localStorage.getItem('weather2'));
        
      }else{
        $('#myStoreDisplay').append('<div><img id="twoBagPeople" src="assets/img/peopleWithBags.jpg" alt=""></div>');
      }
  
  
    //END TEST ===========================================
  
    // Append initial image
    //$('#myStoreDisplay').append('<div><img id="twoBagPeople" src="assets/img/peopleWithBags.jpg" alt=""></div>');
  
    // Today's Date Display
    $('#dateDisplay').text('Hello ' + userName + '! Today is ' + todaysDateDisplay);
  
    // Weather Info Display
    //$('#weatherDisplay').text('The temperature in South Windsor is 55 degrees F');
    
    // REQUEST CURRENT LOCATION
  
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(pos) {
        var crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
  
  
        // Variables for User's Location
        var lat = (`Latitude : ${crd.latitude}`);
        var long = (`Longitude: ${crd.longitude}`);
  
        console.log(lat);
        console.log(long);
        console.log(pos);
  
        
  
        var latFormat = pos.coords.latitude;
        var lonFormat = pos.coords.longitude;
        console.log('these are the ones you want');
        console.log(latFormat);
        console.log(lonFormat);
  
  
        //WEATHER TEST
  
        // WEATHER INFO
        //var storeLat = 41.8250752;
        //var storeLng = -72.58112;
        
        var apiKey = '08fed0ddeae70765e29238f931a921a5';
        var query = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latFormat + '&lon=' + lonFormat + '&units=imperial&appid=' + apiKey;
        
                $.ajax({
                url: query,
                method: 'GET'
            }).then(function(res){
                console.log(res);
  
                //stores icon based on description of response
                var weatherIcon = res.weather[0].icon;
  
                //alerts weather description
                //alert(res.weather[0].description)
  
               // $('img').attr('src',  'https://openweathermap.org/img/wn/' + weatherIcon +'.png' ) <--- this 
               //gives the icons and you will need image tag in html for it and set the attribute to the above.
  
                //consoles the temp 
                console.log('Temperature: ' +res.main.temp + '°F')
  
                $('#weatherDisplay').text(''+ res.name + ': Temp: ' + res.main.temp + ' °F and ' + res.weather[0].description + '');
                
  
            })
        
  
        //END WEATHER TEST
  
  
        // INITIAL QUERY CODE TO CHECK FOR SAVED STORE
        //+++++++++++++++++++++++++++++++++++++++++++
  
        // Store info from local storage
        var newStore = localStorage.getItem('savedStore');
        var storageCity = localStorage.getItem('savedCity');
        var storageState = localStorage.getItem('savedState');
  
        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + newStore + "+" + storageCity + "+" + storageState + "&key=AIzaSyCp1Hm5-sM97iQxz_XdACafduJ7_LMMdlk";
  
        $.ajax({
        url: queryURL,
        method: "GET"
        })
  
        .then(function(response) {
        var results = response.results;
  
        console.log('Well that worked finally!!!!!!!!!!!!!!');
        console.log(response.results[0].geometry.location.lat);
        console.log(response.results[0].geometry.location.lng);
  
        var storeLat = response.results[0].geometry.location.lat;
        var storeLon = response.results[0].geometry.location.lng;
  
  
        //TEST WEATHER--------------
  
        
           
  
  
        //END TEST-----------------
  
  
        if ((latFormat < (storeLat + 0.00208)) && (latFormat > (storeLat - 0.00208)) || (lonFormat < (storeLon + 0.00208)) && (lonFormat > (storeLon - 0.00208))) {
            alert("Remember the Bags!");
          }
  
  
        // Statement to send a reminder at the store
        /*
        if ((latFormat < (41.824761 + 0.00208)) && (latFormat > (41.824761 - 0.00208)) || (lonFormat < (-72.5550636 + 0.00208)) && (lonFormat > (-72.5550636 - 0.00208))) {
          alert("Remember the Bags!");
        }
        */
  
  
        })
  
  
        //END TEST CODE
        //+++++++++++++++++++++++++++++++++++++++++++
        
        // Set variables for store locaton
  
  
        // Statement to send a reminder at the store
        /*
        if ((latFormat < (41.824761 + 0.00208)) && (latFormat > (41.824761 - 0.00208)) || (lonFormat < (-72.5550636 + 0.00208)) && (lonFormat > (-72.5550636 - 0.00208))) {
          alert("Remember the Bags!");
        }
        */
        
        
  
  
        // Ajax call using locationIQ
        $.ajax({
          url: "https://us1.locationiq.com/v1/reverse.php?key=406c513fe3e9bf&lat=" + lat + "&lon=" + long + "&format=json",
          type: "GET",
          dataType: "json",
          success: function(data){
  
              //$('#todaysDate').css("visibility", "visible");
              //$('#weatherDisplay').css("visibility", "visible");
  
              
              console.log(data);
              //console.log(data.address.city);
  
              
  
              // Sets Initial Value for City Input based on location services
              var cityDisplayFromLocation = data.address.city;
              var stateDisplayFromLocation = data.address.state;
              document.getElementById("cityInput").defaultValue = cityDisplayFromLocation;
              document.getElementById("stateInput").defaultValue = stateDisplayFromLocation;
              console.log('Your city is ' + cityDisplayFromLocation);
              console.log('Your state is ' + stateDisplayFromLocation);
  
  
  
  
  
  
              // Weather Info
              //$('#weatherDisplay').text('The temperature in ' + cityDisplayFromLocation + ' is 55 degrees F');
              //console.log('This is the weather for' + cityDisplayFromLocation);
              
  
  
  
              // End Weather Info
  
          }});
  
   
  
      }
      //error message
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        alert('We could not find your locaton. Please click allow when prompted');
        location.reload();
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options);
  
      // -----------------------------
      //End location request
  
  
  
      // CLICK EVENT TO GET STORE INFORMATION
  
      // These variables are only defined within this function
      $('#getInfoBtn').click(function(){
        storeName = $( "select#storeInput option:checked" ).val();
        cityName = $( "#cityInput").val();
        stateName = $('#stateInput').val();
        //stateName = $( "select#stateInput option:checked" ).val();
  
        console.log(storeName);
        console.log(cityName);
        console.log(stateName);
  
  
        localStorage.setItem('savedStore', storeName);
        localStorage.setItem('savedCity', cityName);
        localStorage.setItem('savedState', stateName);
  
  
  
        // AJAX call to get store location
        //-----------------------------
  
  
        // Add store search parameters
        var store = storeName;
        var city = cityName;
        var state = stateName;
        
  
        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + store + "+" + city + "+" + state + "&key=AIzaSyCp1Hm5-sM97iQxz_XdACafduJ7_LMMdlk";
  
        $.ajax({
        url: queryURL,
        method: "GET"
        })
  
        .then(function(response) {
        var results = response.results;
        console.log(response.results);
  
        console.log(response.results[0].address_components[0].long_name); 
        console.log(response.results[0].address_components[1].long_name);
        console.log(response.results[0].address_components[2].long_name);
        console.log(response.results[0].address_components[4].long_name);
        console.log(response.results[0].address_components[6].long_name);
        console.log(response.results[0].formatted_address);
  
  
  
        var roadNumber = response.results[0].address_components[0].long_name;
        var roadName = response.results[0].address_components[1].long_name;
        var townName = response.results[0].address_components[2].long_name;
        var stateName = response.results[0].address_components[4].long_name;
        var zipCode = response.results[0].address_components[6].long_name;
  
        // Var for local storage address
        var longAddress = (response.results[0].formatted_address);
  
  
        // set local storage long address
        localStorage.setItem('address', longAddress);
        
        // lat and lon variables
        var storeLat = response.results[0].geometry.location.lat;
        var storeLon = response.results[0].geometry.location.lng;
  
        console.log('These are the Store Results');
        console.log(storeLat);
        console.log(storeLon);
  
        console.log('this works!!!!!');
        console.log(stateName);
  
        localStorage.setItem('store1Lat', storeLat);
        localStorage.setItem('store1Lon', storeLon);
  
        console.log(localStorage.getItem('store1Lat'));
  
        // WEATHER INFO =================
  
        var apiKey = '08fed0ddeae70765e29238f931a921a5';
        var query = 'https://api.openweathermap.org/data/2.5/weather?lat=' + storeLat + '&lon=' + storeLon + '&units=imperial&appid=' + apiKey;
        
                $.ajax({
                url: query,
                method: 'GET'
            }).then(function(res){
                console.log(res);
  
                //stores icon based on description of response
                var weatherIcon = res.weather[0].icon;
  
                //alerts weather description
                //alert(res.weather[0].description)
  
               // $('img').attr('src',  'https://openweathermap.org/img/wn/' + weatherIcon +'.png' ) <--- this 
               //gives the icons and you will need image tag in html for it and set the attribute to the above.
  
                //consoles the temp 
                console.log('store temperature: ' +res.main.temp + '°F');
  
                var weather1 = 'Temp: ' + res.main.feels_like + ', Feels like: ' + res.main.feels_like + '';
                var weather2 = "Today's Forecast: " + res.weather[0].description + "";
  
                localStorage.setItem('weather1', weather1);
                localStorage.setItem('weather2', weather2);
  
                // TEST CODE ___
  
  // Display Closest Store based on user location    
  if(storeName === 'Big Y'){
    $('#myStoreDisplay').empty();
    $('#myStoreDisplay').append('<h5 class="myStoresHeading">My Store</h5>');
    $('#myStoreDisplay').append('<div><img id="bigYDisplayImg" src="assets/img/Big_Y_Logo.jpg" alt=""></div>');
    $('#myStoreDisplay').append('<br>');
    $('#myStoreDisplay').append(longAddress);
    $('#myStoreDisplay').append('<br>');
    //$('#myStoreDisplay').append(weather1);
    //$('#myStoreDisplay').append('<br>');
    //$('#myStoreDisplay').append(weather2);
    location.reload();
  }else if(storeName === 'Stop and Shop'){
    $('#myStoreDisplay').empty();
    $('#myStoreDisplay').append('<h5 class="myStoresHeading">My Store</h5>');
    $('#myStoreDisplay').append('<div><img id="stopAndShopDisplayImg" src="assets/img/stopShopLogo.jpg" alt=""></div>');
    $('#myStoreDisplay').append('<br>');
    $('#myStoreDisplay').append(longAddress);
    $('#myStoreDisplay').append('<br>');
    //$('#myStoreDisplay').append(weather1);
    //$('#myStoreDisplay').append('<br>');
    //$('#myStoreDisplay').append(weather2);
    location.reload();
  
  }else{
    $('#myStoreDisplay').empty();
    $('#myStoreDisplay').append('<h5 class="myStoresHeading">My Store</h5>');
    $('#myStoreDisplay').append('<div><img id="priceChopperDisplayImg" src="assets/img/priceChopper2.jpg" alt=""></div>');
    $('#myStoreDisplay').append('<br>');
    $('#myStoreDisplay').append(longAddress);
    $('#myStoreDisplay').append('<br>');
    //$('#myStoreDisplay').append(weather1);
    //$('#myStoreDisplay').append('<br>');
    //$('#myStoreDisplay').append(weather2);
    location.reload();
  }
  
  
                // END TEST CODE---
  
            })
  
  
  
  
  
        });
  
        // End AJAX call
        
        // Prevent page from reloading upon submit
        
        $("#form").submit(function(e) {
          e.preventDefault();
          
      });
  
      });
  
      
  
  
    // End Code Here
    
    });
    
    // No code below this line - this is outside of the document.ready