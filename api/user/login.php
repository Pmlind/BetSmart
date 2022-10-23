<link rel="stylesheet" href="../../assets/css/style.css">
<?php
$db = new mysqli("betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com:3306","admin","Password1","BetSmart");
if ($db->connect_error){ 
    die("Connection failed: ".$db->connect_error);
}
$username = $_GET["username"];
$password = $_GET["password"];

$usercheckQuery = "SELECT * FROM USERS WHERE username='$username';";
$updateloginQuery = "UPDATE USERS SET lastlogin = now() WHERE username='$username';";

$result = $db->query($usercheckQuery);
$user = $result->fetch_assoc();

if($user!=NULL){
	if($user['psswrd'] == $password){
		$db->query($updateloginQuery);
		echo "<p>Welcome back, $username!</p>
			<p>You will be redirected in <span id='counter'>4</span> second(s).</p>
			<script type='text/javascript'>
				function countdown() {
					var i = document.getElementById('counter');
					if (parseInt(i.innerHTML)>0) {
						i.innerHTML = parseInt(i.innerHTML)-1;
					}else{
						window.location='../../mockfrontend.html';
					}
				}
				setInterval(function(){ countdown(); },1000);
			</script>";
	}
	else{
		echo "<p>Your password is incorrect! Please try again!</p>
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
else echo "<p>You do not have an account with us yet! Please sign up first before logging in!</p>
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
