<?php
include("connection.php");

$destination = $_POST['destination'];
$country = $_POST['country'];
$price = $_POST['price'];
$departure_date = $_POST['departure_date'];
$arrival_date = $_POST['arrival_date'];
$flight_status = "Ready";
$airline_id = $_POST['airline_id'];
$departure_airport_id = $_POST['departure_airport_id'];
$arrival_airport_id = $_POST['arrival_airport_id'];
$airplane_id = $_POST['airplane_id'];

// echo json_encode(['airplane_id' => $airplane_id]);

$sql = 'INSERT INTO `flights` (`flight_id`, `destination`, `country`, `price`, `departure_date`, `arrival_date`, `flight_status`, `airline_id`, `departure_airport_id`, `arrival_airport_id`, `airplane_id`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
$results = $mysqli->prepare($sql);

$results->bind_param("ssisssiiii",$destination, $country, $price, $departure_date, $arrival_date, $flight_status, $airline_id, $departure_airport_id, $arrival_airport_id, $airplane_id);

if ($results->execute()) {
	$response['status']='success';
	$response['message']='Flight Added successfully';

} else {
	$response['status']='failed';
  $response['message']='failed to create flight';
}

echo json_encode($response);