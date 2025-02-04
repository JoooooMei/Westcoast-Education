import { showAllCoursesBackoffice } from './utilities/dom.js';
import { findCourses } from './utilities/api.js';

const initApp = () => {
  showAllCourses();
};

const showAllCourses = async () => {
  const courses = await findCourses();
  showAllCoursesBackoffice(courses);
};

// Längst ner
document.addEventListener('DOMContentLoaded', initApp);
