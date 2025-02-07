import { showAllCoursesBackoffice } from './utilities/dom.js';
import { findCourses } from './utilities/api.js';

const initApp = () => {
  showAllCourses();
};

const showAllCourses = async () => {
  const courses = await findCourses();
  showAllCoursesBackoffice(courses);
};

export const getBookingInfo = async (endpoint, courseId) => {
  const url = `http://localhost:3000/${endpoint}?courseId=${courseId}`;

  const response = await fetch(url);
  if (response.ok) {
    const bookings = await response.json();

    return bookings;
  } else {
    return 'error';
  }
};

document.addEventListener('DOMContentLoaded', initApp);
