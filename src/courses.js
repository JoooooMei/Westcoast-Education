import { showCourses } from './utilities/dom.js';
import { getCourses } from './utilities/api.js';

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
  const courses = await getCourses();

  popularCourses = courses.filter((course) => course.popular);
  showCourses(popularCourses);
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
