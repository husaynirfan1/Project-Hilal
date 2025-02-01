var loc_name = '';
var filePath = '';

function selectValue(type, value, element) {

  if (type === 'Timezone') {
    //document.getElementById('selected-timezone').innerText = value;
    document.querySelector('.dropdown .dropbtn').innerText = 'Timezone: ' + value;
    filePath = `https://raw.githubusercontent.com/husaynirfan1/Project-Hilal/main/assets/data/${value.trim()}/${loc_name}.json`;
  } else if (type === 'Hijri Year') {
    //document.getElementById('selected-hijri-year').innerText = value;
    document.querySelectorAll('.dropdown')[1].querySelector('.dropbtn').innerText = 'Hijri Year: ' + value;
  } else if (type === 'Hijri Month') {
    //document.getElementById('selected-hijri-month').innerText = value;
    document.querySelectorAll('.dropdown')[2].querySelector('.dropbtn').innerText = 'Hijri Month: ' + value;
  }

  // You can now use these values for calculations or other logic
  console.log(`Selected ${type}: ${value}`);
 
}
  function startExecution() {
    // Hide the button and show the progress
	  console.log(filePath);
    document.getElementById("executeButton").style.display = "none";
    document.getElementById("progress").style.display = "block";

    // Fetch the JSON file from GitHub repository
    if (filePath) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched Data:', data); // Process your fetched data here
                alert(`Data fetched : ${JSON.stringify(data)}`);
            })
            .catch(error => {
                console.error('Error Code: ', error);
                alert('File is not there yet.');
            })
            .finally(() => {
                // Hide the progress and show the button again
                document.getElementById("progress").style.display = "none";
                document.getElementById("executeButton").style.display = "inline-block";
            });
    }
}

 function getLocation() {
      // Check if the browser supports geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
      }
    }

    function showPosition(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      //to be fix to support many
      reverseGeocode(latitude, longitude);
      
      //document.getElementById("location").innerHTML = `Latitude: ${latitude} <br> Longitude: ${longitude}`;
    }

    function showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          document.getElementById("location").innerHTML = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          document.getElementById("location").innerHTML = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          document.getElementById("location").innerHTML = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          document.getElementById("location").innerHTML = "An unknown error occurred.";
          break;
      }
    }
   
function reverseGeocode(lat, lon) {
  const apiKey = '04337000efd14f5e9b61f81d547c0707';  // Replace with your OpenCage API key
  const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${lat},${lon}&no_annotations=1&language=en`;

  fetch(geocodeUrl)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results[0]) {
        const state = data.results[0].components.state || 'County not available';
        document.getElementById("location").innerHTML = `You're located at ${state}, is it right?`;
        loc_name = state;
	      console.log(loc_name);
      } else {
        document.getElementById("location").innerHTML = `State not found`;
      }
    })
    .catch(error => {
      document.getElementById("location").innerHTML = `Error: ${error.message}`;
    });
}
// Call getLocation when the page loads to automatically find the user's location
    window.onload = function() {
      getLocation();
    }

