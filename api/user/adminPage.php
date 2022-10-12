<?php
$db= new mysqli("mysql.eecs.ku.edu","m926n810","Yi7saine","m926n810");
if ($db->connect_error){ 
    die("Connection failed: ".$db->connect_error);
}

$getUsersQuery= "SELECT * FROM NFLUsers";

echo "<table>
	<tr>
		<th>username</th>
		<th>password</th>
	</tr>
	<tr>";
if($result=$db->query($getUsersQuery)){
	while($row=$result->fetch_assoc()){
	echo"<tr>
		<td>".$row['Id']."</td>
		<td>".$row['Pw']."</td>
	     </tr>";

	}
	echo"</table>";
	$result->free();
}
$db->close();
?>