const login_popup = document.getElementById("login-popup")
const signup_popup = document.getElementById("signup-popup")
const login_button = document.getElementById("login-button")
const signup_button = document.getElementById("signup-button")
const login_switch = document.getElementById("login-switch")
const signup_switch = document.getElementById("signup-switch")

const login_identifier_input = document.getElementById("login-identifier-input")
const login_pass_input = document.getElementById("login-pass-input")
const popup_login_button = document.getElementById("popup-login-button")

const signup_username_input = document.getElementById("signup-username-input")
const signup_email_input = document.getElementById("signup-email-input")
const signup_pass_input = document.getElementById("signup-pass-input")
const signup_conf_pass_input = document.getElementById("signup-conf-pass-input")
const popup_signup_button = document.getElementById("popup-signup-button")

// const validateLogin = () => {
//   if
// }


login_button.addEventListener("click", () => {
  login_popup.classList.toggle("hidden")

})

signup_button.addEventListener("click", () => {
  signup_popup.classList.toggle("hidden")

})

login_popup.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup")) {
    login_popup.classList.toggle("hidden")
  }
})

signup_popup.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup")) {
    signup_popup.classList.toggle("hidden")
  }
})

login_switch.addEventListener("click", (event) => {
  login_popup.classList.toggle("hidden")
  signup_popup.classList.toggle("hidden")
})

signup_switch.addEventListener("click", (event) => {
  login_popup.classList.toggle("hidden")
  signup_popup.classList.toggle("hidden")
})




