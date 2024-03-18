<?php
include("connection.php");

$flight_id = $_POST['flight_id'];
$destination = isset($_POST['destination']) ? $_POST['destination'] : null;
$country = isset($_POST['country']) ? $_POST['country'] : null;
$departure_date = isset($_POST['departure_date']) ? $_POST['departure_date'] : null;
$arrival_date = isset($_POST['arrival_date']) ? $_POST['arrival_date'] : null;
$flight_status = isset($_POST['flight_status']) ? $_POST['flight_status'] : null;


$update_query = "UPDATE flights SET ";
$update_params = [];


if ($destination !== null) {
    $update_query .= "destination = ?, ";
    $update_params[] = $destination;
}
if ($country !== null) {
    $update_query .= "country = ?, ";
    $update_params[] = $country;
}


if ($departure_date !== null) {
    $update_query .= "departure_date = ?, ";
    $update_params[] = $departure_date;
}
if ($arrival_date !== null) {
    $update_query .= "arrival_date = ?, ";
    $update_params[] = $arrival_date;
}
if ($flight_status !== null) {
    $update_query .= "flight_status = ?, ";
    $update_params[] = $flight_status;
}


$update_query = rtrim($update_query, ", ");
$update_query .= " WHERE flight_id = ?";

$types = str_repeat("s", count($update_params));
$update_params[] = $flight_id;


print_r($update_params) ;

$update_statement = $mysqli->prepare($update_query);
$update_statement->bind_param($types ."i", ...$update_params);
$update_statement->execute();

if ($update_statement->affected_rows > 0) {
  $response['status'] = "success";
  $response['message'] = "flight  updated";

} else {
  $response['status'] = "error";
  $response['message'] = "Failed to update flight";

}
echo json_encode($response);


