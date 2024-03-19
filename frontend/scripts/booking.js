
const getBookings = () => {
    fetch("http://localhost/Flight-System-Website/backend/getBookings.php")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        displaySeats(data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
const displaySeats = (data) => {
    con

}