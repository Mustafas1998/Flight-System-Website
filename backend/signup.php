<?php
include("connection.php");

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

$check_user = $mysqli -> prepare('select * from users where username = ? or email = ?');
$check_user->bind_param('ss', $username, $email);
$check_user->execute();
$check_user->store_result();
$user_exists = $check_user->num_rows();

if ($user_exists == 0){
  $hashed_password = password_hash($password, PASSWORD_BCRYPT);

  $bank = 0;
  $valid_booking = 0;

  $query = $mysqli->prepare('
  insert into users (username, email, user_password, bank, valid_booking) 
  values (?, ?, ?, ?, ?)');
  $query->bind_param('sssii', $username, $email, $hashed_password, $bank, $valid_booking);
  $query->execute();
  $response['status'] = "success";
  $response['message'] = "user $username was created successfully";
}else{
  $response['status'] = "user already exists";
  $response['message'] = "user $username wasn't created";
}

echo json_encode($response);