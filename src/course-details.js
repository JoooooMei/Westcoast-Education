import { showCourseDetails } from './utilities/dom.js';

const initApp = () => {
  findCourses();
};

const findCourses = async () => {
  let url = 'http://localhost:3000/utbildningar/';

  const id = location.search.split('=')[1];

  url += id;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const course = await response.json();
      showCourseDetails(course);
    } else {
      throw new Error(response.status.toString());
    }
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener('DOMContentLoaded', initApp);
