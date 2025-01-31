export const clearAllCourses = () => {
  const listAllCourses = document.querySelector('#list-all-couses');
  listAllCourses.innerHTML = '';
  return listAllCourses;
};

export const showCourses = (courses) => {
  const listAllCourses = clearAllCourses();
  const ul = document.createElement('ul');
  courses.forEach((course) => {
    const li = document.createElement('li');

    li.innerHTML = `
    <a href="./course-details.html?id=${course.id}">
      <div class="thumbnail-wrapper">
        <img src="${course.imageUrl}" alt="" />
      </div>
      <div class="list-content-wrapper">
        <h4>${course.courseName}</h4>
        <p><span>Start:</span> ${course.startDate}</p>
        <p><span>Längd:</span> ${course.duration} dagar</p>
          ${
            course.classRoom
              ? `<p><i class="fa-solid fa-location-dot"></i><span>Klassrum</span></p>`
              : ''
          }
          ${
            course.distanceCourse
              ? `<p><i class="fa-regular fa-globe"></i><span> Distans</span></p>`
              : ''
          }
      </div>
    </a>`;

    ul.appendChild(li);
  });

  listAllCourses.appendChild(ul);
};

export const showCourseDetails = (course) => {
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
    <a class="link-button" href="./booking.html?id=${
      course.id
    }" id="boka-klassrum">Boka i klassrum</a>
    <button id="boka-distans">Boka distans</button>
  </div>
  `;

  document.querySelector('.wrap').appendChild(div);
};
