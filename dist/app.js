import { showAllCourses } from './utilities/dom.js';
const initApp = () => {
    // showAllCourses();
    findCourses();
};
addEventListener('DOMContentLoaded', initApp);
const findCourses = async () => {
    const url = 'http://localhost:3000/utbildningar';
    try {
        const response = await fetch(url);
        if (response.ok) {
            const courses = await response.json();
            showAllCourses(courses);
        }
        else {
            throw new Error(response.status.toString());
        }
    }
    catch (error) {
        console.log(error);
    }
};
const loadVehicles = async () => {
    const url = 'http://localhost:3000/vehicles';
    const response = await fetch(url); //GET ANROP...
    if (response.ok) {
        const vehicles = await response.json(); //Hämta ut data ur body...
        displayVehicles(vehicles);
    }
};
// const findMovie = async (): Promise<void> => {
//   const id = location.search.split('=')[1];
//   const key = 'c225640b9109317dc84c9f661f0ca0ba';
//   const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;
//   try {
//     const response = await fetch(url);
//     if (response.ok) {
//       const body = await response.json();
//       const movie = body as IMovieDetail;
//       displayMovie(movie);
//     } else {
//       throw new Error(response.status.toString());
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
