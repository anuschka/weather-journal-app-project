/* Global Variables */
// 582893658bf7bdd93d1260f185da2833

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getWeatherData = async (baseUrl, zipCode, apiKey) => {
    const url = `${baseUrl}?zip=${zipCode}&appid=${apiKey}`;
    const response = await fetch(url);
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const zipCode = "51000,hr"; // Replace with user-entered zip code
const apiKey = "582893658bf7bdd93d1260f185da2833"; 

getWeatherData(baseUrl, zipCode, apiKey)
  .then((data) => {
    console.log(data); // Do something with the returned data
  })
  .catch((error) => {
    console.log(error);
  });