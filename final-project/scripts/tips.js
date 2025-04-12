import { setCurrentYear, setLastModifiedDate, setupHamburgerMenu } from './util.js';

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the footer with the current year and last modified date
  setCurrentYear();
  setLastModifiedDate();

  // Initialize the hamburger menu functionality
  setupHamburgerMenu();
});



document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.getElementById("rocketDialog");
  const openDialogBtn = document.getElementById("openDialogBtn");
  const closeDialogBtn = document.getElementById("closeDialogBtn");

  // Open the dialog when the button is clicked
  openDialogBtn.addEventListener("click", () => {
    // .showModal() displays the dialog as a modal window
    dialog.showModal();
  });

  // Close the dialog when the close button is clicked
  closeDialogBtn.addEventListener("click", () => {
    dialog.close();
  });
});






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
    img.loading = "lazy";
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
