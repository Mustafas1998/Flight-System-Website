<?php
include("connection.php");

$payment_request_id = $_POST["payment_request_id"];
$payment_status = $_POST['payment_status'];

$update_query = "update payment_requests set payment_status = ? where payment_request_id = ?";
$update_statement = $mysqli->prepare($update_query);
$update_statement->bind_param("si", $payment_status, $payment_request_id);
$update_statement->execute();

if ($update_statement->affected_rows > 0) {
    $response['status'] = "success";
    $response['message'] = "Payment status updated";
} else {
    $response['status'] = "error";
    $response['message'] = "Failed to update payment status";
}

echo json_encode($response);