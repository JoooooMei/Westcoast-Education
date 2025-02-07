import { getBookingInfo } from '../backoffice.js';

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

// export const showAllCoursesBackoffice = async (courses) => {
//   const list = document.querySelector('#course-list');

//   for (let course of courses) {
//     try {
//       const bookings = await getBookingInfo('customerOrders', course.courseId);

//       let i = 0;
//       for (let booking of bookings) {
//         console.log(bookings[i].customer.firstName);
//         i += 1;
//       }
//     } catch (error) {
//       console.log('Inen bokning');
//     }

//     const li = document.createElement('li');
//     li.innerHTML = `
//       <div class="course-name-heading">
//        ${course.courseName}
//       </div>
//       <div>
//         Kursdeltagare
//         <div class="flex">
//           <div>Jag vill ha bookings[i]-customer.firstName här</div>
//           <div></div>
//           <div></div>
//         </div>
//       </div>
//     `;
//     list.appendChild(li);
//   }
// };

export const showAllCoursesBackoffice = async (courses) => {
  const list = document.querySelector('#course-list');

  for (let course of courses) {
    try {
      const bookings = await getBookingInfo('customerOrders', course.courseId);
      console.log(bookings);

      // Skapa kursens list-element
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="course-name-heading">
          ${course.courseName}
        </div>
        <div>
          <h5>Kursdeltagare</h5>
          <div class="booking-details">
            <div class="flex" id="info">
              <div id="user-${course.courseId}"></div>
              <div id="locality-${course.courseId}"></div>
            </div>
           
            
          </div>
        </div>
      `;

      list.appendChild(li);

      // Referens till kursens deltagarcontainer
      const participantContainer = document.querySelector(
        `#user-${course.courseId}`
      );

      const localityContainer = document.querySelector(
        `#locality-${course.courseId}`
      );

      const infoWrapper = document.querySelector('#info');

      // Lägg till alla bokningar i DOM
      bookings.forEach((booking) => {
        const participant = document.createElement('p');
        const locality = document.createElement('p');
        participant.innerHTML = `${booking.customer.firstName} ${booking.customer.lastName}`;
        locality.innerHTML = `  ${
          booking.classRoom
            ? `<i class="fa-solid fa-location-dot"></i><span>Klassrum</span>`
            : ''
        }

        ${
          booking.distanceCourse
            ? `<i class="fa-regular fa-globe"></i><span> Distans</span>`
            : ''
        }`;
        participantContainer.appendChild(participant);
        localityContainer.appendChild(locality);
      });
    } catch (error) {
      console.log('Något gick fel');
    }
  }
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
      ${course.description}
    </p>
  </div>
  <div class="button-wrapper">
    <a class="link-button" href="./booking.html?id=${
      course.id
    }" id="boka-klassrum">Boka</a>
  </div>
  `;

  document.querySelector('.center-wrapper').appendChild(div);
};
