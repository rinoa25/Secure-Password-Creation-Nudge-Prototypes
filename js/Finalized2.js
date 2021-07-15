// Defines the three textfield variables
const elEmail = document.querySelector(".emailfield");
const elPassword = document.querySelector(".passfield");
const elConfirm = document.querySelector(".cpassfield");

// Defines the lock variables
var openLock = document.querySelector(".open-lock");
var closedLock = document.querySelector(".closed-lock");
var lockContainer = document.querySelector(".lock-container");
var lockState = true; // True = red open lock  // False = green closed lock

// Defines the toggle password visibility variables
var show = document.querySelector(".show");
var hide = document.querySelector(".hide");

// Defines the nudge info box variables
var nudge = document.querySelector(".nudge-info");
var generate = document.querySelector(".generate");
var exit = document.querySelector(".exit");

// Defines the bottom error message variables
const form = document.getElementById('register');
const emailfield = document.getElementById('emailid');
const passwordfield = document.getElementById('passid');
const cpasswordfield = document.getElementById('cpassid');

// Defines random password
var retVal;

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

// Actions that occur when user clicks on the password field
elPassword.addEventListener('focus', (e) => {
  // Lock appears
  lockContainer.style.display = 'inherit';
  if (lockState == true) {
    // Specifically red open lock appears
    openLock.style.display = 'inherit';
    // Dots are red
    elPassword.style.color = "#FF0011";
    elConfirm.style.color = "#FF0011";
  }
});

// Actions that occur when user types / modifies input in password field
elPassword.addEventListener('input', (e) => {
  // If user deletes green input, it will turn to red
  if (lockState == false) {
    // Recognizing that this is now error mode (from green to red cuz user deleted green input)
    lockState = true;
  }
  // Validates input in password field in "real-time"
  checkInputs();
});

// Validates input in confirm password field in "real-time"
elConfirm.addEventListener('input', (e) => {
  checkCPass();
});

// Nudge info box is displayed when user clicks the lock
openLock.onclick = function() {
  nudge.style.display = "inherit";
}

// Clicking the generate button populates password field & makes everything green
generate.onclick = function() {
  // By clicking generate button, lock is recognized in successful mode
  lockState = false;
  var rand = document.getElementById('passid');
  var rand2 = document.getElementById('cpassid');
  // generate actual random pass here
  var length = 12;
  retVal = "";
  var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*().,?"
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
  rand.value = retVal;
  rand2.value = retVal;
  nudge.style.display = "none";
  checkInputs();
}

// Clicking the no thanks buttom exits nudge
exit.onclick = function() {
  nudge.style.display = "none";
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

  // Scenario that user uses random password
  if (isEmail(emailValue) && passValue == retVal && passValue == passValue2) {
    swal({title: "ACCOUNT CREATED", text: "Password successfully saved in your vault!", icon:"success",closeOnClickOutside: false, closeOnEsc: false}).then(function(){location.reload();});
  }

  // Scenario that user doesn't use random password
  if (isEmail(emailValue) && passValue != "" && passValue != retVal &&
  passValue == passValue2) {
    swal({title: "ACCOUNT CREATED", icon:"success",closeOnClickOutside: false, closeOnEsc: false}).then(function(){location.reload();});
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

checkInputs();

}

// Checks inputs of only the two password fields
function checkInputs() {
  checkPass();
  checkCPass();
}

// checks input of password field
function checkPass() {
  const passValue = passwordfield.value.trim();
  if (passValue == "") {
    setErrorFor(passwordfield, "Password cannot be blank");
    elPassword.style.color = '#FF0011';
  }
  else if (passValue != retVal) {
    lockState = true;
    setErrorFor(passwordfield, "We recommend using a random password");
    elPassword.style.color = '#FF0011';
    openLock.style.display = 'block';
    closedLock.style.display = 'none';
  }
  else {
    lockState = false;
    setSuccessFor(passwordfield, "");
    setSuccessFor(cpasswordfield, "");
    elPassword.style.color = '#00C234';
    elConfirm.style.color = "#00C234";
    openLock.style.display = 'none';
    closedLock.style.display = 'block';
  }
}

  // Checks the input of confirm password field
function checkCPass() {
  const passValue = passwordfield.value.trim();
  const passValue2 = cpasswordfield.value.trim();
  if (passValue2 == "") {
    setErrorFor(cpasswordfield, "Please retype your password");
    elConfirm.style.color = "#FF0011";
  }
  else if (passValue !== passValue2) {
    setErrorFor(cpasswordfield, "Passwords do not match");
    elConfirm.style.color = "#FF0011";
  }
  else {
    if (lockState == false) {
      setSuccessFor(cpasswordfield, "")
      elConfirm.style.color = "#00C234";
    }
    if (lockState == true) {
      setErrorFor(cpasswordfield, "");
      elConfirm.style.color = "#FF0011";
    }
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
