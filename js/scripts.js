//Empty array that will hold values from the API
let employees = [];

//Stores the DOM element that is the container for the employees
const galleryContainer = document.getElementById('gallery');

//Fetch data from the API
fetch('https://randomuser.me/api/?results=12&nat=US')
  .then(response => response.json())
  .then(json => console.log(json))
