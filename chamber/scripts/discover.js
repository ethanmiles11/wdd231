import {places} from '../data/places.mjs'
console.log(places);

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



const showHere = document.querySelector("#allplaces");

function displayItems(places) {
    places.forEach(x => {
        const thecard = document.createElement("div");

        const thephoto = document.createElement("img");
        thephoto.src = `images/${x.photo_url}`;
        thephoto.alt = x.name;
        thephoto.loading = "lazy";
        thecard.appendChild(thephoto);

        const thetitle = document.createElement("h3");
        thetitle.innerText = x.name;
        thecard.appendChild(thetitle);

        const theaddress = document.createElement("address");
        theaddress.innerText = x.address;
        thecard.appendChild(theaddress);

        const thedesc = document.createElement("p");
        thedesc.innerText = x.description;
        thecard.appendChild(thedesc);

        const button = document.createElement("button");
        button.textContent = "Learn More";
        thecard.appendChild(button);
        
        showHere.appendChild(thecard);
    });
}

// Get the sidebar element
const sidebar = document.getElementById('sidebar-message');

// Get the current date/time
const now = Date.now();

// Check for a saved visit time in localStorage
const lastVisit = localStorage.getItem('lastVisit');

if (!lastVisit) {
  // First visit
  sidebar.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const timeDifference = now - Number(lastVisit);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysBetween = Math.floor(timeDifference / millisecondsPerDay);

  if (daysBetween < 1) {
    sidebar.textContent = "Back so soon! Awesome!";
  } else {
    const dayWord = daysBetween === 1 ? "day" : "days";
    sidebar.textContent = `You last visited ${daysBetween} ${dayWord} ago.`;
  }
}

// Save the current visit time in localStorage
localStorage.setItem('lastVisit', now.toString());


displayItems(places);