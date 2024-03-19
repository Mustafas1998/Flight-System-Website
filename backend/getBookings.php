<?php
include('connection.php');

$query=$mysqli->prepare( "SELECT * FROM bookings");

$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if ($num_rows==0){
    $response['status'] ='cannot find bookings';
}else{
    $bookings=[];
    $query->bind_result($booking_id,$seat_number,$valid,$user_id,$flight_id);
    while ($query->fetch()){
        $booking=[
            'booking_id'=> $booking_id,
            'seat_number'=> $seat_number,
            'valid'=> $valid
            
        ];
        $bookings[]=$booking;
    }
    $response['status']='success';
    $response ['bookings']=$bookings;

}

echo json_encode($response);