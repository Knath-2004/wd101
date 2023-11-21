const form = document.getElementById('registrationForm');
  const tableBody = document.querySelector('#formDataTable tbody');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value;
    const dob = new Date(document.getElementById('dob').value);
    const termsChecked = document.getElementById('termsAndConditions').checked;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('emailError').textContent = 'Invalid email format';
      return;
    } else {
      document.getElementById('emailError').textContent = '';
    }

    // Validate age between 18 and 55
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (age < 18 || age > 55) {
      document.getElementById('dobError').textContent = 'Age should be between 18 and 55';
      return;
    } else {
      document.getElementById('dobError').textContent = '';
    }

    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match');
      return;
    }

    const userData = {
      name: document.getElementById('name').value,
      email,
      password,
      dob: dob.toISOString().split('T')[0],
      termsChecked: termsChecked ? 'Yes' : 'No'
    };

    let savedData = JSON.parse(localStorage.getItem('userEntries')) || [];
    savedData.push(userData);
    localStorage.setItem('userEntries', JSON.stringify(savedData));

    displayTable();
    form.reset();
  });

  function displayTable() {
    tableBody.innerHTML = '';

    const savedData = JSON.parse(localStorage.getItem('userEntries')) || [];
    savedData.forEach(data => {
      const bodyRow = document.createElement('tr');

      Object.values(data).forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        bodyRow.appendChild(td);
      });

      tableBody.appendChild(bodyRow);
    });
  }

  displayTable();