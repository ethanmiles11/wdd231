import { setCurrentYear, setLastModifiedDate, setupHamburgerMenu } from './util.js';

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the footer with the current year and last modified date
  setCurrentYear();
  setLastModifiedDate();

  // Initialize the hamburger menu functionality
  setupHamburgerMenu();
});





// Fetch the cars data
async function fetchCarsData() {
    try {
        const response = await fetch('./data/cars.json');
        if (!response.ok) throw new Error('Failed to fetch cars data');
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Function to create a single car card
function createCarCard(car) {
    const card = document.createElement('div');
    card.classList.add('car-card');

    card.innerHTML = `
        <img src="${car.image}" alt="${car.name}" class="car-image" loading="lazy">
        <h3 class="car-name">${car.name}</h3>
        <p class="car-description">${car.description}</p>
        <h4>Pros:</h4>
        <ul class="car-pros">
            ${car.pros.map(pro => `<li>${pro}</li>`).join('')}
        </ul>
        <h4>Cons:</h4>
        <ul class="car-cons">
            ${car.cons.map(con => `<li>${con}</li>`).join('')}
        </ul>
    `;
    
    return card;
}

// Function to display all car cards
async function displayCars() {
    try {
        const cars = await fetchCarsData();
        const carsContainer = document.getElementById('cars-container');
        carsContainer.innerHTML = ''; // Clear any existing content
        
        cars.forEach(car => {
            const carCard = createCarCard(car);
            carsContainer.appendChild(carCard);
        });
    } catch (error) {
        document.getElementById('cars-container').textContent = 'Error loading cars. Please try again later.';
    }
}

// Display cars when the page is loaded
document.addEventListener('DOMContentLoaded', displayCars);
