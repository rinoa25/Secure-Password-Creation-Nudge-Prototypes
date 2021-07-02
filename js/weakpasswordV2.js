const form = document.getElementById("register");
const email = document.getElementById("emailid");
const password = document.getElementById("passid");
const password2 = document.getElementById("cpassid");

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const emailValue = email.value.trim();
  const passValue = password.value.trim();
  const passValue2 = password2.value.trim();

  if(isPassword(passValue) != true && emailValue.indexOf("@") != -1 && passValue == passValue2 && passValue !== "") {
    popup();
  }

  if(isPassword(passValue) == true && emailValue.indexOf("@") != -1 && passValue == passValue2 && passValue !== "") {
    popup2();
  }

  if (emailValue == "") {
    setErrorFor(email, "Email cannot be blank");
  }
  else if (emailValue.indexOf("@") == -1) {
    setErrorFor(email, "Invalid email");
  }
  else {
    setSuccessFor(email);
  }

  if (passValue == "") {
    setErrorFor(password, "Password cannot be blank");
  }
  else if (isPassword(passValue) != true) {
    setErrorFor(password, "This password will risk the security of the account");
  }
  else {
    setSuccessFor(password);
  }

  if (passValue2 == "") {
    setErrorFor(password2, "Please retype your password");
  }
  else if (passValue !== passValue2) {
    setErrorFor(password2, "Passwords do not match");
  }
  else {
    setSuccessFor(password2);
  }

}

function isPassword(password) {
  if (password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g) && password.match(/[^a-zA-Z\d]/g) && password.length >= 8) {
    return true;
  }
  else {
    return false;
  }
}

function setErrorFor(input, message) {
  const container = input.parentElement;
  const bottom = container.querySelector(".bottomtext");
  const small = bottom.querySelector("small");

  small.innerText = message;
  container.className = "container error";
}

function setSuccessFor(input) {
	const container = input.parentElement;
	container.className = 'container success';
}

function popup() {
  swal ({
  title: "WEAK PASSWORD IDENTIFIED",
  text: "Password needs to contain at least 8 letters (1 uppercase and 1 lowercase), 1 digit, and 1 special character. Would you like to use a random generated password instead?",
  icon: "warning",
  closeOnClickOutside: false,
  closeOnEsc: false,
  buttons: {
    cancel: "No",
    Yes: true,
  }
})

  .then((value) => {

    switch (value) {

      case "Yes":
        swal({title: "ACCOUNT CREATED", text: "The random generated password has been saved in your vault successfully!", icon:"success",closeOnClickOutside: false, closeOnEsc: false,}).then(function(){location.reload();});
        break;

      case "No":
        break;

    }

  });

}

function popup2() {
  swal ({
  title: "GUARANTEE YOUR ACCOUNT'S SECURITY",
  text: "Would you like to use a random generated password to give your account more protection from hackers?",
  icon: "info",
  closeOnClickOutside: false,
  closeOnEsc: false,
  buttons: {
    cancel: "No",
    Yes: true,
  }
})

  .then((value) => {

    switch (value) {

      case "Yes":
        swal({title: "ACCOUNT CREATED", text: "The random generated password has been saved in your vault successfully!", icon:"success",closeOnClickOutside: false, closeOnEsc: false,}).then(function(){location.reload();});
        break;

      default:
      swal({title: "ACCOUNT CREATED", icon:"success",closeOnClickOutside: false, closeOnEsc: false,}).then(function(){location.reload();});
      break;

    }

  });

}
