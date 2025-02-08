export const getCourses = async () => {
  const url = 'http://localhost:3000/utbildningar';

  try {
    const response = await fetch(url);
    if (response.ok) {
      const courses = await response.json();

      return courses;
    } else {
      throw new Error(response.status.toString());
    }
  } catch (error) {
    console.log(error);
  }
};

export const getThisCourse = async (urlString) => {
  let url = urlString;

  const id = location.search.split('=')[1];

  url += id;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const course = await response.json();

      return course;
    } else {
      throw new Error(response.status.toString());
    }
  } catch (error) {
    console.log(error);
  }
};

export const getBookingInfo = async (endpoint, courseId) => {
  const url = `http://localhost:3000/${endpoint}?courseId=${courseId}`;

  const response = await fetch(url);
  if (response.ok) {
    const bookings = await response.json();

    return bookings;
  } else {
    return 'error';
  }
};

export const postToDB = async (urlString, data) => {
  const url = urlString;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('POST successfull!');
    } else {
      console.error('POST error');
    }
  } catch (error) {
    console.error('Network error:', error);
  }

  return;
};
