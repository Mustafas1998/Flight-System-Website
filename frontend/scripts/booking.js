const seats=document.querySelectorAll(".seat");
const bookButton= document.getElementById("bookBtn");

//i should get flights and destructure to get flight-id


//get and display bookings according to each flight
const fetchData =async ()=> {
    try {
        const response = await axios.get("http://localhost/Flight-System-Website/backend/getBookings.php");
        const data = response.data;
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const displaySeats = (data) => {
    const seatNumbers = [];
    data.forEach(booking=> {
    seatNumbers.push(booking.seat_number);
    console.log(seatNumbers)
});}




seats.forEach(seat => {
    seat.addEventListener('click', (event) => {
        event.target.classList.add('bg-primary');
        console.log("clicked")
    });
});





// const displaySeats = (data) => {
//     allSeats.forEach(seat => {
//         if (data.seat_number === seat.value) {
//             seat.removeEventListener("click",()=>{
//                 seat.classList.remove("bg-primary")
//             }
//                 )
//         } else {
//             bookSeat(); 
//             }
//         });
//     }

// const bookSeat = (allSeats) => {
//         allSeats.forEach(seat => {
//             const addBgColor = () => {
//                 seat.classList.add("bg-primary");
//             };
//             seat.addEventListener("click", addBgColor);
//         });
//     }

//save booking
bookButton.addEventListener("click",()=>{
    try{
        const data = new FormData();
    data.append("booking_id", booking_id)
    data.append("seat_number", seat_number)
    data.append("valid", valid)
    data.append("user_id", user_id)
    data.append("flight_id",flight_id)
    fetch("http://localhost/Flight-System-Website/backend/saveBookings.php", {
      method: "POST",
      body: data
    })

    }
    catch(error){
        console.log(error)

    }
})
