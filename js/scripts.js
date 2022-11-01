//Empty array that will hold values from the API
let employees = [];

//Stores the DOM element that is the container for the employees
const gallery = document.getElementById('gallery');

/*****
  Fetch data from the API
*****/
fetch('https://randomuser.me/api/?results=12&nat=US')
  .then(response => response.json())
  .then(response => response.results)
  .then(displayEmployees)
  .catch(err => console.log(err))

/*****
  Function displayEmployees will create the HTML markup for the employee elements.
  It will loop through each of the 12 employees to add each to the HTML through a template literal.
*****/
function displayEmployees(employeeData) {
  employees = employeeData;
  let employeeHTML = '';

  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let state = employee.location.state;
    let picture = employee.picture;

    employeeHTML += `
      <div class="card" data-index="${index}">
        <div class="card-img-container">
            <img class="card-img" src="${picture.large}">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
          <p class="card-text">${email}</p>
          <p class="card-text cap">${city}, ${state}</p>
        </div>
      </div>
    `
  });

  gallery.insertAdjacentHTML('beforeend', employeeHTML);
}

/*****
  Function displayModal will create a modal pop up with additional employee details displaying.
*****/
function displayModal(index) {
  // use object destructuring to make template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];

    let date = new Date(dob.date);
    let month = 'date.getMonth()';
      month = parseInt(month.padStart(2, "0"));
    let day = 'date.getDate()';
      day = parseInt(day.padStart(2, "0"));


    const modalHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                    <p class="modal-text">${email}</p>
                    <p class="modal-text cap">${city}</p>
                    <hr>
                    <p class="modal-text">${phone}</p>
                    <p class="modal-text">${street}, ${state} ${postcode}</p>
                    <p class="modal-text">Birthday: ${month}/${day}/${date.getFullYear()}</p>
                </div>
            </div>
        `;

    //overlay.classList.remove("hidden");
    gallery.innerHTML = modalHTML;
}

/*****
  Event Listeners: when any part of an employee card is clicked, the modal window should pop up.
  When the X is clicked on the modal, add hidden class to the modal overlay.
*****/
gallery.addEventListener('click', event => {
  // make sure the click is not on the gridContainer itself
  if (event.target !== gallery) {
    // select the card element based on its proximity to actual element clicked
    const card = event.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
  }
});
