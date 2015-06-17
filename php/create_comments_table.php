<?php

require "db_config.php";

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

$create_CommentsTable = "CREATE TABLE IF NOT EXISTS `idgallery_comments` (
  `comment_id` int(7) unsigned NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `file_name` varchar(255) NOT NULL,
  PRIMARY KEY (`comment_id`)
);";

try {
	$conn->exec($create_CommentsTable);
	echo "Comments Table Created!";
}
catch(PDOException $e) {
	echo $create_CommentsTable . "<br/>". $e->getMessage();
}

$conn = null;

?>
