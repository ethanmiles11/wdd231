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


async function fetchCompanies() {
    try {
        // Fetch the JSON data
        const response = await fetch("data/members.json");
        const members = await response.json();

        // Get the container where the company info will be displayed
        const membersList = document.getElementById("membersList");

        members.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("companyCard");

            memberCard.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo">
                <div class="details">
                    <h3>${member.name}</h3>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                    <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
                    <p><strong>Rating:</strong> ${member.rating} /5 stars</p>
                </div>
            `;

            // Append the company div to the main list
            membersList.appendChild(memberCard);
        });
    } catch (error) {
        console.error("Error fetching the company data:", error);
    }
}

const gridButton = document.getElementById("gridButton");
const listButton = document.getElementById("listButton");

const cardHolder = document.getElementById("membersList");


gridButton.addEventListener("click", () => {
    cardHolder.id = "membersList";
    gridButton.classList.add("activeButton");
    listButton.classList.remove("activeButton");
});
listButton.addEventListener("click", () => {
    cardHolder.id = "listView";
    gridButton.classList.remove("activeButton");
    listButton.classList.add("activeButton");
});

fetchCompanies();