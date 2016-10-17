$(document).ready(function(){
    if(localStorage.userAuthorized != "true"){
        window.location.href = "../account/login.html";
    }
});