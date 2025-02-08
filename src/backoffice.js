import { showAllCoursesBackoffice } from './utilities/dom.js';
import { getCourses, postToDB } from './utilities/api.js';
import { generateId } from './utilities/util.js';

const submitButton = document.querySelector('#submit');
const submitForm = document.querySelector('#submit-course');

const initApp = () => {
  callGetCourses();
};

const callGetCourses = async () => {
  const courses = await getCourses();
  showAllCoursesBackoffice(courses);
};

const handleFormInput = async (e) => {
  e.preventDefault();

  const id = generateId();

  const newBookingData = new FormData(submitForm);
  const formData = Object.fromEntries(newBookingData);

  formData.classRoom = formData.classRoom === 'on';
  formData.distanceCourse = formData.distanceCourse === 'on';
  const newCourse = {
    courseId: id,
    courseName: formData.courseName,
    description: formData.description,
    price: formData.price.toString(),
    classRoom: formData.classRoom,
    distanceCourse: formData.distanceCourse,
    startDate: formData.startDate,
    duration: formData.duration,
  };
  await postToDB('http://localhost:3000/utbildningar', newCourse);
};

if (submitButton) {
  submitButton.addEventListener('click', handleFormInput);
}

document.addEventListener('DOMContentLoaded', initApp);
