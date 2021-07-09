// Defines the form
const elApp = document.querySelector("#register");

// Defines the buttons
const elButton = document.querySelector(".registerbtn");
const elRndm = document.querySelector(".rndmbtn");

// Defines the three textfield variables
const elEmail = document.querySelector(".emailfield");
const elPassword = document.querySelector(".passfield");
const elConfirm = document.querySelector(".cpassfield");
const elLock = document.querySelector(".ui-icon");

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

// Message prompt & Shaking red lock appears when user clicks on password field
elPassword.addEventListener('focus', (e) => {
  message.style.display = 'block';
  elLock.style.display = "block";

});

// Message prompt disappears when user types in password field
elPassword.addEventListener('input', (e) => {
  setTimeout(function() {message.style.display = 'none';}, 1000)
});

// Toggles password visibility (hides password)
hide.onclick = function() {
  elPassword.setAttribute("type", "password");
  hide.style.display = "none";
  show.style.display = "block";
}

// Toggles password visibility (shows password)
show.onclick = function() {
  elPassword.setAttribute("type", "text");
  show.style.display = "none";
  hide.style.display = "block";
}

// Lock animation + password validation
const actions = {

validatePassword: (ctx) => {setTimeout(() => {if (elPassword.value === "(WP=(Ld8f<{h=x#r") {send("VALID");}else{send("INVALID");}});},

};

const passwordMachine = XState.Machine({initial: "idle", states: {idle:

  {on: {SUBMIT: {target: "validating", cond: elPassword.value}, CHANGE: {internal: true}},
   states: {error: {}}},

  validating: {onEntry: "validatePassword", on: {VALID: "success", INVALID: "idle.error"}},

  // If you don't want lock to react right away from success to error use below:
  // success: {on: {SUBMIT: {target: "validating", cond: elPassword.value}}}}},
  success: {onEntry: "validatePassword", on: {VALID: "success", INVALID: "idle.error"}}}},
  {actions}

);

let state = passwordMachine.initialState;

function activate(state) {
  elApp.dataset.state = state.toStrings().join(" ");

  document.querySelectorAll("[data-active]").forEach((el) => {
    el.removeAttribute("data-active");
  });

  document.querySelectorAll(`[data-show~="${state.value}"]`).forEach((el) => {
    el.setAttribute("data-active", true);
  });

}

const interpreter = XState.interpret(passwordMachine)
.onTransition(activate)
.start();

activate(state);

const {send} = interpreter;

elButton.addEventListener("click", () => send("SUBMIT"));
// Change back if you don't want lock to be shaking red when clicked upon
// elPassword.addEventListener("click", (e) => send({ type: "CHANGE", value: e.target.value }));
elPassword.addEventListener("click", (e) => send("SUBMIT"));
elApp.addEventListener("submit", (e) => {e.preventDefault(); send("SUBMIT");});
elRndm.addEventListener("mousedown", () => send("SUBMIT"));

// Password generator button
document.getElementById("randombutton").addEventListener('mousedown', function () {
  var rand = document.getElementById('passid');
  var rand2 = document.getElementById('cpassid');
  rand.value = "(WP=(Ld8f<{h=x#r";
  rand2.value = "(WP=(Ld8f<{h=x#r";
  message.style.display = 'none';
});

// When submit button is clicked, it will check for validation
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
});

var count = 0;

function checkInputs() {
  const emailValue = emailfield.value.trim();
  const passValue = passwordfield.value.trim();
  const passValue2 = cpasswordfield.value.trim();

  if (emailValue.indexOf("@") != -1 && passValue == "(WP=(Ld8f<{h=x#r"
  && passValue == passValue2  ) {
      swal({title: "ACCOUNT CREATED", text: "Password successfully saved in your vault!", icon:"success",closeOnClickOutside: false, closeOnEsc: false,});
  }

  if (count > 0 && emailValue.indexOf("@") != -1 && passValue == passValue2 && passValue != "(WP=(Ld8f<{h=x#r") {
      swal({title: "ACCOUNT CREATED", icon:"success",closeOnClickOutside: false, closeOnEsc: false,});
  }

  if (emailValue == "") {
    setErrorFor(emailfield, "Email cannot be blank");
  }
  else if (emailValue.indexOf("@") == -1) {
    setErrorFor(emailfield, "Invalid email");
  }
  else {
    setSuccessFor(emailfield);
  }

  if (passValue == "") {
    setErrorFor(passwordfield, "Password cannot be blank");
  }
  else if (passValue !== "(WP=(Ld8f<{h=x#r") {
    count += 1;
    setErrorFor(passwordfield, "We recommend using a random password");
  }
  else {
    setSuccessFor(passwordfield);
  }

  if (passValue2 == "") {
    setErrorFor(cpasswordfield, "Please retype your password");
  }
  else if (passValue !== passValue2) {
    setErrorFor(cpasswordfield, "Passwords do not match");
  }
  else {
    setSuccessFor(cpasswordfield);
  }

}

function setErrorFor(input, message) {
  const container = input.parentElement;
  const bottom = container.querySelector(".bottomerror");
  const small = bottom.querySelector("small");

  small.innerText = message;
  container.className = "container error";
}

function setSuccessFor(input) {
	const container = input.parentElement;
	container.className = 'container success';
}
