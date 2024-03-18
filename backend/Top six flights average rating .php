<?php
include('connection.php');

$query = $mysqli->prepare("SELECT flight_id, AVG(rating) AS average_rating
FROM reviews
GROUP BY flight_id
ORDER BY average_rating DESC
LIMIT 6;");
$query->execute();
$result = $query->get_result();

if ($result) {
    $average_ratings = array();
    while ($row = $result->fetch_assoc()) {
        $average_ratings[] = $row;
    }

    $response['status'] = 'success';
    $response['average_ratings'] = $average_ratings;
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to fetch average ratings';
}

echo json_encode($response);