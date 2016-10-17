var mainApp = angular.module("mainApp", []);

mainApp.controller('doctorReportController', function($scope){
    $scope.doctorsList = JSON.parse(localStorage.doctors);
    $scope.totalnumber = $scope.doctorsList.doctors.length;
});

mainApp.controller('patientReportController', function($scope){
    $scope.patientsList = JSON.parse(localStorage.patients);
    $scope.totalnumber = $scope.patientsList.patients.length;
});