// Defines global variables
const elApp = document.querySelector("#register");
const elButton = document.querySelector(".registerbtn");
const elRndm = document.querySelector(".rndmbtn");
const elPassword = document.querySelector(".passfield");
const elEmail = document.querySelector(".emailfield");

var show = document.querySelector(".show");
var hide = document.querySelector(".hide");
var helpbtn = document.querySelector(".helpbtn");
var message = document.querySelector(".message");

// Displays Tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

helpbtn.onclick = function() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "&rarr; Need help creating a password?";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "&larr;";
    moreText.style.display = "inline";
  }

}

// Message prompt appears when user clicks on password field
elPassword.addEventListener('focus', (e) => {
  message.style.display = 'block';
});

// Message prompt disappears when user types in password field
elPassword.addEventListener('input', (e) => {
  setTimeout(function() {message.style.display = 'none';}, 1000)
});

// Message prompt disappears when user clicks outside password field
elPassword.addEventListener('blur', (e) => {
  message.style.display = 'none';
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

validatePassword: (ctx) => {setTimeout(() => {if (elPassword.value === "EDxt&DPVu8^&") {send("VALID");}else{send("INVALID");}});},

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
elPassword.addEventListener("input", (e) => send({ type: "CHANGE", value: e.target.value }));
elApp.addEventListener("submit", (e) => {e.preventDefault(); send("SUBMIT");});
elRndm.addEventListener("mousedown", () => send("SUBMIT"));

// Password generator button
document.getElementById("randombutton").addEventListener('mousedown', function () {
  var rand = document.getElementById('passid');
  var rand2 = document.getElementById('cpassid');
  rand.value = "EDxt&DPVu8^&";
  rand2.value = "EDxt&DPVu8^&";
});

// Display bottom error message
const form = document.getElementById('register');
const emailfield = document.getElementById('emailid');
const passwordfield = document.getElementById('passid');
const cpasswordfield = document.getElementById('cpassid');

// When submit button is clicked, it will check for validation
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const emailValue = emailfield.value.trim();
  const passValue = passwordfield.value.trim();
  const passValue2 = cpasswordfield.value.trim();

  if (emailValue.indexOf("@") != -1 && passValue == "EDxt&DPVu8^&"
  && passValue == passValue2) {
      swal({title: "ACCOUNT CREATED", text: "The random generated password has been saved in your vault successfully!", icon:"success",closeOnClickOutside: false, closeOnEsc: false,}).then(function(){location.reload();});
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
  else if (passValue !== "EDxt&DPVu8^&") {
    setErrorsFor(passwordfield, "Similar password already exists in your vault");
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

function setErrorsFor(input, message) {
  const container = input.parentElement;
  const bottom = container.querySelector(".bottomerror");
  const small = bottom.querySelector("small");

  small.innerText = message;
  container.className = "container errors";
}

function setSuccessFor(input) {
	const container = input.parentElement;
	container.className = 'container success';
}
