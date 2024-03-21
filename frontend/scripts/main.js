const login_popup = document.getElementById("login-popup")
const signup_popup = document.getElementById("signup-popup")
const login_button = document.getElementById("login-button")
const signup_button = document.getElementById("signup-button")
const login_switch = document.getElementById("login-switch")
const signup_switch = document.getElementById("signup-switch")

const profile_img = document.getElementById("profile-img")
const login_signup_wrapper = document.getElementById("login-signup-wrapper")

const login_identifier_input = document.getElementById("login-identifier-input")
const login_pass_input = document.getElementById("login-pass-input")
const popup_login_button = document.getElementById("popup-login-button")
const login_error = document.getElementById("login-error")

const signup_username_input = document.getElementById("signup-username-input")
const signup_email_input = document.getElementById("signup-email-input")
const signup_pass_input = document.getElementById("signup-pass-input")
const signup_conf_pass_input = document.getElementById("signup-conf-pass-input")
const popup_signup_button = document.getElementById("popup-signup-button")
const signup_error = document.getElementById("signup-error")

const success = document.getElementById("success")
const success_message = document.getElementById("success-message")

const flight_cards_wrapper = document.getElementById("flight-cards-wrapper")


const saveUser = (id) => {
  localStorage.setItem("user_id", id)
}

const saveFlightId = (id) => {
  localStorage.setItem("flight_id", id)
}

const validateSignup = async (username, email, password, conf_pass) => {
  signup_error.classList.add("invisible")

  if (username === "" || email === "" || password === "" || conf_pass === "") {
    signup_error.innerText = "Please Fill All fields"

    setTimeout(() => {
      signup_error.classList.remove("invisible")
    }, 200)

  } else {
    if (password !== conf_pass) {
      signup_error.innerText = "Passwords Does Not Match"
      signup_error.classList.remove("invisible")

    } else {
      const user = await validateUserSignup(username, email, password)

      if (user.status === "success") {
        success_message.innerText = "Signup"
        setTimeout(() => {
          success.classList.toggle("hidden")
          login_popup.classList.toggle("hidden")
        }, 1200)

        signup_popup.classList.toggle("hidden")
        success.classList.toggle("hidden")

      } else {
        setTimeout(() => {
          signup_error.classList.remove("invisible")
        }, 200)
        signup_error.innerText = "User Aleady Exists"
      }
    }
  }
}

const validateLogin = async (identifier, password) => {
  login_error.classList.add("invisible")

  if (identifier === "" || password === "") {
    login_error.innerText = "Please Fill All fields"
    setTimeout(() => {
      login_error.classList.remove("invisible")
    }, 200)

  } else {
    const user = await validateUserLogin(identifier, password)

    if (user.status === "success") {
      if (user.is_admin == 1) {
        window.location.href = "http://127.0.0.1:5500/frontend/pages/admin-pannel.html"

      } else {
        success_message.innerText = "Login"
        setTimeout(() => {
          success.classList.toggle("hidden")
        }, 1200);
        success.classList.toggle("hidden")
        login_popup.classList.toggle("hidden")
        login_signup_wrapper.classList.toggle("hidden")
        profile_img.classList.toggle("hidden")
        saveUser()
      }

    } else {
      setTimeout(() => {
        login_error.classList.remove("invisible")
      }, 200)
      login_error.innerText = "Incorrect Username/Password"
    }
  }
}


const generateCard = (container, flight_id, destination, country, price) => {
  const flightCard = document.createElement("div");
  flightCard.classList.add("flex", "column", "flight-card", "white");
  flightCard.id = flight_id;

  const ratingWrapper = document.createElement("div");
  ratingWrapper.classList.add("flex", "rating-wrapper");
  const avgRating = document.createElement("p");
  avgRating.classList.add("flex", "avg-rating");
  avgRating.textContent = "4.5";
  const starIcon = document.createElement("i");
  starIcon.classList.add("fa-solid", "fa-star");
  ratingWrapper.appendChild(avgRating);
  ratingWrapper.appendChild(starIcon);

  const cardImg = document.createElement("div");
  cardImg.classList.add("card-img");
  const img = document.createElement("img");
  img.src = "./assets/tokyo.jpg";
  img.alt = "tokyo";
  cardImg.appendChild(img);

  const cardInfoWrapper = document.createElement("div");
  cardInfoWrapper.classList.add("flex", "space-between", "card-info-wrapper");
  const destinationInfo = document.createElement("div");
  destinationInfo.classList.add("flex", "column", "destination-info");
  const destinationP = document.createElement("p");
  destinationP.classList.add("destination");
  destinationP.textContent = destination;
  const countryP = document.createElement("p");
  countryP.classList.add("country");
  countryP.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${country}`;
  const priceP = document.createElement("p");
  priceP.classList.add("price");
  priceP.textContent = price + "c";
  destinationInfo.appendChild(destinationP);
  destinationInfo.appendChild(countryP);
  destinationInfo.appendChild(priceP);

  const bookButton = document.createElement("button");
  bookButton.classList.add("book-btn", "bg-primary");
  bookButton.textContent = "Book";
  bookButton.addEventListener("click", () => {
    saveFlightId(flight_id)
    window.location.href = "http://127.0.0.1:5500/frontend/pages/bookings.html"
  })

  cardInfoWrapper.appendChild(destinationInfo);
  cardInfoWrapper.appendChild(bookButton);

  flightCard.appendChild(ratingWrapper);
  flightCard.appendChild(cardImg);
  flightCard.appendChild(cardInfoWrapper);

  container.appendChild(flightCard);
}

const createFlightCards = async () => {
  flight_cards_wrapper.innerHTML = ""
  const flights = await getFlights("")

  flights.flights.forEach(flight => {
    const { flight_id, destination, country, price } = flight
    generateCard(flight_cards_wrapper, flight_id, destination, country, price)
  });
}


popup_signup_button.addEventListener("click", () => {
  validateSignup(
    signup_username_input.value,
    signup_email_input.value,
    signup_pass_input.value,
    signup_conf_pass_input.value)
})
popup_login_button.addEventListener("click", () => {
  validateLogin(login_identifier_input.value, login_pass_input.value)
})

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

createFlightCards()