const getFlightsInputs = async () => {
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



