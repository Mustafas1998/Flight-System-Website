<?php
include("connection.php");

$airports_query = $mysqli -> prepare("select * from airports");
$airports_query -> execute();
$airports_query -> store_result();
$airports_query -> bind_result($airport_id, $airport_name);

$airports_list =[];
while($airports_query -> fetch()){
  $airport =[
    "id" => $airport_id,
    "name" => $airport_name
  ];
  $airports_list[] = $airport;
}

$response['status'] = "success";
$response["airports"] = $airports_list;


$airlines_query = $mysqli -> prepare("select * from airlines");
$airlines_query -> execute();
$airlines_query -> store_result();
$airlines_query -> bind_result($airline_id, $airline_name);

$airlines_list =[];
while($airlines_query -> fetch()){
  $airline =[
    "id" => $airline_id,
    "name" => $airline_name
  ];
  $airlines_list[] = $airline;
}

$response["airlines"] = $airlines_list;


$airplanes_query = $mysqli -> prepare("select * from airplanes");
$airplanes_query -> execute();
$airplanes_query -> store_result();
$airplanes_query -> bind_result($airplane_id, $model, $seats);
$airplanes_list =[];
while($airplanes_query -> fetch()){
  $airplane =[
    "id" => $airplane_id,
    "model" => $model,
    "seats" => $seats
  ];
  $airplanes_list[] = $airplane;
}

$response['airplanes'] = $airplanes_list;

echo json_encode($response);