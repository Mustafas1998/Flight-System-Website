<?php
include("connection.php");

$query = mysqli -> prepare(
"select u.username, f.flight_id, r.review_text, r.rating(select)
from reviews r
join flights f on f.flight_id = r.flight_id 
join users u on u.user_id = r.user_id"
);