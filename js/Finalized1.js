// Defines the three textfield variables
const elEmail = document.querySelector(".emailfield");
const elPassword = document.querySelector(".passfield");
const elConfirm = document.querySelector(".cpassfield");

// Defines the lock variables
var openLock = document.querySelector(".open-lock");
var closedLock = document.querySelector(".closed-lock");
var lockContainer = document.querySelector(".lock-container");
// true = red & false = green
var lockState = true;

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

// Toggles password visibility (hides password)
hide.onclick = function() {
  elPassword.setAttribute("type", "password");
  elConfirm.setAttribute("type", "password");
  hide.style.display = "none";
  show.style.display = "block";
}

// Toggles password visibility (shows password)
show.onclick = function() {
  elPassword.setAttribute("type", "text");
  elConfirm.setAttribute("type", "text");
  show.style.display = "none";
  hide.style.display = "block";
}

// Message prompt, bottom error message, & lock appears (along with red border and red dots) when user clicks on the password field
elPassword.addEventListener('focus', (e) => {
  lockContainer.style.display = 'inherit';
  if (lockState == true) {
    openLock.style.display = 'inherit';
    elPassword.style.color = "#FF0011";
    elConfirm.style.color = "#FF0011";
    setErrorFor(passwordfield, "We recommend using a random password");
    setErrorFor(cpasswordfield, "");
    message.style.display = 'block';
  }
  // If lock is green, message prompt will not appear
  if (lockState == false) {
    message.style.display = 'none';
  }
});

// When user types in password field, bottom error message appears (border colour)
elPassword.addEventListener('input', (e) => {
  setErrorFor(passwordfield, "We recommend using a random password");
  setErrorFor(cpasswordfield, "");
  // If user deletes green input, it will turn to red
  if (lockState == false) {
    // Recognizing that this is now error mode (from green to red cuz user deleted green input)
    lockState = true;
    closedLock.style.display = 'none';
    openLock.style.display = 'inherit';
    elPassword.style.color = "#FF0011";
    elConfirm.style.color = "#FF0011";
    message.style.display = 'block';
    // Message prompt will stay when password field clicked + lock is red
    elPassword.addEventListener('focus', (e) => {
      if (lockState == true) {
        message.style.display = 'block';
      }
    });
  }
  // if (lockState == true) {
  //   // Message prompt disappears when user types in password field
  //   setTimeout(function() {message.style.display = 'none';}, 1000);
  // }
});

// Clicking the generate button populates password field & makes everything green
document.getElementById("randombutton").addEventListener('mousedown', function () {
  setSuccessFor(passwordfield);
  setSuccessFor(cpasswordfield);
  elPassword.style.color = '#00C234';
  elConfirm.style.color = '#00C234';
  openLock.style.display = 'none';
  closedLock.style.display = 'inherit';
  var rand = document.getElementById('passid');
  var rand2 = document.getElementById('cpassid');
  rand.value = "(WP=(Ld8f<{h=x#r";
  rand2.value = "(WP=(Ld8f<{h=x#r";
  message.style.display = 'none';
  // By clicking generate button, lock is recognized in successful mode
  lockState = false;
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
  if (emailValue.indexOf("@") != -1 && passValue == "(WP=(Ld8f<{h=x#r" && passValue == passValue2) {
    swal({title: "ACCOUNT CREATED", text: "Password successfully saved in your vault!", icon:"success",closeOnClickOutside: false, closeOnEsc: false,}).then(function(){location.reload();});
  }

  // Scenario that user doesn't use random password
  if (emailValue.indexOf("@") != -1 && passValue != "(WP=(Ld8f<{h=x#r" && passValue == passValue2) {
    swal({title: "ACCOUNT CREATED", icon:"success",closeOnClickOutside: false, closeOnEsc: false,}).then(function(){location.reload();});
  }

  // Checks the input of email field
  if (emailValue == "") {
    setErrorFor(emailfield, "Email cannot be blank");
  }
  else if (emailValue.indexOf("@") == -1) {
    setErrorFor(emailfield, "Invalid email");
  }
  else {
    setSuccessFor(emailfield);
  }

  // Checks the input of password field
  if (passValue == "") {
    setErrorFor(passwordfield, "Password cannot be blank");
  }
  else if (passValue == "(WP=(Ld8f<{h=x#r") {
    lockState = false;
    setSuccessFor(passwordfield);
    elPassword.style.color = '#00C234';
    setSuccessFor(cpasswordfield, "")
    elConfirm.style.color = "#00C234";
    openLock.style.display = 'none';
    closedLock.style.display = 'block';
    elPassword.addEventListener('focus', (e) => {
      message.style.display = none;
    });
  }

  // Checks the input of confirm password field
  if (passValue2 == "") {
    setErrorFor(cpasswordfield, "Please retype your password");
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
    }
  }

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
