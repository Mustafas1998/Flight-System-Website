<?php
include("connection.php");

$user_id = $_GET['user_id'];

$query = $mysqli -> prepare("select * from users where user_id = ?");
$query -> bind_param('i', $user_id);
$query -> execute();
$query -> store_result();
$num_rows = $query -> num_rows();

if($num_rows !== 0){
  $query -> bind_result($user_id, $username,	$email, $user_password, $f_name, $l_name, $phone, $bank, $valid_booking);
  $query -> fetch();
  $user_info = [ 
    "id" => $user_id,
    "username" => $username,
    "email" => $email,
    "f_name" =>$f_name,
    "l_name" =>$l_name,
    "phone" => $phone,
    "bank" => $bank,
    "valid_booking" => $valid_booking
  ];

  $response['status'] = "success";
  $response['user_info'] = $user_info;

}else{
  $response['status'] = "failed";
  $response['message'] = "user not found";
}

echo json_encode($response);
