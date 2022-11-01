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

*****/
