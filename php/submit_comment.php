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
		try {
			$conn->exec($insertion_query);
		}
		catch(PDOException $e) {
			echo $sql."<br/>".$e->getMessage();
		}
	}
	
	$conn = null;
	
?>
