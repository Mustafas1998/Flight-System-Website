<?php
include ("connection.php");


$review_id= $_POST["user_id"]; 
$flight_id=$_POST["flight_id"];

$query = $mysqli->prepare(
"SELECT review_text,rating  FROM reviews r

WHERE u.user_id = ? AND f.flight_id = ?;"); 
$query->bind_param( "ii",$user_id,$flight_id);
$query->execute();

$query->store_result();
$num_rows = $query->num_rows();

if ($num_rows==0){
    $response['status'] ='cannot find reviews';
}else{
    $reviews=[];
    $query->bind_result($reviews_id,$review_text,$rating,$user_id,$flight_id);
    while ($query->fetch()){
        $review=[
            'review_id'=> $review_id,
            'review_text'=> $review_text,
            'rating'=> $rating
            
        ];
        $reviews[]=$review;
    }
    $response['status']='success';
    $response ['reviews']=$reviews;

}

echo json_encode($response);