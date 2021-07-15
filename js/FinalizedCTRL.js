// Defines the three textfield variables
const elEmail = document.querySelector(".emailfield");
const elPassword = document.querySelector(".passfield");
const elConfirm = document.querySelector(".cpassfield");
const elUser = document.querySelector(".user");
const elPass = document.querySelector(".pass");

// Defines the toggle password visibility variables
var show = document.querySelector(".show");
var hide = document.querySelector(".hide");

// Defines the toggle password visibility variables
var showy = document.querySelector(".showy");
var hidey = document.querySelector(".hidey");

// Defines the nudge info box variables
var chrome = document.querySelector(".chrome-save");
var save = document.querySelector(".save");
var never = document.querySelector(".never");

// Defines the bottom error message variables
const form = document.getElementById('register');
const emailfield = document.getElementById('emailid');
const passwordfield = document.getElementById('passid');
const cpasswordfield = document.getElementById('cpassid');
var register = document.getElementsByClassName('registerbtn');

// Toggles password visibility (hides password for both password fields)
hide.onclick = function() {
  elPassword.setAttribute("type", "password");
  elConfirm.setAttribute("type", "password");
  hide.style.display = "none";
  show.style.display = "block";
}

// Toggles password visibility (shows password for both password fields)
show.onclick = function() {
  elPassword.setAttribute("type", "text");
  elConfirm.setAttribute("type", "text");
  show.style.display = "none";
  hide.style.display = "block";
}

// Toggles password visibility (hides password for both password fields)
hidey.onclick = function() {
  elPass.setAttribute("type", "password");
  hidey.style.display = "none";
  showy.style.display = "inherit";
}

// Toggles password visibility (shows password for both password fields)
showy.onclick = function() {
  elPass.setAttribute("type", "text");
  showy.style.display = "none";
  hidey.style.display = "inherit";
}

// When submit button is clicked, it will check for validation
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkValidation();
});

// Checks inputs of all textfields (Validation)
function checkValidation() {
  const emailValue = emailfield.value.trim();
  const passValue = passwordfield.value.trim();
  const passValue2 = cpasswordfield.value.trim();

  if (isEmail(emailValue) && passValue != "" && passValue == passValue2) {
    elUser.value = elEmail.value;
    elPass.value = elPassword.value;
    chrome.style.display = "inherit";
  }

  // Checks the input of email field
  if (emailValue == "") {
    setErrorFor(emailfield, "Email cannot be blank");
  }
  else if (!isEmail(emailValue)) {
		setErrorFor(emailfield, "Invalid email");
	}
  else {
    setSuccessFor(emailfield);
  }

  if (passValue == "") {
    setErrorFor(passwordfield, "Password cannot be blank");
  }
  else {
    setSuccessFor(passwordfield, "");
  }

  if (passValue2 == "") {
    setErrorFor(cpasswordfield, "Please retype your password");
  }
  else if (passValue !== passValue2) {
    setErrorFor(cpasswordfield, "Passwords do not match");
  }
  else {
    setSuccessFor(cpasswordfield, "")
  }

}

// Validates the format of the given email
function isEmail(emailfield) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailfield);
}

// Sets the border colour to be red when error occurs
function setErrorFor(input, message) {
  const container = input.parentElement;
  const bottom = container.querySelector(".bottomerror");
  const small = bottom.querySelector("small");

  small.innerText = message;
  container.className = "container error";
}

// Sets the border colour to be green when successful
function setSuccessFor(input) {
	const container = input.parentElement;
	container.className = 'container success';
}
