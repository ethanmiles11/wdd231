const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModifiedDate = new Date(document.lastModified);
const formattedDate = lastModifiedDate.toLocaleString("en-us", {
    year: "numeric", 
    month: "long", 
    day: "numeric", 
    hour: "2-digit", 
    minute: "2-digit", 
    second: "2-digit", 
    hour12: true
});
document.getElementById("lastModified").textContent = `Last edited: ${formattedDate}`;

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");

hamButton.addEventListener("click", function() {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});



const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=40.42&lon=-111.88&appid=a9860a58f291de4657aa92d2fe3c99d3&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=40.42&lon=-111.88&appid=a9860a58f291de4657aa92d2fe3c99d3&units=imperial`;

async function getWeather() {
  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl)
    ]);

    if (!weatherResponse.ok || !forecastResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    console.log(weatherData);
    console.log(forecastData);

    displayCurrentWeather(weatherData);
    displayForecast(forecastData);
    
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('current-weather').innerHTML = 'Failed to load weather data.';
  }
}

function capitalize(str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

// Display current weather
function displayCurrentWeather(data) {
  const weatherContainer = document.getElementById('current-weather');
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const description = capitalize(data.weather[0].description);
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  weatherContainer.innerHTML = `
    <img src="${icon}" alt="${description}" class="weatherIcon">
    <div>
        <p><strong>${temp}</strong>°F</p>
        <p><strong>${description}</strong></p>
        <p><strong>Feels like:</strong> ${feelsLike}°F</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    </div>
  `;
}

// Display 3-day forecast
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; 
  
    // Filter to get daily forecast at the same time (e.g., 12:00 PM)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));
  
    // Only show 3 days
    dailyForecasts.slice(0, 3).forEach(day => {
      const date = new Date(day.dt_txt).toLocaleDateString('en-US', {
        weekday: 'long', month: 'short', day: 'numeric'
      });
      const temp = Math.round(day.main.temp);
      const description = capitalize(day.weather[0].description);
  
      const forecastDay = document.createElement('div');
      forecastDay.innerHTML = `
        <p><strong>${date}</strong>: ${temp}°F - ${description}</p>
      `;
  
      forecastContainer.appendChild(forecastDay);
    });
  }


// Function to fetch the JSON data and display spotlight ads
async function loadSpotlights() {
    try {
      const response = await fetch('data/members.json');
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      
      const members = await response.json();
  
      // Filter for silver (2) and gold (3) members
      const spotlightMembers = members.filter(member => 
        member.membershipLevel === 2 || member.membershipLevel === 3
      );
  
      // Shuffle the array to randomize the selection
      shuffle(spotlightMembers);
  
      // Select 3 random spotlight members
      const randomSpotlights = spotlightMembers.slice(0, 3);
  
      // Display the spotlights
      displaySpotlights(randomSpotlights);
  
    } catch (error) {
      console.error('Error loading JSON:', error);
    }
  }
  
// Function to shuffle the members array
function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
}
}

// Function to display the spotlight ads
function displaySpotlights(members) {
const container = document.getElementById('spotlight-container');
container.innerHTML = '';  // Clear any previous spotlights

members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
    <img src="${member.image}" alt="${member.name}">
    <div class="card-content">
        <h4>${member.name}</h4>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <a href="https://${member.website}" target="_blank">Visit Website</a>
        <p>Membership: ${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
    </div>
    `;

    container.appendChild(card);
});
}

// Load the spotlight ads when the page is loaded
window.onload = loadSpotlights;
  

// Load weather data on page load
getWeather();
