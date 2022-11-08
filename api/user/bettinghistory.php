<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Firstacc's betting history:</h1>
    <?php
    $db = new mysqli("betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com:3306","admin","Password1","BetSmart");
    if ($db->connect_error){ 
        die("Connection failed: ".$db->connect_error);
    }
    $query = "SELECT * FROM USERPICKS WHERE username='firstacc'";
    
    echo"
        <table>
            <tr>
                <th>Week</th>
                <th>Picked team</th>
                <th>Bet amount</th>
                <th>Hit</th>
                <th>Gain</th>
                <th>Balance</th>
            </tr>
    ";
    if($result = $db->query($query)){
        while($row=$result->fetch_assoc()){
            if($row['hit']==1) $hit = "yes";
            else $hit = "no";
            echo"
                <tr>
                    <td>".$row['week']."</td>
                    <td>".$row['pickteam']."</td>    
                    <td>".$row['betamount']."</td>    
                    <td>".$hit."</td>    
                    <td>".$row['gain']."</td>    
                    <td>".$row['balance']."</td>
                </tr>        
            ";
        }
        $result->free();
        echo "</table>";
    }
    $db->close();
    ?>
</body>
</html>