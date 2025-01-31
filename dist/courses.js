import { showCourses } from './utilities/dom.js';
const popularCoursesButton = document.querySelector('#popular-courses');
const initApp = () => {
    findCourses();
};
const findCourses = async () => {
    const url = 'http://localhost:3000/utbildningar';
    try {
        const response = await fetch(url);
        if (response.ok) {
            const courses = await response.json();
            ();
            const popularCourses = courses.filter((course) => course.popular);
            showCourses(courses);
        }
        else {
            throw new Error(response.status.toString());
        }
    }
    catch (error) {
        console.log(error);
    }
};
const showPopularCourses = () => {
    console.log('klick populärt');
};
popularCoursesButton.addEventListener('click', showPopularCourses);
addEventListener('DOMContentLoaded', initApp);
