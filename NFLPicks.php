<?php 
    echo "<b>Users:</b>"; 
    $mysqli = new mysqli("betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com", "admin", "Password1", "BetSmart");  
    if ($mysqli->connect_errno) 
    { 
        printf("Connect failed: %s\n", $mysqli->connect_error); exit(); 
    } 
    
    $query = "SELECT * FROM PICKS"; 
    
    if ($result = $mysqli->query($query)) 
    {  
        while ($row = $result->fetch_assoc()) 
        { 
            $entry = $row["user_id"];    
            echo "<p>$entry</p>";
        }
        $result->free(); 
    }  
    else 
    {
        printf("Error: %s", $mysqli->error);
    }
    $link = "https://people.eecs.ku.edu/~h616m004/EECS448-Lab10/lab10/AdminHome.html";
    echo "<a href='$link'>Back to Admin Home</a>";
    $mysqli->close();
?>