<?php
include("connection.php");

$flight_id =isset($_POST['flight_id']) ? $_POST['flight_id'] : false;

if($flight_id){
	$query = $mysqli->prepare("SELECT * FROM flights");

}else{
	$query = $mysqli->prepare("SELECT * FROM flights WHERE flight_id = ?");
	$query -> bind_param("i", $flight_id);
}
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if ($num_rows === 0) {
    $response["status"] = "empty";
  
}else{
	$array_list = [];
	$query->bind_result($flight_id,$destintion,$country,$price,$departure_date,$arrival_date,$flight_status,$airline_id,$departure_airport_id,$arrival_airport_id,$airplane_id);
	while ($query->fetch()){
			$array = [
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
			$array_list[] = $array;	
	}
	$response["status"] = "success";
	$response["flights"] = $array_list;
}
echo json_encode($response);