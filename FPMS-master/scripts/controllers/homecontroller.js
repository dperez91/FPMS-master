var mainApp = angular.module("mainApp", []);

mainApp.controller('homeController', function($scope){
    $scope.userName = localStorage.userName;

    $scope.logout = function(){
        localStorage.userAuthorized = "false";
        localStorage.isDoctor = "false";
        localStorage.isNurse = "false";
        localStorage.isReceptionist = "false";

        window.location.href = "../account/login.html";
    };
});