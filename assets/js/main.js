// No code above this line - it is before document.ready

// Document Ready

$(document).ready(function(){

    // Begin Code Here

    // Displays initial content
    //$('#landingPage').css("display", "block");
  
    // Global Variables
  
    //Date
    const today = moment();
    var todaysDateDisplay = today.format("dddd, MMMM Do");

    // User Name
    var userName = localStorage.getItem('yourName');
    console.log(userName);


    // Today's Date Display
    $('#dateDisplay').text('Hello ' + userName + '! Today is ' + todaysDateDisplay);

    // Weather Info Display
    $('#weatherDisplay').text('The temperature in South Windsor is 55 degrees F');
    
    // Request Location and create lat and long variables

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





      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options);

      // -----------------------------
      //End location request





    // End Code Here
    
    });
    
    // No code below this line - this is outside of the document.ready