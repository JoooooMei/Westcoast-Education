import { findThisCourse } from './utilities/api.js';

const bookingForm = document.querySelector('#booking-form');
const submitButton = document.querySelector('#submit');

const initApp = () => {
  ShowCourse();
};

const ShowCourse = async () => {
  let url = 'http://localhost:3000/utbildningar/';
  const course = await findThisCourse(url);
  updateUI(course);
};

const handleFormInput = async (e) => {
  if (!e.target.closest('form').checkValidity()) {
    // Låt webbläsaren visa valideringsmeddelanden
    return;
  }
  e.preventDefault();

  const newBookingData = new FormData(bookingForm);
  const body = Object.fromEntries(newBookingData);

  try {
    const response = await fetch('http://localhost:3000/customers', {
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
};

const updateUI = (course) => {
  console.log(course);

  const div = document.querySelector('#booking-info');
  div.innerHTML = `
  <div class="thumbnail-wrapper">
    <img src="${course.imageUrl}"  />
  </div>
  <div>
    <h4>Din bokning</h4>
    <p><b>${course.courseName}</b></p>
    <p>Startdatum: ${course.startDate}</p>
  </div>
  `;
};

bookingForm.addEventListener('submit', handleFormInput);
document.addEventListener('DOMContentLoaded', initApp);
