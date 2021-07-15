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

// Defines the pop up message under password field variable
var message = document.querySelector(".message");

// Defines the bottom error message variables
const form = document.getElementById('register');
const emailfield = document.getElementById('emailid');
const passwordfield = document.getElementById('passid');
const cpasswordfield = document.getElementById('cpassid');

// Defines the buttons
const elButton = document.querySelector(".registerbtn");
const elRndm = document.querySelector(".rndmbtn");

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
  lockContainer.style.display = 'block';
  // Bottom error message (includes red border and red dots)
  checkInputs();
  // Defines that true = red open lock
  if (lockState == true) {
    // Specifically red open lock appears
    openLock.style.display = 'block';
    // Message appears
    message.style.display = 'block';
    // generate actual random pass here
    var length = 12;
    retVal = "";
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*().,?"
      for (var i = 0, n = charset.length; i < length; ++i) {
          retVal += charset.charAt(Math.floor(Math.random() * n));
      }
    setPhrase(retVal);
  }
});

// Actions that occur when user types / modifies input in password field
elPassword.addEventListener('input', (e) => {
  // If user deletes green input, it will turn to red
  if (lockState == false) {
    // Recognizing that this is now error mode (from green to red cuz user deleted green input)
    lockState = true;
    // Message prompt will be displayed right as the user deletes green input and it turns red
    message.style.display = 'block';
    // Message prompt will stay when password field clicked + lock is red
    elPassword.addEventListener('focus', (e) => {
      if (lockState == true) {
        message.style.display = 'block';
      }
      else {
        message.style.display = 'none';
      }
    });
  }
  else {
    // Message prompt disappears when user types in / modifies password field + lock is red
    setTimeout(function() {message.style.display = 'none';}, 1000);
  }
  // Validates input in password field in "real-time"
  checkInputs();
});

// Validates input in confirm password field in "real-time"
elConfirm.addEventListener('input', (e) => {
  checkCPass();
});

// Clicking the generate button populates password field & makes everything green
document.getElementById("randombutton").addEventListener('mousedown', function () {
  // By clicking generate button, lock is recognized in successful mode
  lockState = false;
  passwordfield.value = retVal;
  cpasswordfield.value = retVal;
  message.style.display = 'none';
  checkInputs();
});

// When submit button is clicked, it will check for validation & remove message prompt from display
form.addEventListener('submit', (e) => {
  e.preventDefault();
  message.style.display = 'none';
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
    // If lock is green, message prompt will not appear
    message.style.display = 'none';
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

function setPhrase(message) {
  const actualpass = document.querySelector(".actualpass")
  const para = actualpass.querySelector("p")

  para.innerText = message;
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
