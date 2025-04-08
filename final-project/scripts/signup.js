import { setCurrentYear, setLastModifiedDate, setupHamburgerMenu } from './util.js';

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the footer with the current year and last modified date
  setCurrentYear();
  setLastModifiedDate();

  // Initialize the hamburger menu functionality
  setupHamburgerMenu();
});





// const currentYear = new Date().getFullYear();
// document.getElementById('currentyear').textContent = currentYear;

// const lastModifiedDate = new Date(document.lastModified).toLocaleDateString();
// document.getElementById('lastModified').textContent = `Last edited: ${lastModifiedDate}`;


// const hamButton = document.querySelector("#menu");
// const navigation = document.querySelector("nav");

// hamButton.addEventListener("click", function () {
//     navigation.classList.toggle("open");
//     hamButton.classList.toggle("open");
// });



// document.getElementById("signupForm").addEventListener("submit", function (event) {
//     event.preventDefault();

//     const name = document.getElementById("firstname").value;
//     localStorage.setItem("userName", name);

//     document.getElementById("userName").innerText = name;
//     document.getElementById("signupForm").classList.add("hidden");
//     document.getElementById("welcomeMessage").classList.remove("hidden");
// });


// window.onload = function () {
//     const storedName = localStorage.getItem("userName");

//     if (storedName) {
//         document.getElementById("userName").innerText = storedName;
//         document.getElementById("signupForm").classList.add("hidden");
//         document.getElementById("welcomeMessage").classList.remove("hidden");
//     }
// };