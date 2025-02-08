import { showCourseDetails } from './utilities/dom.js';
import { getThisCourse } from './utilities/api.js';

const initApp = () => {
  ShowCourse();
};

const ShowCourse = async () => {
  let url = 'http://localhost:3000/utbildningar/';
  const course = await getThisCourse(url);
  showCourseDetails(course);
};

document.addEventListener('DOMContentLoaded', initApp);
