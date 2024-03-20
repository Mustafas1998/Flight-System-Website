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
      flight_status,
      airline_id,
      departure_airport_id,
      arrival_airport_id,
      airplane_id
    } = flight

    const form_data = new URLSearchParams()
    form_data.append("destination", destination)
    form_data.append("country", country)
    form_data.append("price", price)
    form_data.append("departure_date", departure_date)
    form_data.append("arrival_date", arrival_date)
    form_data.append("flight_status", flight_status)
    form_data.append("airline_id", airline_id)
    form_data.append("departure_airport_id", departure_airport_id)
    form_data.append("arrival_airport_id", arrival_airport_id)
    form_data.append("airplane_id", airplane_id)

    const result = await fetch("http://127.0.0.1/Flight-System-Website/backend/save-flight.php", {
      method: 'POST',
      body: form_data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }

    });
    const response = await result.json()
    return response
  } catch (error) {
    console.error(error)
  }
}

