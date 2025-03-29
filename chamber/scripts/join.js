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

// EXTRA JS
// Close the modal when clicking outside the dialog content
function closeOnOutsideClick(event, modalId) {
    const dialog = document.getElementById(modalId);
  
    // Check if the click is outside the content area
    if (event.target === dialog) {
      dialog.close();
    }
}

// Populate the hidden timestamp field with current date and time
document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');

    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
  
    // Ensure membership cards container is visible before applying animation
    const membershipContainer = document.querySelector('.membership-cards');
    membershipContainer.style.opacity = '1'; 
  
    // Apply 'show' class to each card with a small delay
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('show');
      }, index * 200); // Stagger effect by 200ms intervals
    });
});