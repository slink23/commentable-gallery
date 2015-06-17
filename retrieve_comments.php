<?php

	require "php/db_config.php";
	
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

	$image_name = $_GET['id'];

	$retrieval_query = "SELECT comment FROM idgallery_comments WHERE file_name='".$image_name."'";

	$result = mysqli_query($conn, $retrieval_query);
	
	if ($result->num_rows > 0) {
		$data = array();
		header('Content-Type: application/json');
		while ($row = $result->fetch_assoc()) {
			array_push($data, ['photoComment'=>$row['comment']]);
		}
		echo json_encode($data);
	}
	else {
		header('Content-Type: application/json');
		echo "[]";
	}

	db_kill_conn($conn);
	
?>
