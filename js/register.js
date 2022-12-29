var URL = 'https://____.firebaseio.com/participants.json';
var registerForm = document.getElementById('register-form');
var registerButton = document.getElementById('register-button');
var teamNames = document.getElementById('team-names');
var teamPhones = document.getElementById('team-phones');

// Form Inputs
var teamName = document.getElementById('team-name');
var college = document.getElementById('college');
var email = document.getElementById('email');
var members = document.getElementById('members');

function insertData(obj) {
  var data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  };

  fetch(URL, data)
    .then(function(response) {
      return response.json();
    })
    .then(function() {
      clearForm();
      window.location.href = './success.html?s=true';
    })
    .catch(function() {
      clearForm();
      alert('Something went wrong, Please try again later.');
    });
}

function submitHandler(event) {
  event.preventDefault();
  disableForm();

  if (!validateForm()) {
    enableForm();
    return;
  }

  var data = {};
  data.teamName = teamName.value;
  data.college = college.value;
  data.email = email.value;
  data.registeredOn = new Date(Date.now()).toString();
  data.noOfMembers = +members.value;
  data.isCheckedIn = false;
  data.isVerified = false;
  data.memberNames = [];
  data.memberPhones = [];

  for (var i = 1; i <= data.noOfMembers; i++) {
    data.memberNames.push(document.getElementById('member-name-' + i).value);
    data.memberPhones.push(document.getElementById('member-phone-' + i).value);
  }

  insertData(data);
}

function validateForm() {
  var atpos = email.value.indexOf('@');
  var dotpos = email.value.lastIndexOf('.');
  var noOfMembers = +members.value;
  var helpBlock = document.getElementsByClassName('help-block');

  for (var i = 0; i < helpBlock.length; i++) {
    helpBlock.textContent = '';
  }

  if (teamName.value.trim() === '') {
    document.getElementById(
      'team-name-error'
    ).textContent = teamName.getAttribute('data-validation-required-message');
    return false;
  } else {
    document.getElementById('team-name-error').textContent = '';
  }

  if (college.value.trim() === '') {
    document.getElementById('college-error').textContent = college.getAttribute(
      'data-validation-required-message'
    );
    return false;
  } else {
    document.getElementById('college-error').textContent = '';
  }

  if (email.value.trim() === '') {
    document.getElementById('email-error').textContent = email.getAttribute(
      'data-validation-required-message'
    );
    return false;
  } else {
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
      document.getElementById('email-error').textContent =
        'Enter a valid Email';
      return false;
    } else {
      document.getElementById('email-error').textContent = '';
    }
  }

  if (isNaN(noOfMembers)) {
    document.getElementById('members-error').textContent = members.getAttribute(
      'data-validation-required-message'
    );
    return false;
  } else {
    document.getElementById('members-error').textContent = '';
  }

  for (var i = 1; i <= noOfMembers; i++) {
    if (document.getElementById('member-name-' + i).value.trim() === '') {
      document.getElementById('member-name-error-' + i).textContent =
        'Member Name is Required';
      return false;
    } else {
      document.getElementById('member-name-error-' + i).textContent = '';
    }

    if (document.getElementById('member-phone-' + i).value.trim() === '') {
      document.getElementById('member-phone-error-' + i).textContent =
        'Phone Number is Required';
      return false;
    } else {
      document.getElementById('member-phone-error-' + i).textContent = '';
    }

    if (
      document.getElementById('member-phone-' + i).value.length !== 10 ||
      !/^\d+$/.test(document.getElementById('member-phone-' + i).value)
    ) {
      document.getElementById('member-phone-error-' + i).textContent =
        'Enter Valid Phone Number';
      return false;
    } else {
      document.getElementById('member-phone-error-' + i).textContent = '';
    }
  }

  return true;
}

function membersChangeHandler(event) {
  event.preventDefault();
  cleanNode(teamNames);
  cleanNode(teamPhones);
  createFormElements(+event.target.value);
}

function disableForm() {
  var inputs = document.querySelectorAll('input');
  var select = document.querySelector('select');

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }

  select.disabled = true;
  registerButton.textContent = 'Submitting';
  registerButton.disabled = true;
}

function enableForm() {
  var inputs = document.querySelectorAll('input');
  var select = document.querySelector('select');

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = false;
  }

  select.disabled = false;
  registerButton.textContent = 'Submit Team Details';
  registerButton.disabled = false;
}

function clearForm() {
  var inputs = document.querySelectorAll('input');
  var select = document.querySelector('select');

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }

  select.selectedIndex = 0;
}

function createFormElements(count) {
  for (var i = 1; i <= count; i++) {
    // <div class="form-group"></div>
    var formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    // Name <input />
    var nameInput = document.createElement('input');
    nameInput.classList.add('form-control');
    nameInput.id = 'member-name-' + i;
    nameInput.type = 'text';
    nameInput.placeholder = 'Member ' + i + ' Name *';
    nameInput.required = true;

    // Name Error <p>
    var pNameError = document.createElement('p');
    pNameError.id = 'member-name-error-' + i;
    pNameError.classList.add('help-block');
    pNameError.classList.add('text-danger');

    formGroup.appendChild(nameInput);
    formGroup.appendChild(pNameError);
    teamNames.appendChild(formGroup);
  }

  for (var i = 1; i <= count; i++) {
    // <div class="form-group"></div>
    var formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    // Phone <input />
    var phoneInput = document.createElement('input');
    phoneInput.classList.add('form-control');
    phoneInput.id = 'member-phone-' + i;
    phoneInput.type = 'text';
    phoneInput.placeholder = 'Member ' + i + ' Phone *';
    phoneInput.required = true;

    // Phone Error <p>
    var pPhoneError = document.createElement('p');
    pPhoneError.id = 'member-phone-error-' + i;
    pPhoneError.classList.add('help-block');
    pPhoneError.classList.add('text-danger');

    formGroup.appendChild(phoneInput);
    formGroup.appendChild(pPhoneError);
    teamPhones.appendChild(formGroup);
  }
}

function cleanNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

registerForm.addEventListener('submit', submitHandler);
members.addEventListener('change', membersChangeHandler);
