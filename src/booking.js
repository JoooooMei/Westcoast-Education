import { findThisCourse } from './utilities/api.js';

import { showCourses } from './utilities/dom.js';

const bookingForm = document.querySelector('#booking-form');

const initApp = () => {
  ShowCourse();
};

const generateBookingId = () => {
  // Jag kan inte för allt i världen få crypto.UUID() att fungera ...
  // Därför har jag denna komplicerade funktionen istället.
  const array = new Uint32Array(4);
  crypto.getRandomValues(array);

  const timestamp = Date.now().toString(16);
  const randomPart = Array.from(array, (x) =>
    x.toString(16).padStart(8, '0')
  ).join('');

  return `${timestamp}-${randomPart}`;
};

const ShowCourse = async () => {
  let url = 'http://localhost:3000/utbildningar/';
  const course = await findThisCourse(url);
  showBookingDetails(course);
};

const handleFormInput = async (e) => {
  let url = 'http://localhost:3000/utbildningar/';
  const course = await findThisCourse(url);

  e.preventDefault();

  if (bookingForm === null) return;

  if (!e.target.closest('form').checkValidity()) {
    // Låt webbläsaren visa valideringsmeddelanden
    return;
  }
  const id = generateBookingId();
  const newBookingData = new FormData(bookingForm);
  const formData = Object.fromEntries(newBookingData);

  const customer = {
    customerId: id,
    firstName: formData.firstName.toString(),
    lastName: formData.lastName.toString(),
    streetAdress: formData.streetAdress.toString(),
    postalCode: formData.postalCode.toString(),
    city: formData.city.toString(),
    mobilePhone: formData.mobilePhone.toString(),
    email: formData.email.toString(),
  };

  const customerOrder = {
    orderDate: new Date().toLocaleDateString('sv-SE'),
    customer: customer,
    course: course.courseName,
  };

  if (formData.courseFormat === 'Klassrum') {
    customerOrder.classRoom = true;
  }

  if (formData.courseFormat === 'Distanskurs') {
    customerOrder.distanceCourse = true;
  }

  try {
    const response = await fetch('http://localhost:3000/customerOrders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerOrder),
    });

    if (response.ok) {
      console.log('Order added successfully!');
    } else {
      console.error('Error adding order');
    }
  } catch (error) {
    console.error('Network error:', error);
  }

  try {
    const response = await fetch('http://localhost:3000/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
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

const showBookingDetails = (course) => {
  console.log(course);

  const div = document.querySelector('#booking-info');
  const InputCourseFormat = document.querySelector('#input-course-format');

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

  InputCourseFormat.innerHTML = `
    <option value="" disabled selected>Välj kursformat</option>
    ${course.classRoom ? `<option  value="Klassrum">Klassrum</option>` : ''}
    ${
      course.distanceCourse
        ? `<option value="Distanskurs">Distanskurs</option>`
        : ''
    }
  `;
};

const updateUI = () => {
  bookingForm.style.display = 'none';
};

bookingForm.addEventListener('submit', handleFormInput);

bookingForm.onsubmit = () => false;
document.addEventListener('DOMContentLoaded', initApp);
