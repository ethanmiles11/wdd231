const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

const lastModifiedDate = new Date(document.lastModified).toLocaleDateString();
document.getElementById('lastModified').textContent = `Last edited: ${lastModifiedDate}`;



const hamButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");

hamButton.addEventListener("click", function () {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});