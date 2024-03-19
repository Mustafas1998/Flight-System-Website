<?php
include("connection.php");

$identifier =$_POST['identifier'];
$password = $_POST['password'];

if(filter_var($identifier, FILTER_VALIDATE_EMAIL)){
  $query = $mysqli->prepare("
  select user_id, user_password 
  from users 
  where email = ?");
}else{
  $query = $mysqli->prepare("
  select user_id, user_password 
  from users 
  where username = ?");
}

$query->bind_param("s", $identifier);
$query->execute();
$query->store_result();
$query->bind_result($id, $hashed_password);
$query->fetch();
$num_rows = $query->num_rows();

if ($num_rows == 0){
  $response['status'] = "user not found";
}else{ 
  if (password_verify($password, $hashed_password)){
    $response['status'] = "success";
    $response['user_id'] = $id;
  }else{
    $response['status'] = "incorrect credentials";
  }
} 

echo json_encode($response);