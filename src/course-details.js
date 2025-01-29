import { showAllCourses } from './utilities/dom.js';

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
      dispayCourse(course);
    } else {
      throw new Error(response.status.toString());
    }
  } catch (error) {
    console.log(error);
  }
};

const dispayCourse = (course) => {
  const div = document.querySelector('#course-details');
  div.innerHTML = `
  <h2 class="course-header">${course.courseName}</h2>
  
  <div class="course-wrapper">
    <div class="image-wrapper">
      <img src="${course.imageUrl}" alt="" />
    </div>
    <div class="details-card">
      <ul>
        <li><span>Kursnamn:</span> ${course.courseName}</li>
        <li><span>Kursnummer:</span> ${course.id}</li>
        <li><span>Kursens längd:</span> ${course.duration} dagar</li>
        <li><span>Startdatum:</span> ${course.startDate}</li>
        <li>
          <i class="fa-solid fa-location-dot"></i><span>Klassrum:</span> ${
            course.classRoom ? `Ja` : `Nej`
          }
        </li>
        <li><i class="fa-regular fa-globe"></i><span> Distans:</span> ${
          course.distanceCourse ? `Ja` : `Nej`
        }</li>
      </ul>
    </div>
  </div>
  <div class="description">
    <p>
      Denna kurs ger dig en omfattande introduktion till
      blockchain-teknologi och dess användningsområden. Du kommer att lära
      dig hur distribuerade system fungerar, grunderna i kryptografi samt
      hur smarta kontrakt kan automatisera processer på ett säkert sätt.
      Kursen inkluderar praktiska övningar där du får skapa och implementera
      dina egna blockchain-applikationer.
    </p>
  </div>
  <div class="button-wrapper">
    <button id="boka-klassrum">Boka i klassrum</button>
    <button id="boka-distans">Boka distans</button>
  </div>
  `;

  document.querySelector('.wrap').appendChild(div);
};

document.addEventListener('DOMContentLoaded', initApp);
