import { showCourses } from './utilities/dom.js';

const popularCoursesButton = document.querySelector('#popular-courses');
const currentCoursesButton = document.querySelector('#current-courses');
const allCoursesButton = document.querySelector('#all-courses');

let popularCourses = [];
let currentCourses = [];

const initApp = () => {
  findCourses();
};

const findCourses = async () => {
  const url = 'http://localhost:3000/utbildningar';

  try {
    const response = await fetch(url);
    if (response.ok) {
      const courses = await response.json();

      // Populära kureser
      popularCourses = courses.filter((course) => course.popular);

      // Aktuella kureser
      const filterDate = new Date();
      console.log(filterDate);
      currentCourses = courses.filter((course) => {
        return new Date(course.startDate) > filterDate;
      });

      console.log(currentCourses);

      showCourses(courses);
    } else {
      throw new Error(response.status.toString());
    }
  } catch (error) {
    console.log(error);
  }
};

const showPopularCourses = () => {
  console.log('klick populärt');
  showCourses(popularCourses);
};

const showCurrentCourses = () => {
  showCourses(currentCourses);
};

allCoursesButton.addEventListener('click', findCourses);
currentCoursesButton.addEventListener('click', showCurrentCourses);
popularCoursesButton.addEventListener('click', showPopularCourses);
addEventListener('DOMContentLoaded', initApp);
