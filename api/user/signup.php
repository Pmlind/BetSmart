<link rel="stylesheet" href="../../assets/css/style.css">
<body>
		<div style="width:800px; margin:100px auto; color:white;">
<?php
$db = new mysqli("betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com:3306","admin","Password1","BetSmart");

if ($db->connect_error){ 
    die("Connection failed: ".$db->connect_error);
}

$username = $_POST["username"];
$password = $_POST["password"];

$adduserQuery = "INSERT INTO USERS (username,psswrd,createddate,lastlogin,balance,verified)
		VALUES ('$username','$password', now(),now(), '0','no');";
$userExistingCheckQuery = "SELECT Username FROM USERS WHERE username = '$username'";

$uecresult = $db->query($userExistingCheckQuery);
$uec = $uecresult->fetch_assoc();

if($uec == NULL){
	if($db->query($adduserQuery)){
		 echo "<p style='font-size:30px;'>Welcome to BetSmart, $username!</p>
		 <p>You will be redirected in <span id='counter'>5</span> second(s).</p>
					<script type='text/javascript'>
						function countdown() {
							var i = document.getElementById('counter');
							if (parseInt(i.innerHTML)>0) {
								i.innerHTML = parseInt(i.innerHTML)-1;
							}else{
								window.location='../../index.html';
							}
						}
						setInterval(function(){ countdown(); },1000);
					</script>";
	}
	else{
		 echo "<p>An unknown error occured, please try again!</p>
		 <p>You will be redirected in <span id='counter'>4</span> second(s).</p>
					<script type='text/javascript'>
						function countdown() {
							var i = document.getElementById('counter');
							if (parseInt(i.innerHTML)>0) {
								i.innerHTML = parseInt(i.innerHTML)-1;
							}else{
								window.location='../../login.html';
							}
						}
						setInterval(function(){ countdown(); },1000);
					</script>";
	}
}
else echo "<p style='font-size:25px;'>User $username already exists! Please try again!</p>
			<p>You will be redirected in <span id='counter'>4</span> second(s).</p>
					<script type='text/javascript'>
						function countdown() {
							var i = document.getElementById('counter');
							if (parseInt(i.innerHTML)>0) {
								i.innerHTML = parseInt(i.innerHTML)-1;
							}else{
								window.location='../../login.html';
							}
						}
						setInterval(function(){ countdown(); },1000);
					</script>";

$db->close();

?>
</div>
</body>
