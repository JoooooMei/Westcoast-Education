import { showCourseDetails } from './utilities/dom.js';
import { findThisCourse } from './utilities/api.js';

const initApp = () => {
  ShowCourse();
};

const ShowCourse = async () => {
  let url = 'http://localhost:3000/utbildningar/';
  const course = await findThisCourse(url);
  showCourseDetails(course);
};

document.addEventListener('DOMContentLoaded', initApp);
