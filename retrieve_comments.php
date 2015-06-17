<?php

	require "php/db_config.php";
	
	function db_conn() {
		$passed_conn = null;
		try {
			$passed_conn = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME,DB_USER,DB_PASS);
			// set the PDO error mode to exception
			$passed_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		catch(PDOException $e)
		{
			echo "Connection failed: " . $e->getMessage();
		}
		return $passed_conn;
	}


	$conn = db_conn();

	$image_name = $_GET['id'];

	$retrieval_query = "SELECT comment FROM idgallery_comments WHERE file_name='".$image_name."'";

	$result = $conn->query($retrieval_query);
	
	if ($result->rowCount() > 0) {
		$data = array();
		header('Content-Type: application/json');
		foreach ($result as $row) {
			array_push($data, ['photoComment'=>$row['comment']]);
		}
		echo json_encode($data);
	}
	else {
		header('Content-Type: application/json');
		echo "[]";
	}

	$conn=null;
	
?>
