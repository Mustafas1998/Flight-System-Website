<?php
include('connection.php');


$booking_id = $_POST["booking_id"];
$valid = $_POST["valid"];


$query = $mysqli->prepare("UPDATE bookings SET valid =? WHERE booking_id = ? ");
$query->bind_param('ii',$valid,$booking_id); 
$query->execute();

if ($query->affected_rows > 0) {
    $response['status'] = 'success';
    $response['message'] = 'bookings Updated';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to update booking';
}

echo json_encode($response);