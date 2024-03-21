<?php
include('connection.php');

$query = $mysqli -> prepare('
SELECT f.destination, f.country, f.price, al.airline_name, apl.model, apr_dep.airport_name, f.departure_date, apr_arr.airport_name, f.arrival_date, f.flight_status
FROM flights f
JOIN airports apr_dep ON f.departure_airport_id = apr_dep.airport_id 
JOIN airports apr_arr ON f.arrival_airport_id = apr_arr.airport_id
JOIN airlines al ON f.airline_id = al.airline_id
JOIN airplanes apl ON f.airplane_id = apl.airplane_id
');

$query -> execute();
$query -> store_result();
$num_rows = $query -> num_rows();

if($num_rows === 0){
  $response['status'] = "failed";
  $response['message'] = "no flights found";
}else{
  $flights_list = [];
  $query -> bind_result($destination, $country, $price, $airline_name, $model, $dep_airport_name, $dep_date, $arr_airport_name, $arr_date, $status);
  while($query -> fetch()){
    $flight = [
      "destination" => $destination,
      "country" => $country,
      "price" => $price,
      "airline_name" => $airline_name,
      "airplane_model" => $model,
      "departure_airport_name" => $dep_airport_name,
      "departure_date" => $dep_date,
      "arrival_airport_name" => $arr_airport_name,
      "arrival_date" => $arr_date,
      "status" => $status
    ];
    $flights_list[] = $flight;
  }
  $response['status'] = "succsess";
  $response['flights'] = $flights_list;
}

echo json_encode($response);