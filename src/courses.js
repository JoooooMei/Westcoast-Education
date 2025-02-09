import { showCourses } from './utilities/dom.js';
import { getCourses, getBookingInfo } from './utilities/api.js';

const popularCoursesButton = document.querySelector('#popular-courses');
const currentCoursesButton = document.querySelector('#current-courses');
const allCoursesButton = document.querySelector('#all-courses');

let popularCourses = [];
let currentCourses = [];

const initApp = () => {
  showAllCourses();
};

const showAllCourses = async () => {
  const courses = await getCourses();
  showCourses(courses);
};

const showPopularCourses = async () => {
  // Visar kurser med > 3 bokningar
  const courses = await getCourses();

  const results = [];
  for (let course of courses) {
    const bookings = await getBookingInfo('customerOrders', course.courseId);

    if (bookings.length > 3) {
      results.push(bookings);
    }
  }

  const flattenedResults = results.flat();

  const courseIds = [];
  flattenedResults.forEach((booking) => {
    courseIds.push(booking.courseId);
  });

  const uniqueCourseIds = [...new Set(courseIds)];

  const filteredCourses = courses.filter((course) =>
    uniqueCourseIds.includes(course.courseId)
  );

  showCourses(filteredCourses);
};

const showCurrentCourses = async () => {
  const courses = await getCourses();

  const filterDate = new Date();

  currentCourses = courses.filter((course) => {
    return new Date(course.startDate) > filterDate;
  });
  showCourses(currentCourses);
};

allCoursesButton.addEventListener('click', showAllCourses);
currentCoursesButton.addEventListener('click', showCurrentCourses);
popularCoursesButton.addEventListener('click', showPopularCourses);
addEventListener('DOMContentLoaded', initApp);
