// Function to get URL parameters
function getFormData() {
    const params = new URLSearchParams(window.location.search);
  
    // Extract required field values from the URL
    const firstName = params.get('fname') || 'N/A';
    const lastName = params.get('lname') || 'N/A';
    const email = params.get('email') || 'N/A';
    const phone = params.get('phone') || 'N/A';
    const businessName = params.get('organization') || 'N/A';
    const timestamp = formatTimestamp(params.get('timestamp')) || 'N/A';
  
    // Display the values on the page
    document.getElementById('firstName').textContent = firstName;
    document.getElementById('lastName').textContent = lastName;
    document.getElementById('email').textContent = email;
    document.getElementById('phone').textContent = phone;
    document.getElementById('businessName').textContent = businessName;
    document.getElementById('timestamp').textContent = timestamp;
}

// Function to format the timestamp to "YYYY-MM-DD HH:MM"
function formatTimestamp(timestamp) {
    if (!timestamp) return 'N/A';
  
    const date = new Date(timestamp);
  
    // Format date and time
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// Trigger the function on page load
window.addEventListener('DOMContentLoaded', getFormData);

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