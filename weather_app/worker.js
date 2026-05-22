
const weatherForm = document.querySelector(".wform");
const cityInput = document.querySelector(".city");
const card = document.querySelector(".panel");
// delete before publishing
const apiKey = "7bd464445525a21f77bc23bdd8ea8bb8"

weatherForm.addEventListener("submit", event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please Enter a city")
    }

});

async function getweatherData(city){
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${city}&lon={lon}&appid=${apiKey}`;

    const response = await fetch(apiurl);

    console.log(response);

    if(!response.ok){
        throw new Error("Could not fethc weather data");
    }
    return await response.json();
}
function displayWeatherData(data){
    const {name: city, main: {temp, humdity}, weather: [{description, id}]} = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humdityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji= document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp}K`;

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);

}
function getWeatherEmoji{

}
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDiplay");

    card
}