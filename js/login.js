// Defines the toggle password visibility variables
var show = document.querySelector(".show");
var hide = document.querySelector(".hide");
const elPassword = document.querySelector(".pass");

// Toggles password visibility (hides password for both password fields)
hide.onclick = function() {
  elPassword.setAttribute("type", "password");
  hide.style.display = "none";
  show.style.display = "block";
}

// Toggles password visibility (shows password for both password fields)
show.onclick = function() {
  elPassword.setAttribute("type", "text");
  show.style.display = "none";
  hide.style.display = "block";
}
