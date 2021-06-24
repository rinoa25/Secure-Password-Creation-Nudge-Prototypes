// Defining variables
const elApp = document.querySelector("#register");
const elButton = document.querySelector(".registerbtn");
const elPassword = document.querySelector(".passfield");
const elEmail = document.querySelector(".emailfield");
const elReset = document.querySelector(".ui-reset");

var show = document.querySelector(".show");
var hide = document.querySelector(".hide");

// Padlock animation
const context = {password: ""};

const actions = {

  assignPassword: XState.assign({password: (_, event) => event.value}),

  // if (ctx.password
  validatePassword: (ctx) => {setTimeout(() => {if (elPassword.value === "(WP=(Ld8f<{h=x#r" && elEmail.value.indexOf("@") != -1) {send("VALID");}else{send("INVALID");}});},

  clear: XState.assign(
    {password: () => {elPassword.value = ""; return "";},
    email: () => {elEmail.value = ""; return "";}})
};

const passwordMachine = XState.Machine({initial: "idle", context, states: {idle:

  // cond: "passwordEntered"
  {entry: "clear", on: {SUBMIT: {target: "validating", cond: elPassword.value },
  CHANGE: {target: "idle", actions: "assignPassword", internal: true}}, initial: "normal", states: {normal: {}, error: {after: {2000: "normal"}}}},

  validating: {onEntry: "validatePassword", on: {VALID: "success", INVALID: "idle.error"}},

  success: {}}, on: {RESET: ".idle"}}, {actions, guards: {passwordEntered: (ctx) => {
    return ctx.password && ctx.password.length;
  }}}
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

const { send } = interpreter;

elButton.addEventListener("click", () => send("SUBMIT"));
elPassword.addEventListener("input", (e) => send({ type: "CHANGE", value: e.target.value }));
elApp.addEventListener("submit", (e) => {e.preventDefault(); send("SUBMIT");});
//elReset.addEventListener("click", () => send("RESET"));

// Display top error message
function validation() {
  var emailid = document.getElementById("emailid").value;
  var passid = document.getElementById("passid").value;
  var toperror = document.getElementById("toperror");
  var text;

  toperror.style.padding = "10px";
  toperror.style.paddingLeft = "40px";
  toperror.style.borderWidth = "1px";

  if(emailid == "" || passid == "") {
    text = "Please complete the required fields before submitting";
    toperror.innerHTML = "<i class='icon fa fa-warning fa-lg' style='top:13px'></i>" + text;
    return false;
  }

  if (passid !== "(WP=(Ld8f<{h=x#r" && emailid.indexOf("@") != -1) {
    text = "The password submitted is similar to another password stored in your vault. <br>Using it will make both accounts vulnerable to attacks.";
    toperror.innerHTML = "<i class='icon fa fa-warning fa-lg'></i>" + text;
    return false;
  }

  if(emailid.indexOf("@") == -1 || passid !== "(WP=(Ld8f<{h=x#r") {
    text = "Some fields require your attention. Please see below for more info.";
    toperror.innerHTML = "<i class='icon fa fa-warning fa-lg' style='top:13px'></i>" + text;
    return false;
  }

  if (passid == "(WP=(Ld8f<{h=x#r" && emailid.indexOf("@") != -1) {
    toperror.style.padding = "0px";
    toperror.style.borderWidth = "0px";
    text = " ";
    toperror.innerHTML = text;
  }

  return true;

}

// Toggle password visibility
hide.onclick = function() {
  elPassword.setAttribute("type", "password");
  hide.style.display = "none";
  show.style.display = "block";
}

show.onclick = function() {
  elPassword.setAttribute("type", "text");
  show.style.display = "none";
  hide.style.display = "block";
}

// Random password button
document.getElementById("randombutton").addEventListener('click', function () {
    var rand = document.getElementById('passid');
    rand.value = "(WP=(Ld8f<{h=x#r";
});

// Display bottom error message
const form = document.getElementById('register');
const emailfield = document.getElementById('emailid');
const passwordfield = document.getElementById('passid');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const emailValue = emailfield.value.trim();
  const passValue = passwordfield.value.trim();

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
    setErrorFor(passwordfield, "Use a random generated password. We will remember it for you!");
  }
  else {
    setSuccessFor(passwordfield);
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
