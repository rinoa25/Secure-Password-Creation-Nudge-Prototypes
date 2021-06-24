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

  if(passValue !== "(WP=(Ld8f<{h=x#r" && emailValue.indexOf("@") != -1 && passValue == passValue2 && passValue !== "") {
    popup();
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
  else if (passValue !== "(WP=(Ld8f<{h=x#r") {
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
  text: "Password needs to contain at least 8 upper-case and lower-case characters with numbers and symbols. Would like us to generate a random password for you instead?",
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
