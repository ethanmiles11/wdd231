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










// Fetch the tips data
async function fetchTipsData() {
    try {
      const response = await fetch('./data/tips.json');
      if (!response.ok) throw new Error('Failed to fetch tips');
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
  
  // Capitalize the first letter of the tips
  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  // Get all tips for a given rank
  function getAllTips(tips, rank) {
    if (!tips[rank]) return [];
    return Object.entries(tips[rank]).flatMap(([category, tipList]) =>
      tipList.map(tip => `${capitalize(category)} Tip: ${tip}`)
    );
  }
  
  // Display all tips for a given rank
  function buildAllTipsHTML(tips, rank) {
    const rankTips = tips[rank];
    if (!rankTips) return '';
  
    let output = '';
    for (const [category, tipList] of Object.entries(rankTips)) {
      output += `<strong>${capitalize(category)}:</strong><ul class="no-bullets">`;
      tipList.forEach(tip => {
        output += `<li>${tip}</li>`;
      });
      output += '</ul>';
    }
    return output;
  }
  
  // Update the rank image when someone selects a rank
  function updateRankImage(rank) {
    const img = document.getElementById('rankImage');
    img.src = `images/${rank || 'na-logo'}.png`;
    img.alt = rank ? `${rank} rank logo` : 'No Rank selected';
  }
  
  // Set the rank in localStorage
  function setRankInLocalStorage(rank) {
    localStorage.setItem('selectedRank', rank);
  }
  
  // Get the rank from localStorage
  function getRankFromLocalStorage() {
    return localStorage.getItem('selectedRank');
  }
  
  // Set up event listeners for the buttons and select
  function setupEventListeners() {
    const skillSelect = document.getElementById('skillLevel');
    const output = document.getElementById('output');
  
    // Check if a rank is already selected in localStorage
    const storedRank = getRankFromLocalStorage();
    if (storedRank) {
      skillSelect.value = storedRank;
      updateRankImage(storedRank);
      showRandomTip(storedRank);
    }
  
    // When the user selects a rank
    skillSelect.addEventListener('change', (e) => {
      const selectedRank = e.target.value;
      setRankInLocalStorage(selectedRank);
      updateRankImage(selectedRank);
      output.textContent = '';
    });
  
    // Show a random tip from the selected rank
    document.getElementById('tipButton').addEventListener('click', () => {
      const selectedRank = skillSelect.value;
      if (!selectedRank || !rocketTips[selectedRank]) {
        output.textContent = 'Please select a rank first.';
        return;
      }
      const tips = getAllTips(rocketTips, selectedRank);
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      output.textContent = randomTip;
    });
  
    // Show all tips for the selected rank
    document.getElementById('allTipsButton').addEventListener('click', () => {
      const selectedRank = skillSelect.value;
      if (!selectedRank || !rocketTips[selectedRank]) {
        output.textContent = 'Please select a rank first.';
        return;
      }
      output.innerHTML = buildAllTipsHTML(rocketTips, selectedRank);
    });
  }
  
  // Show a random tip for a given rank
  function showRandomTip(rank) {
    if (!rank || !rocketTips[rank]) {
      return;
    }
    const tips = getAllTips(rocketTips, rank);
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    document.getElementById('output').textContent = randomTip;
  }
  
  // Initialize the app
  async function init() {
    try {
      rocketTips = await fetchTipsData();
      setupEventListeners();
    } catch (error) {
      document.getElementById('output').textContent = 'Error loading tips. Try again later.';
    }
  }
  
  // Declare the variable for rocketTips and selectedRank
  let rocketTips = {};
  let selectedRank = '';
  
  // Call the init function to start everything
  init();
  
























// // Fetch the tips data
// async function fetchTipsData() {
//     try {
//       const response = await fetch('./data/tips.json');  // Updated path to access the 'data' folder
//       if (!response.ok) throw new Error('Failed to fetch tips');
//       return await response.json();
//     } catch (error) {
//       console.error('Fetch error:', error);
//       throw error;
//     }
//   }

//   // Capitalize the first letter of a word
//   function capitalize(word) {
//     return word.charAt(0).toUpperCase() + word.slice(1);
//   }
  
//   // Get all tips for a given rank
//   function getAllTips(tips, rank) {
//     if (!tips[rank]) return [];
//     return Object.entries(tips[rank]).flatMap(([category, tipList]) =>
//       tipList.map(tip => `${capitalize(category)} Tip: ${tip}`)
//     );
//   }
  
//   // Build HTML to display all tips for a given rank
//   function buildAllTipsHTML(tips, rank) {
//     const rankTips = tips[rank];
//     if (!rankTips) return '';
  
//     let output = '';
//     for (const [category, tipList] of Object.entries(rankTips)) {
//       output += `<strong>${capitalize(category)}:</strong><ul>`;
//       tipList.forEach(tip => {
//         output += `<li>${tip}</li>`;
//       });
//       output += '</ul>';
//     }
//     return output;
//   }
  
//   // Update the rank image when a user selects a rank
//   function updateRankImage(rank) {
//     const img = document.getElementById('rankImage');
//     img.src = `images/${rank || 'na-logo'}.png`;
//     img.alt = rank ? `${rank} rank logo` : 'No Rank selected';
//   }
  
//   // Set up event listeners for the buttons and select
//   function setupEventListeners() {
//     const skillSelect = document.getElementById('skillLevel');
//     const output = document.getElementById('output');
  
//     skillSelect.addEventListener('change', (e) => {
//       selectedRank = e.target.value;
//       updateRankImage(selectedRank);
//       output.textContent = '';
//     });
  
//     // Show a random tip from the selected rank
//     document.getElementById('tipButton').addEventListener('click', () => {
//       if (!selectedRank || !rocketTips[selectedRank]) {
//         output.textContent = 'Please select a rank first.';
//         return;
//       }
//       const tips = getAllTips(rocketTips, selectedRank);
//       const randomTip = tips[Math.floor(Math.random() * tips.length)];
//       output.textContent = randomTip;
//     });
  
//     // Show all tips for the selected rank
//     document.getElementById('allTipsButton').addEventListener('click', () => {
//       if (!selectedRank || !rocketTips[selectedRank]) {
//         output.textContent = 'Please select a rank first.';
//         return;
//       }
//       output.innerHTML = buildAllTipsHTML(rocketTips, selectedRank);
//     });
//   }
  
//   // Initialize the app
//   async function init() {
//     try {
//       rocketTips = await fetchTipsData();
//       setupEventListeners();
//     } catch (error) {
//       document.getElementById('output').textContent = 'Error loading tips. Try again later.';
//     }
//   }
  
//   // Declare the variable for rocketTips and selectedRank
//   let rocketTips = {};
//   let selectedRank = '';


//   // Set the rank in localStorage
// function setRankInLocalStorage(rank) {
//     localStorage.setItem('selectedRank', rank);
// }
  
//   // Get the rank from localStorage
//   function getRankFromLocalStorage() {
//     return localStorage.getItem('selectedRank');
// }

// // Check if a rank is already selected in localStorage
// const storedRank = getRankFromLocalStorage();
// if (storedRank) {
//   skillSelect.value = storedRank;
//   updateRankImage(storedRank);
//   output.textContent = 'Loading tips...'; // Display message while tips load
//   showRandomTip(storedRank);
// }

// // Show a random tip for a given rank
// function showRandomTip(rank) {
//     if (!rank || !rocketTips[rank]) {
//       return;
//     }
//     const tips = getAllTips(rocketTips, rank);
//     const randomTip = tips[Math.floor(Math.random() * tips.length)];
//     document.getElementById('output').textContent = randomTip;
//   }

// // When the user selects a rank
// skillSelect.addEventListener('change', (e) => {
//     const selectedRank = e.target.value;
//     setRankInLocalStorage(selectedRank); // Save the selected rank to localStorage
//     updateRankImage(selectedRank);
//     output.textContent = '';
//   });
  
  



//   // Call the init function to start everything
//   init();


// function getAllTips() {
//     const userRank = document.getElementById("skillLevel").value;
//     localStorage.setItem("userRank", userRank);

//     const categories = Object.keys(rocketTips[userRank]);
//     let outputText = `Here are all ${userRank} tips:<br>`;

//     categories.forEach(category => {
//         const tipsArray = rocketTips[userRank][category];
//         const formattedTips = tipsArray.map((tip, index) => `🔹 ${category.toUpperCase()} - Tip ${index + 1}: ${tip}`).join("<br>");
//         outputText += `<br>${formattedTips}`;
//     });

//     document.getElementById("output").innerHTML = outputText;
// }


// function getRandomTip() {
//     const userRank = document.getElementById("skillLevel").value;
//     localStorage.setItem("userRank", userRank);

//     const categories = Object.keys(rocketTips[userRank]);
//     const randomCategory = categories[Math.floor(Math.random() * categories.length)];
//     const randomTips = rocketTips[userRank][randomCategory];
//     const randomTip = randomTips[Math.floor(Math.random() * randomTips.length)];

//     document.getElementById("output").innerHTML = `${userRank.toUpperCase()} - ${randomCategory.toUpperCase()}:<br>${randomTip}`;
// }

// const tipButton = document.getElementById("tipButton");
// tipButton.addEventListener("click", getRandomTip);

// const allTipsButton = document.getElementById("allTipsButton");
// allTipsButton.addEventListener("click", getAllTips);


// document.addEventListener("DOMContentLoaded", function () {
//     const userRank = document.getElementById("skillLevel");
//     const rankImage = document.getElementById("rankImage");

//     const savedRank = localStorage.getItem("userRank");

//     if (savedRank) {
//         userRank.value = savedRank;
//         updateImage(savedRank);
//     }

//     userRank.addEventListener("change", function () {
//         const rank = this.value;

//         // Save selected rank in local storage
//         localStorage.setItem("userRank", rank);

//         // Update image
//         updateImage(rank);
//     });

//     function updateImage(rank) {
//         let imagePath = "";
//         let imageAlt = "";

//         switch (rank) {
//             case "bronze":
//                 imagePath = "images/bronze.png";
//                 imageAlt = "Bronze Rank Image";
//                 break;
//             case "silver":
//                 imagePath = "images/silver.png";
//                 imageAlt = "Silver Rank Image";
//                 break;
//             case "gold":
//                 imagePath = "images/gold.png";
//                 imageAlt = "Gold Rank Image";
//                 break;
//             case "plat":
//                 imagePath = "images/plat.png";
//                 imageAlt = "Platinum Rank Image";
//                 break;
//             case "diamond":
//                 imagePath = "images/diamond.png";
//                 imageAlt = "Diamond Rank Image";
//                 break;
//             case "champ":
//                 imagePath = "images/champ.png";
//                 imageAlt = "Champion Rank Image";
//                 break;
//             case "gc":
//                 imagePath = "images/gc.png";
//                 imageAlt = "Grand Champion Rank Image";
//                 break;
//             case "ssl":
//                 imagePath = "images/ssl.png";
//                 imageAlt = "Supersonic Legend Rank Image";
//                 break;
//             default:
//                 imagePath = "";
//                 imageAlt = "";
//         }

//         rankImage.src = imagePath;
//         rankImage.alt = imageAlt;
//     }
// });