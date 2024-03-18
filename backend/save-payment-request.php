<?php
include("connection.php");

$user_id = $_POST["user_id"];
$amount = $_POST['amount'];
$payment_status = "pending";

$query = $mysqli -> prepare("
insert into payment_requests (user_id, amount, payment_status)
values(?, ?, ?)");
$query -> bind_param("iis", $user_id, $amount, $payment_status);
$query -> execute();

$response['status'] = "success";
$response['message'] = "payment request saved";

echo json_encode($response);