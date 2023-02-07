<?php
$db = new mysqli("betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com:3306","admin","Password1","BetSmart");
if ($db->connect_error){ 
    die("Connection failed: ".$db->connect_error);
}

$query = "SELECT * FROM BetSmart.PICKS WHERE week='13';";

$result = $db->query($query);
if (mysqli_num_rows($result) > 0) {
    // Output data of each row
    while($row = mysqli_fetch_assoc($result)) {
      $data[] = $row;
    }
}

echo json_encode($data);

$db->close();
?>