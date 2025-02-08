import { getThisCourse, postToDB } from './utilities/api.js';
import { generateId } from './utilities/util.js';
import { showBookingDetails } from './utilities/dom.js';

const bookingForm = document.querySelector('#booking-form');

const initApp = () => {
  ShowCourse();
};

const ShowCourse = async () => {
  let url = 'http://localhost:3000/utbildningar/';
  const course = await getThisCourse(url);
  showBookingDetails(course);
};

const handleFormInput = async (e) => {
  e.preventDefault();
  let url = 'http://localhost:3000/utbildningar/';
  const course = await getThisCourse(url);

  if (bookingForm === null) return;

  if (!e.target.closest('form').checkValidity()) {
    // Låt webbläsaren visa valideringsmeddelanden
    return;
  }
  const id = generateId();
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
    courseName: course.courseName,
    courseId: course.courseId,
  };

  if (formData.courseFormat === 'Klassrum') {
    customerOrder.classRoom = true;
  }

  if (formData.courseFormat === 'Distanskurs') {
    customerOrder.distanceCourse = true;
  }

  await postToDB('http://localhost:3000/customerOrders', customerOrder);

  await postToDB('http://localhost:3000/customers', customer);
};

bookingForm.addEventListener('submit', handleFormInput);

bookingForm.onsubmit = () => false;
document.addEventListener('DOMContentLoaded', initApp);
