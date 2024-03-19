<?php
include ("connection.php");

$review_text = $_POST["review_text"];
$rating =$_POST["rating"];
$user_id= $_POST["user_id"];
$flight_id=$_POST["flight_id"];



$query = $mysqli->prepare("INSERT INTO reviews (review_text,rating,user_id,flight_id) VALUES (?,?,?,?)");
$query->bind_param('siii', $review_text,$rating,$user_id,$flight_id); 
$query->execute();

if ($query) {
    $response['status'] = 'success';
    $response['message'] = 'Review added successfully';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to add review';
}

echo json_encode($response);