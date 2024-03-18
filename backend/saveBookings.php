<?php
include('connection.php');


$user_id= $_POST["user_id"]; 
$flight_id=$_POST["flight_id"];

$query = $mysqli->prepare("INSERT into bookings (user_id,flight_id) VALUES (?,?)");
$query->bind_param('ii', $user_id, $flight_id); 
$query->execute();

if ($query) {
    $response['status'] = 'success';
    $response['message'] = 'booked successfully';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to book';
}

echo json_encode($response);