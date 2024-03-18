<?php
include("connection.php");

$payment_status = $_GET['payment_status'];

$query = $mysqli -> prepare("
select p.payment_request_id, p.amount, p.payment_status, p.user_id, u.username
from payment_requests p
join users u on u.user_id = p.user_id
where p.payment_status = ?");
$query -> bind_param("s", $payment_status);
$query -> execute();
$query -> store_result();
$num_rows = $query -> num_rows();

if ($num_rows === 0){
  $response['status'] = "not found";
  $message['message'] = "no payment requests found";

}else{
  $payment_requests = [];
  $query -> bind_result($payment_request_id, $amount, $payment_status, $user_id, $username);
  while($query -> fetch()){
    $payment_req = [
      "payment_request_id" => $payment_request_id,
      "amount" => $amount,
      "payment_status" => $payment_status,
      "user_id" => $user_id,
      "username" => $username
    ];
    $payment_requests[] = $payment_req;
  }
  $response['status'] = "success";
  $response['payment_requests'] = $payment_requests;
}

echo json_encode($response);