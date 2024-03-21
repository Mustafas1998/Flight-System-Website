<?php
include("connection.php");

$flight_id = isset($_GET['flight_id']) ? $_GET['flight_id'] : false;
$found = false;

if($flight_id){
	$query = $mysqli->prepare("SELECT * FROM flights WHERE flight_id = ?");
	$query -> bind_param("i", $flight_id);
	$found = true;

}else{
	$query = $mysqli->prepare("SELECT * FROM flights");
}
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if ($num_rows === 0) {
  $response["status"] = "empty";
	$response['messgae'] = "no flights found";
}else{
	$flights_list = [];
	$query->bind_result($flight_id,$destintion,$country,$price,$departure_date,$arrival_date,$flight_status,$airline_id,$departure_airport_id,$arrival_airport_id,$airplane_id);
	while ($query->fetch()){
			$flight = [
					"flight_id"=> $flight_id,
					"destination"=> $destintion,
					"country"=> $country,
					"price"=> $price,
					"departure_date"=> $departure_date,
					"arrival_date" => $arrival_date,
					"flight_status"=> $flight_status,
					"airline_id"=> $airline_id,
					"departure_airport_id"=> $departure_airport_id,
					"arrival_airport_id"=> $arrival_airport_id,
					"airplane_id"=> $airplane_id,  
			];
			$flight_list[] = $flight;	
	}
	$response["status"] = "success";

	if ($found){
		$response["flight"] = $flight;
	}else{
		$response["flights"] = $flights_list;

	}
}

echo json_encode($response);