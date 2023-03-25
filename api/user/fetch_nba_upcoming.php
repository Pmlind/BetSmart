<?php
$db = new mysqli("betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com:3306","admin","Password1","BetSmart");
if ($db->connect_error){ 
    die("Connection failed: ".$db->connect_error);
}

//delete match data before today
$del_que = "DELETE FROM BetSmart.NBAUPCOMING
WHERE date_ < CURRENT_DATE();";

$db->query($del_que);

$query = "SELECT * FROM BetSmart.NBAUPCOMING;";

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