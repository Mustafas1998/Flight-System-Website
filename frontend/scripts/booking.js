const allSeats=document.querySelectorAll(".seat");
const bookButton= document.getElementById("bookBtn");






const getAvailableSeats = (flight_id) => {
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
getAvailableSeats()
    const displaySeats = (data) => {
        allSeats.forEach(seat => {
            if (data.seat_number === seat.value) {
                seat.removeEventListener("click",()=>{
                    seat.classList.remove("bg-primary")
                }
                )
            } else {
               bookSeat(); 
                
            }
        });
    }

const bookSeat=()=>{
    allSeats.forEach(seat=>{
        seat.addEventListener("click",()=>{
            seat.classList.add("bg-primary")
        }
        )
    })
}


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

