<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");

$host = "localhost";
$db_user = "root";
$db_pass = null;
$db_name = "flight_system_db";

$mysqli = new mysqli($host, $db_user, $db_pass, $db_name);

if ($mysqli->connect_error){
  die("Connection failed: ". $mysqli->connect_error);
}

