<?php

	require "db_config.php";
	
	function db_conn() {
		$passed_conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
		if ($conn->connect_error) {
			die("Connection Failed: " . $conn->connect_error);
		}
		return $passed_conn;
	}

	function db_kill_conn($passed_conn) {
		$passed_conn->close;
	}

	$conn = db_conn();
	
	$comment = $img_name = "";
	
	function test_input($data) {
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data, ENT_QUOTES);
		return $data;
	}
	
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$comment = test_input($_POST["comment"]);
		$img_name = test_input($_POST["image_name"]);
		$insertion_query = "INSERT INTO idgallery_comments (comment,file_name) VALUES ('".$comment."','".$img_name."')";
		if ($conn->query($insertion_query) === FALSE) {
			echo "Insertion failed; comment not added! ".$conn->error;
		}
	}
	
	db_kill_conn($conn);
	
?>
