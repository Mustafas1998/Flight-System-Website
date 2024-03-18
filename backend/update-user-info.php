<?php
include("connection.php");

$user_id = $_POST['user_id'];
$email = isset($_POST['email']) ? $_POST['email'] : null;
$f_name = isset($_POST['f_name']) ? $_POST['f_name'] : null;
$l_name = isset($_POST['l_name']) ? $_POST['l_name'] : null;
$phone = isset($_POST['phone']) ? $_POST['phone'] : null;
$bank = isset($_POST['bank']) ? $_POST['bank'] : null;
$valid_booking = isset($_POST['valid_booking']) ? $_POST['valid_booking'] : null;

$update_query = "update users set ";
$update_params_str = [];
$update_params_int = [];

if ($email !== null) {
    $update_query .= "email = ?, ";
    $update_params_str[] = $email;
}
if ($f_name !== null) {
    $update_query .= "f_name = ?, ";
    $update_params_str[] = $f_name;
}
if ($l_name !== null) {
    $update_query .= "l_name = ?, ";
    $update_params_str[] = $l_name;
}
if ($phone !== null) {
    $update_query .= "phone = ?, ";
    $update_params_str[] = $phone;
}
if ($bank !== null) {
    $update_query .= "bank = ?, ";
    $update_params_int[] = $bank;
}
if ($valid_booking !== null) {
    $update_query .= "valid_booking = ?, ";
    $update_params_int[] = $valid_booking;
}

$update_query = rtrim($update_query, ", ");
$update_query .= " WHERE user_id = ?";

$update_params = array_merge($update_params_str, $update_params_int);
$update_params[] = $user_id;

$types_str = str_repeat("s", count($update_params_str));
$types_int = str_repeat("i", count($update_params_int));
$types = $types_str . $types_int . "i";

echo $update_query . " " . $types;
print_r($update_params) ;

$update_statement = $mysqli->prepare($update_query);
$update_statement->bind_param($types, ...$update_params);
$update_statement->execute();

if ($update_statement->affected_rows > 0) {
  $response['status'] = "success";
  $response['message'] = "User info updated";

} else {
  $response['status'] = "error";
  $response['message'] = "Failed to update user info";

}
echo json_encode($response);