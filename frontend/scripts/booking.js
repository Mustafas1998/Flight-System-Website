const seats=document.querySelectorAll(".seat");
const bookButton= document.getElementById("bookBtn");
const container = document.querySelector('.booking-info');
const heading_flight= document.getElementById('heading-flight');



const displayFlightInfo = async (flight_id)=>{
    const flightInfo = await getFlightInfo(flight_id);
    console.log(flightInfo)
     generateFlightInfo(flightInfo);

}

const generateFlightInfo = (flightInfo)=>{
    console.log(flightInfo)
    const {airline_name,airplane_model,arrival_date,departure_date,price,destination}=flightInfo
    container.innerHTML="";
    
    container.innerHTML=
     `<li>${airline_name}</li>
        <li>${airplane_model}</li>
        <li>${departure_date}</li>
        <li>${arrival_date}</li>
        <li>${price}</li>`;
    ;

    heading_flight.innerText= flightInfo.destination
        







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
    console.log(seatNumbers);
    
});}




seats.forEach(seat => {
    seat.addEventListener('click', (event) => {
        event.target.classList.add('bg-primary');
        console.log("clicked")
    });
});






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
})}
