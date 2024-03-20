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
  try {

    const result = await fetch("http://127.0.0.1/Flight-System-Website/backend/save-flight.php", {
      method: 'POST',
      body: JSON.stringify(flight),

    });
    const response = await result.json()
    return response
  } catch (error) {
    console.error(error)
  }
}

