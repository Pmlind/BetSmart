<?php

$db = new mysqli("mysql.eecs.ku.edu","m926n810","Yi7saine","m926n810");

if ($db->connect_error){ 
    die("Connection failed: ".$db->connect_error);
}

$username = $_POST["username"];
$password = $_POST["password"];

$adduserQuery = "INSERT INTO NFLUsers (Id,Pw)
		VALUES ('$username','$password');";
$userExistingCheckQuery = "SELECT Id FROM NFLUsers WHERE Id = '$username'";

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
