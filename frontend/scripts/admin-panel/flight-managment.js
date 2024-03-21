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

const flights_table = document.getElementById('flights-table')
const empty_field = document.getElementById('empty-field')

const loadDashboard = async () => {
  const dashboard = await getDashboardNumbers()
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
  generateOptions(airline_input, flight_inputs.airlines)
  generateOptions(airplane_input, flight_inputs.airplanes)
  generateOptions(dep_airport_input, flight_inputs.airports)
  generateOptions(arr_airport_input, flight_inputs.airports)
}

const validateAddInputs = () => {
  const inputs = [
    destination_input,
    country_input,
    price_input,
    airline_input,
    airplane_input,
    dep_airport_input,
    arr_airport_input,
    dep_date_input,
    dep_time_input,
    arr_date_input,
    arr_time_input
  ];

  const empty_inputs = inputs.filter(input => input.value === "")

  if (empty_inputs.length > 0) {
    empty_field.classList.remove("invisible")
  } else {
    const flight = {
      destination: destination_input.value,
      country: country_input.value,
      price: price_input.value,
      departure_airport_id: dep_airport_input.value,
      departure_date: dep_date_input.value + " " + dep_time_input.value,
      arrival_airport_id: arr_airport_input.value,
      arrival_date: arr_date_input.value + " " + arr_time_input.value,
      airline_id: airline_input.value,
      airplane_id: airplane_input.value
    };
    saveFlight(flight)
  }
}

const clearInputFields = (inputs) => {
  inputs.forEach(input => {
    input.value = ""
  });
};

const generateFlightRow = (table, flight) => {
  table.innerHTML +=
    `<tr>
      <td>${flight.flight_id}</td>
      <td>${flight.destination}</td>
      <td>${flight.country}</td>
      <td>${flight.airline_name}</td>
      <td>${flight.airplane_model}</td>
      <td>${flight.departure_airport_name}</td>
      <td>${flight.departure_date}</td>
      <td>${flight.arrival_airport_name}</td>
      <td>${flight.arrival_date}</td>
      <td>${flight.status}</td>
      <td>${flight.price}</td>
      <td><button class="flight-edit">Edit</button></td>
      <td><button class="flight-cancel">Cancel</button></td>
    </tr >`
}

const loadFlights = async () => {
  flights_table.innerHTML = ""
  const flights_list = await getFlightsAdmin()
  flights_list.flights.forEach((flight) => {
    generateFlightRow(flights_table, flight)
  })
}

add_flight.addEventListener("click", () => {
  validateAddInputs()
})

loadFlightInputs()
loadDashboard()
loadFlights()
