// Set current year in the footer
export function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
  }
  
  // Set last modified date in the footer
  export function setLastModifiedDate() {
    const lastModifiedDate = new Date(document.lastModified).toLocaleDateString();
    document.getElementById('lastModified').textContent = `Last edited: ${lastModifiedDate}`;
  }
  
  
  // Toggle the mobile menu
  export function setupHamburgerMenu() {
    const hamButton = document.querySelector("#menu");
    const navigation = document.querySelector("nav");
  
    hamButton.addEventListener("click", function () {
      navigation.classList.toggle("open");
      hamButton.classList.toggle("open");
    });
  }
  