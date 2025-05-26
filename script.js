// Constructor function ....also The main player in this code
function UserDetails(name, age, isAuthorised) {
    this.name = name;
    this.age = age;
    this.isAuthorised = isAuthorised;
}


// Get DOM references
const userForm = document.getElementById('userForm');
const userGrid = document.querySelector('.user-grid');

// Load existing users from local storage


let users = JSON.parse(localStorage.getItem('users')) || []; // Load from localStorage or start fresh
// Render existing users on page load



users.forEach(user => {
    renderUserCard(new UserDetails(user.name, user.age, user.isAuthorised));
});
updateUserCount();

// Handle form submission
userForm.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent default first , if I did not use this thenpage will refresh and we will lose the data as when I click submit button the page refreshes!

    // Get form values
    const name = userForm.querySelector('.name').value;//.value se hmme input feild ka value milta hai
    const age = userForm.querySelector('.age').value;
    const isAuthorised = userForm.querySelector('.auth').checked;

    // Create new user object
    const newUser = new UserDetails(name, age, isAuthorised);

    // Render the user card
    users.push(newUser);     // Add new user to the users array
    renderUserCard(newUser);
    updateUserCount();
    updateLocalStorage();


    // Reset the form
    userForm.reset();
});

// Function to create and append user card
function renderUserCard(user) {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');

    userCard.innerHTML = `
        <h3>${user.name}</h3>
        <p>Age: ${user.age}</p>
        <p>Status: ${user.isAuthorised ? 'Authorized' : 'Not Authorized'}</p>
        <button class="delete-btn">Delete</button>
    `;

    // Delete functionality
   // Inside delete button event:
userCard.querySelector('.delete-btn').addEventListener('click', () => {
    users = users.filter(u =>
        !(u.name === user.name && u.age == user.age && u.isAuthorised === user.isAuthorised)
    );
    updateLocalStorage();
    // Remove from DOM
    userCard.remove();
    // Update count after removing card
    updateUserCount();
});


    // Add card to grid
    userGrid.appendChild(userCard);
}
// Function to count all User 
function updateUserCount() {
    const count = document.querySelectorAll('.user-card').length;
    document.querySelector('.user-count').innerText = `Total Users: ${count}`;
}
// Function to filter and show users based on their authorization status
function showAllUsers() {
    userGrid.innerHTML = '';
    users.forEach(user => renderUserCard(user));
    updateUserCount();
}

function showAuthorizedUsers() {
    userGrid.innerHTML = '';
    users.filter(user => user.isAuthorised).forEach(user => renderUserCard(user));
    updateUserCount();
}

function showUnauthorizedUsers() {
    userGrid.innerHTML = '';
    users.filter(user => !user.isAuthorised).forEach(user => renderUserCard(user));
    updateUserCount();
}
// Attach the event listeners to the filter buttons
document.getElementById('showAllBtn').addEventListener('click', showAllUsers);

document.getElementById('showAuthorizedBtn').addEventListener('click', showAuthorizedUsers);

document.getElementById('showUnauthorizedBtn').addEventListener('click', showUnauthorizedUsers);

// To delete all users
document.getElementById('clearAllBtn').addEventListener('click', () => {
    // Instantly delete everything 🔥
    users = [];
    updateLocalStorage();
    userGrid.innerHTML = '';
    updateUserCount();
});


// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}
