var mainApp = angular.module("mainApp", []);
var usersArray = {"users":[{"userName":"sstrange", "password":"SorcererSupreme", "userType":"Doctor"},
                                {"userName":"pcakes", "password":"BakersMan", "userType":"Receptionist"},
                                {"userName":"sstorm", "password":"FantasticFour", "userType":"Nurse"}]};
var userTypesList = {"userTypes":[{"name":"Doctor"}, {"name":"Nurse"}, {"name":"Receptionist"}]};

mainApp.controller('accountController', function($scope){
    $scope.master = {userName: "", password: "", userType: ""};
    $scope.user = angular.copy($scope.master);

    $scope.userTypes = userTypesList;
    
    $scope.login = function(){
        if ($scope.loginForm.$valid) {
            var userLogin = {userName: "", password: "", userType: ""};
            var isValidLogin = false;

            userLogin.userName = $scope.user.userName;
            userLogin.password = $scope.user.password;
            userLogin.userType = $scope.user.userType.name;

            usersArray.users.forEach(function(item){
                if(userLogin.userName == item.userName && userLogin.password == item.password && userLogin.userType == item.userType){
                    isValidLogin = true;
                }
            });

            if(isValidLogin){
                localStorage.userName = userLogin.userName;
                localStorage.userAuthorized = "true";
                localStorage.isDoctor = userLogin.userType == "Doctor" ? "true" : "false";
                localStorage.isNurse = userLogin.userType == "Nurse" ? "true" : "false";
                localStorage.isReceptionist = userLogin.userType == "Receptionist" ? "true" : "false";

                window.location.href = "../home/index.html";
            }
            else{
                alert('Invalid Login');
            }
        }
    };
});