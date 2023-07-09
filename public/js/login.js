const loginHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#loginusername').value.trim();
  const password = document.querySelector('#loginpassword').value.trim();
  

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Could not log in.');
    }
  }
};

const signupHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#signupusername').value.trim();
  const password = document.querySelector('#signuppassword').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Could not sign up.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupHandler);
