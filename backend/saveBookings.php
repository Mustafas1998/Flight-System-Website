<?php
include('connection.php');

$booking_id=$_POST["booking_id"];
$seat_number=$_POST["seat_number"];
$valid=$_POST["valid"];
$user_id= $_POST["user_id"]; 
$flight_id=$_POST["flight_id"];


$query = $mysqli->prepare("INSERT into bookings (seat_number,valid,user_id,flight_id) VALUES (?,?,?,?)");
$query->bind_param('iiii',$seat_number,$valid, $user_id, $flight_id); 
$query->execute();

if ($query) {
    $response['status'] = 'success';
    $response['message'] = 'booked successfully';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to book';
}

echo json_encode($response);