import { showAllCoursesBackoffice } from './utilities/dom.js';
import { findCourses } from './utilities/api.js';
import { generateId } from './utilities/util.js';

const submitButton = document.querySelector('#submit');
const submitForm = document.querySelector('#submit-course');

const initApp = () => {
  getCourses();
};

const getCourses = async () => {
  const courses = await findCourses();
  showAllCoursesBackoffice(courses);
};

export const getBookingInfo = async (endpoint, courseId) => {
  const url = `http://localhost:3000/${endpoint}?courseId=${courseId}`;
  console.log(url);

  const response = await fetch(url);
  if (response.ok) {
    const bookings = await response.json();

    return bookings;
  } else {
    return 'error';
  }
};

const handleFormInput = async (e) => {
  e.preventDefault();
  console.log('click submit');
  const id = generateId();

  const newBookingData = new FormData(submitForm);
  const formData = Object.fromEntries(newBookingData);

  if (formData.classRoom === 'on') {
    formData.classRoom = true;
  } else {
    formData.classRoom = false;
  }
  if (formData.distanceCourse === 'on') {
    formData.distanceCourse = true;
  } else {
    formData.distanceCourse = false;
  }

  const newCourse = {
    courseId: id,
    courseName: formData.courseName,
    description: formData.description,
    price: formData.price,
    classRoom: formData.classRoom,
    distanceCourse: formData.distanceCourse,
    startDate: formData.startDate,
    duration: formData.duration,
  };

  try {
    const response = await fetch('http://localhost:3000/utbildningar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCourse),
    });

    if (response.ok) {
      console.log('Course added successfully!');
    } else {
      console.error('Error adding course');
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

if (submitButton) {
  submitButton.addEventListener('click', handleFormInput);
}

document.addEventListener('DOMContentLoaded', initApp);
