const button = document.querySelector('button');

export const addToStorage = (data) => {
  localStorage.setItem('bookedCourses', JSON.stringify(data));
};

const handleBooking = () => {};

button.addEventListener('click', handleBooking);
