/*
Main code for Sign Up/Sign In.
*/

function signin(){
    var username = document.getElementById("signin_username").value;
    var password = String(CryptoJS.SHA256(document.getElementById("signin_password").value));
    $.ajax({
      type: "GET",
      url: "./api/user/login.php",
      data: { username: username, password: password }
    })
      .done(function( response ) {
        // Update the page content with the response from the server
        $("body").html(response);
      });
}

function signup(){
    var username = document.getElementById("signup_username").value;
    var password = String(CryptoJS.SHA256(document.getElementById("signup_password").value));
    var confirmm = String(CryptoJS.SHA256(document.getElementById("confirm_password").value));
    console.log(password+" "+confirmm);
    if(password==confirmm){
        $.ajax({
            type: "POST",
            url: "./api/user/signup.php",
            data: { username: username, password: password }
          })
            .done(function( response ) {
              // Update the page content with the response from the server
              $("body").html(response);
            });
        }
    else{
          alert("passwords are not matching");
        }
    }
