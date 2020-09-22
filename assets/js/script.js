// No code above this line - it is before document.ready

// No additional code for this page. This script is for the landing page only.

// Document Ready
$(document).ready(function(){


    if(localStorage.getItem('yourName') !== null){
      location.replace("main.html");
    }
     
    $("#btnGetStarted").click(function(){
        var name = $('#nameInput').val();
        localStorage.setItem('yourName', name);
        location.replace("main.html");
      }); 
    
             
    
        // End Code Here
        
        });
        
        // No code below this line - this is outside of the document.ready
    
    
    
    