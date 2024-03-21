<?php
include("connection.php");

$flight_id = isset($_GET['flight_id']) ? $_GET['flight_id'] : false;
$flight_status ="Ready";
$found = false;

if($flight_id){
	$query = $mysqli->prepare("SELECT * FROM flights WHERE flight_id = ? and flight_status = ?");
	$query -> bind_param("is", $flight_id, $flight_status);
	$found = true;

}else{
	$query = $mysqli->prepare("SELECT * FROM flights WHERE flight_status = ?");
	$query -> bind_param("s", $flight_status);
}
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if ($num_rows === 0) {
	$response['status'] = "failed";
	$response['message'] = "no flights found";
} else {
	$flights_list = [];
	$query->bind_result($flight_id, $destination, $country, $price, $airline_name, $model, $dep_airport_name, $dep_date, $arr_airport_name, $arr_date, $status);
	while ($query->fetch()) {
			$flight = [
					"flight_id" => $flight_id,
					"destination" => $destination,
					"country" => $country,
					"airline_name" => $airline_name,
					"airplane_model" => $model,
					"departure_airport_name" => $dep_airport_name,
					"departure_date" => $dep_date,
					"arrival_airport_name" => $arr_airport_name,
					"arrival_date" => $arr_date,
					"status" => $status,
					"price" => $price
			];
			$flights_list[] = $flight;
	}
	$response['status'] = "success";
	if ($found) {
			$response["flight"] = $flight; // Move this line inside the if condition
	} else {
			$response["flights"] = $flights_list;
	}
}

echo json_encode($response);