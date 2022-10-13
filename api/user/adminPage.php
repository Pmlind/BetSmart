<?php
$db = new mysqli("betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com:3306","admin","Password1","BetSmart");
if ($db->connect_error){ 
    die("Connection failed: ".$db->connect_error);
}

$getUsersQuery= "SELECT * FROM Users";

echo "<table>
	<tr>
		<th>id</th>
		<th>username</th>
		<th>password</th>
	</tr>
	<tr>";
if($result=$db->query($getUsersQuery)){
	while($row=$result->fetch_assoc()){
	echo"<tr>
		<td>".$row['ID']."</td>
		<td>".$row['Username']."</td>
		<td>".$row['Password']."</td>
	     </tr>";

	}
	echo"</table>";
	$result->free();
}
$db->close();
?>