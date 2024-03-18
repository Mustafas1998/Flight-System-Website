<?php
include('connection.php');

$message_content = $_POST['message_content'] ?? '';
$user_id = $_POST['user_id'] ?? '';
$admin_id = $_POST['admin_id'] ?? '';


$query = $mysqli->prepare("INSERT INTO messages (message_content, user_id, admin_id) VALUES (?, ?, ?)");
$query->bind_param("sii", $message_content, $user_id, $admin_id);


if ($query->execute()) {
    $response['status'] = 'success';
    $response['message'] = 'Message saved successfully';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to save message';
}

echo json_encode($response);





