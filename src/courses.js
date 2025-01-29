import { showAllCourses } from './utilities/dom.js';
const initApp = () => {
  findCourses();
};

addEventListener('DOMContentLoaded', initApp);

const findCourses = async () => {
  const url = 'http://localhost:3000/utbildningar';

  try {
    const response = await fetch(url);
    if (response.ok) {
      const courses = await response.json();

      const popularCourses = courses.filter((course) => course.popular);
      console.log(popularCourses);
      // const classroomCourses = db.utbildningar.filter(course => course.classRoom);
      showAllCourses(courses);
    } else {
      throw new Error(response.status.toString());
    }
  } catch (error) {
    console.log(error);
  }
};
