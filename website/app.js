/* Global Variables */


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "582893658bf7bdd93d1260f185da2833&units=imperial";

// Create an event listener for the element with the id: generate, with
// a callback function to execute when it is clicked.
document.getElementById('generate').addEventListener('click', performAction);

function performAction(error){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const date = new Date().toLocaleDateString();

    if (!isValidZip(zipCode)) {
        // Show an error message to the user, e.g., using an alert or updating the DOM
        alert('Please enter a valid 5-digit zip code.');
        return;
      }

    if (feelings.trim() === ''){
        alert('Please enter how are you feeling today.');
        return;
    }

    getWeatherData(baseUrl, zipCode, apiKey)
        .then((data)=> {
            
            console.log(data);
            postData('/data', 
                {temperature:data.main.temp,
                date:date,
                userResponse:feelings});
        })
        .catch((error) => {
            console.log(error)
        });
}

function isValidZip(zip) {
    // This regular expression pattern checks for a valid US zip code
    const zipPattern = /^\d{5}$/;
    return zipPattern.test(zip);
  }

const getWeatherData = async (baseUrl, zipCode, apiKey) => {
    const url = `${baseUrl}?zip=${zipCode}&appid=${apiKey}`;
    const response = await fetch(url);
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error", error);
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
  };

  const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    try {
      const newData = await response.json();
      updateUI(newData)
      console.log(newData);
    } catch (error) {
      console.log('error', error);
    }
  };

  const updateUI = (data) => {
  
      document.getElementById('date').innerHTML = `Date: ${data.date}`;
      document.getElementById('temp').innerHTML = `Temperature: ${data.temperature}°F`;
      document.getElementById('content').innerHTML = `I feel ${data.userResponse}`;
  
    
  }

