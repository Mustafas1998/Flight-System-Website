<?php
include('connection.php');

$query=$mysqli->prepare( "SELECT * FROM reviews");

$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if ($num_rows==0){
    $response['status'] ='cannot find reviews';
}else{
    $reviews=[];
    $query->bind_result($review_id,$review_text,$rating,$user_id,$flight_id);
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
