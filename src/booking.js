const bookingForm = document.querySelector('#booking-form');
const submitButton = document.querySelector('#submit');
const url = 'http://localhost:3000/customers';

const initApp = () => {};

const handleFormInput = async (e) => {
  if (!e.target.closest('form').checkValidity()) {
    // Låt webbläsaren visa valideringsmeddelanden
    return;
  }
  e.preventDefault();

  const newBookingData = new FormData(bookingForm);
  const body = Object.fromEntries(newBookingData);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      console.log('Customer added successfully!');
    } else {
      console.error('Error adding customer');
    }
  } catch (error) {
    console.error('Network error:', error);
  }

  updateUI();
};

const updateUI = () => {
  console.log('hello im here!');
};

bookingForm.addEventListener('submit', handleFormInput);
document.addEventListener('DOMContentLoaded', initApp);
