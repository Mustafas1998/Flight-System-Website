<?php
include("connection.php");

$bookings_query = $mysqli -> prepare("select count(*) from bookings");
$flights_query = $mysqli -> prepare("select count(*) from flights");
$users_query = $mysqli -> prepare("select count(*) from users");

$response = [];

function storeValueFromQuery ($key, $query, &$response) {
  $query -> execute();
  $query -> store_result();
  $query -> bind_result($result);
  $query -> fetch();
  $response[$key] = $result;
}

storeValueFromQuery ("total_bookings", $bookings_query, $response);
storeValueFromQuery ("total_flights", $flights_query, $response);
storeValueFromQuery ("total_users", $users_query, $response);

echo json_encode($response);