// Event listener for DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
  // Get the reference to the user table body
  const userTableBody = document.getElementById('userTableBody');

  // Loop through all localStorage items
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    // Check if the key starts with 'user_'
    if (key.startsWith('user_')) {
      // Parse the JSON-stored user data from localStorage
      const userData = JSON.parse(localStorage.getItem(key));

      // Add the user data to the table
      addRowToTable(userTableBody, userData);
    }
  }
});

// Event listener for form submission
const form = document.getElementById('registrationForm');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get the user's date of birth from the form
  const dob = new Date(form.dob.value);

  // Calculate the user's age based on the current year
  const currentYear = new Date().getFullYear();
  const age = currentYear - dob.getFullYear();

  // Validate the user's age to ensure it's between 18 and 55
  if (!(age >= 18 && age <= 55)) {
    alert('Age should be between 18 and 55.');
    return;
  }

  // Generate a unique user key using the current timestamp
  const userKey = 'user_' + Date.now();

  // Create a user object with the form data
  const userData = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value,
    dob: form.dob.value,
    acceptedTerms: form.acceptedTerms.checked,
  };

  // Store the user data in localStorage using the generated key
  localStorage.setItem(userKey, JSON.stringify(userData));

  // Add the user data to the table
  addRowToTable(userTableBody, userData);
});

// Function to add a new user row to the table
function addRowToTable(tableBody, userData) {
  // Create a new table row
  const newRow = tableBody.insertRow();

  // Set a consistent style for all cells
  const cellStyle = 'border border-gray-300 p-2';

  // Add cells for each user data property
  const nameCell = newRow.insertCell();
  nameCell.textContent = userData.name;
  nameCell.className = cellStyle;

  const emailCell = newRow.insertCell();
  emailCell.textContent = userData.email;
  emailCell.className = cellStyle;

  const passwordCell = newRow.insertCell();
  passwordCell.textContent = userData.password;
  passwordCell.className = cellStyle;

  const dobCell = newRow.insertCell();
  dobCell.textContent = userData.dob;
  dobCell.className = cellStyle;

  const acceptedTermsCell = newRow.insertCell();
  acceptedTermsCell.textContent = userData.acceptedTerms;
  acceptedTermsCell.className = cellStyle;
}