<?php

$db = new mysqli("betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com:3306","admin","Password1","BetSmart");

if ($db->connect_error){ 
    die("Connection failed: ".$db->connect_error);
}

$username = $_POST["username"];
$password = $_POST["password"];

$adduserQuery = "INSERT INTO Users (Username,Password)
		VALUES ('$username','$password');";
$userExistingCheckQuery = "SELECT Username FROM Users WHERE Username = '$username'";

$uecresult = $db->query($userExistingCheckQuery);
$uec = $uecresult->fetch_assoc();

if($uec == NULL){
	if($db->query($adduserQuery)){
		 echo "<p>user $username signed up successfully</p>";
	}
	else{
		 echo "<p>something wrong happened</p>";
	}
}
else echo "<p> user already exists in the database</p>";

$db->close();

?>
