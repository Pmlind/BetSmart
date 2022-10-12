<?php
$db = new mysqli("mysql.eecs.ku.edu","m926n810","Yi7saine","m926n810");
if ($db->connect_error){ 
    die("Connection failed: ".$db->connect_error);
}
$username = $_GET["username"];
$password = $_GET["password"];

$usercheckQuery = "SELECT * FROM NFLUsers WHERE Id='$username';";

$result = $db->query($usercheckQuery);
$user = $result->fetch_assoc();

if($user!=NULL){
	if($user['Pw'] == $password) echo "<p> user logged in!</p>";
	else echo "<p> wrong password</p>";
}
else echo "<p>username does not exist in the db yet</p>";

$db->close();
?>
