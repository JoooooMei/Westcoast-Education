export const clearAllCourses = () => {
  const listAllCourses = document.querySelector('#list-all-couses');
  listAllCourses.innerHTML = '';
  return listAllCourses;
};

export const showAllCourses = (courses) => {
  const listAllCourses = clearAllCourses();
  const ul = document.createElement('ul');
  courses.forEach((course) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `./course-details.html?id=${course.id}`;

    a.innerHTML = `
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
    </div>`;
    li.appendChild(a);
    ul.appendChild(li);
  });

  listAllCourses.appendChild(ul);
};
