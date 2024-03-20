const edit_dep_date_input = document.getElementById('edit-dep-date-input')
const edit_dep_time_input = document.getElementById('edit-dep-time-input')
const edit_arr_date_input = document.getElementById('edit-arr-date-input')
const edit_arr_time_input = document.getElementById('edit-arr-time-input')
const confirm_edit = document.getElementById('confirm-edit')
const cancel_edit = document.getElementById('cancel-edit')

const booking_financial_switch = document.getElementById('booking-financial-switch')
const flight_managment_switch = document.getElementById('flight-managment-switch')
const coins_requests_switch = document.getElementById('coins-requests-switch')
const customer_support_switch = document.getElementById('customer-support-switch')

const total_bookings = document.getElementById('total-bookings')
const total_flights = document.getElementById('total-flights')
const total_users = document.getElementById('total-users')

const flight_managment = document.getElementById('flight-managment')
const destination_input = document.getElementById('destination-input')
const country_input = document.getElementById('country-input')
const price_input = document.getElementById('price-input')
const airline_input = document.getElementById('airline-input')
const airplane_input = document.getElementById('airplane-input')
const dep_airport_input = document.getElementById('dep-airport-input')
const dep_date_input = document.getElementById('dep-date-input')
const dep_time_input = document.getElementById('dep-time-input')
const arr_airport_input = document.getElementById('arr-airport-input')
const arr_date_input = document.getElementById('arr-date-input')
const arr_time_input = document.getElementById('arr-time-input')
const flight_status = document.getElementById('flight-status')
const add_flight = document.getElementById('add-flight')

const empty_field = document.getElementById('empty-field')

const loadDashboard = async () => {
  const dashboard = await getDashboardNumbers()
  console.log(dashboard)
  total_bookings.innerText = dashboard.total_bookings
  total_flights.innerText = dashboard.total_flights
  total_users.innerText = dashboard.total_users
}

const generateOptions = (container, options) => {
  options.forEach(option => {
    const element = `<option value=${option.id}>${option.name ? option.name : option.model}</option>`
    container.innerHTML += element
  });
}

const loadFlightInputs = async () => {
  const flight_inputs = await getFlightInputs()
  console.log(flight_inputs)
  generateOptions(airline_input, flight_inputs.airlines)
  generateOptions(airplane_input, flight_inputs.airplanes)
  generateOptions(dep_airport_input, flight_inputs.airports)
  generateOptions(arr_airport_input, flight_inputs.airports)
  console.log(typeof (dep_date_input.value), dep_time_input.value, typeof (price_input.value))
}

loadFlightInputs()
loadDashboard()

const validateAddInputs = () => {
  if (
    destination_input.value === "" ||
    country_input.value === "" ||
    price_input.value === "" ||
    airline_input.value === "" ||
    airplane_input.value === "" ||
    dep_airport_input.value === "" ||
    arr_airport_input.value === "" ||
    dep_date_input.value === "" ||
    dep_time_input.value === "" ||
    arr_date_input.value === "" ||
    arr_time_input.value === ""
  ) {
    empty_field.classList.remove("invisible")
  } else {
    let flight
    loadFlightInputs({
      destination: destination_input.value,
      country: country_input.value,
      price: price_input.value,
      departure_airport_id: dep_airport_input.value,
      departure_date_id: dep_date_input.value + dep_time_input.value,
      arrival_airport: arr_airport_input.value,
      arrival_date: arr_time_input.value + arr_date_input.value,
      airline_id: airline_input.value,
      airplane_id: airplane_input.value
    })
    destination_input.value = ""
    country_input.value = ""
    price_input.value = ""
    airline_input.value = ""
    airplane_input.value = ""
    dep_airport_input.value = ""
    arr_airport_input.value = ""
    dep_date_input.value = ""
    dep_time_input.value = ""
    arr_date_input.value = ""
    arr_time_input.value = ""
  }
}

add_flight.addEventListener("click", () => {
  validateAddInputs()
})
