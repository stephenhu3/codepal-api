function checkUserExists(){
    var userId = localStorage.getItem("userId");
    var accessToken = localStorage.getItem("accessToken");
    var url = "http://ec2-52-38-68-51.us-west-2.compute.amazonaws.com:8080/users/search";

    var data = {"userId": userId};
    $.ajax({
        dataType: "json",
        contentType: "application/json",
        method: "POST",
        url: url,
        data: JSON.stringify(data),
        success: function(data){
            console.log(data);
            localStorage.setItem("userId",data.userId);
            localStorage.setItem("accessToken",data.accessToken);
            if(accessToken !== data.accessToken){
                console.log("The user exists");
                updateAccessToken();
            }
            window.location.assign(pageUrl+'main.html');
        },
        error: function(){
            $("#myModal").modal();
        }
    });
}

function updateAccessToken(){
    var userId = localStorage.getItem("userId");
    var newAccessToken = localStorage.getItem("accessToken");
    var url = "http://ec2-52-38-68-51.us-west-2.compute.amazonaws.com:8080/users/accesstokens";

    var data = {"userId": userId, "accessToken": newAccessToken};
    $.ajax({
        dataType: "json",
        contentType: "application/json",
        method: "POST",
        url: url,
        data: JSON.stringify(data),
        success: function(data){
            console.log("Updated new access token");
            window.location.assign(pageUrl+'main.html');
        },
        error: function(){console.log("Fail updating access token!");}
    });
}

function signUpNewUser(){
    var username = $("#usernameInput").val();
    var userId = localStorage.getItem("userId");
    var accessToken = localStorage.getItem("accessToken");

    var url = "http://ec2-52-38-68-51.us-west-2.compute.amazonaws.com:8080/users";
    var data = {"userId": userId, "username": username ,"accessToken": accessToken, "settings": "sampleSettings"};
    
    console.log(data);
    if(username != "" && username != null){
        $.ajax({
            dataType: "json",
            contentType: "application/json",
            method: "POST",
            url: url,
            data: JSON.stringify(data),
            success: function(){
                alert("You already signed up! Thanks!");
            }
        });
    }
    else{
        alert("Username is invalid");
        FB.logout();
        window.location.assign(pageUrl);
    }
}

function unsubmitUsername(){
    FB.logout();
    window.location.assign(pageUrl);
}