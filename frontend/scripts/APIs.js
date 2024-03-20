const getFlightInputs = async () => {
  try {
    const result = await fetch("http://127.0.0.1/Flight-System-Website/backend/get-flight-inputs.php", {
      method: 'GET'
    });
    const response = await result.json()
    return response
  } catch (error) {
    console.error(error)
  }
}

const getDashboardNumbers = async () => {
  try {
    const result = await fetch("http://127.0.0.1/Flight-System-Website/backend/get-dashboard-numbers.php", {
      method: 'GET'
    });
    const response = await result.json()
    return response
  } catch (error) {
    console.error(error)
  }
}

const saveFlight = async (flight) => {
  console.log(flight)
  try {
    const {
      destination,
      country,
      price,
      departure_date,
      arrival_date,
      airline_id,
      departure_airport_id,
      arrival_airport_id,
      airplane_id
    } = flight

    const form_data = new FormData()
    form_data.append("destination", destination)
    form_data.append("country", country)
    form_data.append("price", price)
    form_data.append("departure_date", departure_date)
    form_data.append("arrival_date", arrival_date)
    form_data.append("airline_id", airline_id)
    form_data.append("departure_airport_id", departure_airport_id)
    form_data.append("arrival_airport_id", arrival_airport_id)
    form_data.append("airplane_id", parseFloat(airplane_id))

    console.log(form_data)

    const result = await fetch("http://127.0.0.1/Flight-System-Website/backend/save-flight.php", {
      method: 'POST',
      body: form_data,

    });
    const response = await result.json()
    return response
  } catch (error) {
    console.error(error)
  }
}

const getFlights = async (flight_id) => {
  try {
    const result = await fetch(`http://127.0.0.1/Flight-System-Website/backend/get-flights.php?flight_id=${flight_id}`, {
      method: 'GET',
    });
    const response = await result.json()
    return response
  } catch (error) {
    console.error(error)
  }
}

const getFlightsAdmin = async (flight_id) => {
  try {
    const result = await fetch(`http://127.0.0.1/Flight-System-Website/backend/get-flights_admin.php`, {
      method: 'GET',
    });
    const response = await result.json()
    return response
  } catch (error) {
    console.error(error)
  }
}

const validateLogin = async (identefier, password) => {
  try {
    const form_data = new FormData()
    form_data.append("identifier", identefier)
    form_data.append("password", password)
    const result = await fetch("http://127.0.0.1/Flight-System-Website/backend/login.php", {
      method: 'POST',
      body: form_data
    });
    const response = await result.json()
    return response
  } catch (error) {
    console.error(error)
  }
}

