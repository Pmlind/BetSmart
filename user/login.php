<?php
$db = new mysqli("betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com:3306","admin","Password1","BetSmart");
if ($db->connect_error){ 
    die("Connection failed: ".$db->connect_error);
}
$username = $_GET["username"];
$password = $_GET["password"];

$usercheckQuery = "SELECT * FROM Users WHERE Username='$username';";

$result = $db->query($usercheckQuery);
$user = $result->fetch_assoc();

if($user!=NULL){
	if($user['Password'] == $password) echo "<p> user logged in!</p>";
	else echo "<p> wrong password</p>";
}
else echo "<p>username does not exist in the db yet</p>";

$db->close();
?>
