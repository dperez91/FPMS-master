var mainApp = angular.module("mainApp", []);
var statesList =  {"states" :[{"abbreviation": "AL"}, {"abbreviation": "AK"}, {"abbreviation": "AS"}, {"abbreviation": "AZ"},
                            {"abbreviation": "AR"}, {"abbreviation": "CA"}, {"abbreviation": "CO"}, {"abbreviation": "CT"},
                            {"abbreviation": "DE"}, {"abbreviation": "DC"}, {"abbreviation": "FM"},
                            {"abbreviation": "FL"}, {"abbreviation": "GA"}, {"abbreviation": "GU"}, {"abbreviation": "HI"},
                            {"abbreviation": "ID"}, {"abbreviation": "IL"}, {"abbreviation": "IN"}, {"abbreviation": "IA"},
                            {"abbreviation": "KS"}, {"abbreviation": "KY"}, {"abbreviation": "LA"}, {"abbreviation": "ME"},
                            {"abbreviation": "MH"}, {"abbreviation": "MD"}, {"abbreviation": "MA"}, {"abbreviation": "MI"},
                            {"abbreviation": "MN"}, {"abbreviation": "MS"}, {"abbreviation": "MO"}, {"abbreviation": "MT"},
                            {"abbreviation": "NE"}, {"abbreviation": "NV"}, {"abbreviation": "NH"}, {"abbreviation": "NJ"},
                            {"abbreviation": "NM"}, {"abbreviation": "NY"}, {"abbreviation": "NC"}, {"abbreviation": "ND"},
                            {"abbreviation": "MP"}, {"abbreviation": "OH"}, {"abbreviation": "OK"}, {"abbreviation": "OR"},
                            {"abbreviation": "PW"}, {"abbreviation": "PA"}, {"abbreviation": "PR"}, {"abbreviation": "RI"},
                            {"abbreviation": "SC"}, {"abbreviation": "SD"}, {"abbreviation": "TN"}, {"abbreviation": "TX"},
                            {"abbreviation": "UT"}, {"abbreviation": "VT"}, {"abbreviation": "VI"}, {"abbreviation": "VA"},
                            {"abbreviation": "WA"}, {"abbreviation": "WV"}, {"abbreviation": "WI"}, {"abbreviation": "WY"}]};
var doctorsArray = {"doctors":[{"firstName":"Stephen", "lastName":"Strange", "phoneNumber":"317-987-6543", "address":"7586 West Main St", "city":"Gotham", "state":"NY", "zip":"11417", "type":"Family"},
                                {"firstName":"Hank", "lastName":"Pym", "phoneNumber":"219-487-8888", "address":"7586 Column Ave", "city":"Louisville", "state":"KY", "zip":"40220", "type":"Family"},
                                {"firstName":"Nathaniel", "lastName":"Essex", "phoneNumber":"219-487-8888", "address":"3245 Mystery St", "city":"Chicago", "state":"IL", "zip":"60608", "type":"Family"}]};
var doctorInfo = {firstName: "", lastName: "", phoneNumber: "", type: "", address: "", city: "",
                     state: "", zip: ""};
var doctorIndex;

mainApp.controller('doctorController', function($scope){
    $scope.userName = localStorage.userName;
    prepareLocalStorageObject();

    $scope.doctorsList = getAllDoctors();

    $scope.addNewDoctor = function(){
        window.location.href = "../doctor/newdoctor.html";
    };

    $scope.editDoctor = function(){
        window.location.href = "../doctor/editdoctor.html";
    };

    $scope.getDoctor = function(index){
        var doctor = $scope.doctorsList.doctors[index];

        doctorInfo.firstName = doctor.firstName;
        doctorInfo.lastName = doctor.lastName;
        doctorInfo.type = doctor.type;
        doctorInfo.phoneNumber = doctor.phoneNumber;
        doctorInfo.address = doctor.address;
        doctorInfo.city = doctor.city;
        doctorInfo.state = doctor.state;
        doctorInfo.zip = doctor.zip;

        localStorage.doctorInfo = JSON.stringify(doctorInfo);
        localStorage.selectedDoctorIndex = index;
    }

    $scope.isReceptionist = function(){
        if(localStorage.isReceptionist == "true"){
            return true;
        }
        else{
            return false;
        }
    }

    $scope.logout = function(){
        localStorage.userAuthorized = "false";
        localStorage.isDoctor = "false";
        localStorage.isNurse = "false";
        localStorage.isReceptionist = "false";

        window.location.href = "../account/login.html";
    };
});

mainApp.controller('newDoctorController', function($scope){
    $scope.userName = localStorage.userName;

    if(localStorage.doctors !== JSON.stringify(doctorsArray)){
        prepareLocalStorageObject();
    }

    $scope.master = {firstName: "", lastName: "", phoneNumber: "", type: "", address: "", city: "",
                     state: "", zip: ""};
    $scope.doctor = angular.copy($scope.master);
    $scope.zipMaxlength = 5;
    $scope.phoneMaxlength = 13;

    $scope.states = statesList;

    $scope.saveDoctor = function() {
        if ($scope.newDoctorForm.$valid) {
            var newDoctor = {firstName: "", lastName: "", phoneNumber: "", type: "", address: "", city: "",
                        state: "", zip: ""};

            newDoctor.firstName = $scope.doctor.firstName;
            newDoctor.firstName = $scope.doctor.lastName;
            newDoctor.firstName = $scope.doctor.phoneNumber;
            newDoctor.firstName = $scope.doctor.type;
            newDoctor.firstName = $scope.doctor.address;
            newDoctor.firstName = $scope.doctor.city;
            newDoctor.firstName = $scope.doctor.state.abbreviation;
            newDoctor.firstName = $scope.doctor.zip;

            doctorsArray.doctors.push(newDoctor);

            localStorage.doctors = JSON.stringify(doctorsArray); 

            $scope.master = angular.copy($scope.doctor);

            alert('Doctor Saved!!!');
        }
    };

    $scope.logout = function(){
        localStorage.userAuthorized = "false";
        localStorage.isDoctor = "false";
        localStorage.isNurse = "false";
        localStorage.isReceptionist = "false";

        window.location.href = "../account/login.html";
    };
});

mainApp.controller('editDoctorController', function($scope){
    $scope.userName = localStorage.userName;

    if(localStorage.doctors !== JSON.stringify(doctorsArray)){
        prepareLocalStorageObject();
    }

    $scope.master = JSON.parse(localStorage.doctorInfo);
    $scope.doctor = angular.copy($scope.master);
    $scope.zipMaxlength = 5;
    $scope.phoneMaxlength = 13;

    $scope.states = statesList;

    for(var i = 0, len = $scope.states.states.length; i < len; i++) {
        if ($scope.states.states[i].abbreviation == $scope.doctor.state) {
            $scope.initialSelectedStateIndex = i;
            break;
        }
    }

    $scope.saveDoctor = function() {
        if ($scope.editDoctorForm.$valid) {
            var editedDoctor = {firstName: "", lastName: "", phoneNumber: "", type: "", address: "", city: "",
                        state: "", zip: ""};

            editedDoctor.firstName = $scope.doctor.firstName;
            editedDoctor.firstName = $scope.doctor.lastName;
            editedDoctor.firstName = $scope.doctor.phoneNumber;
            editedDoctor.firstName = $scope.doctor.type;
            editedDoctor.firstName = $scope.doctor.address;
            editedDoctor.firstName = $scope.doctor.city;
            editedDoctor.firstName = $scope.doctor.state.abbreviation;
            editedDoctor.firstName = $scope.doctor.zip;

            doctorsArray.doctors[localStorage.selectedDoctorIndex] = editDoctor;

            localStorage.doctors = JSON.stringify(doctorsArray);
            
            $scope.master = angular.copy($scope.doctor);

            alert('Doctor Saved!!!');
        }
    };

    $scope.logout = function(){
        localStorage.userAuthorized = "false";
        localStorage.isDoctor = "false";
        localStorage.isNurse = "false";
        localStorage.isReceptionist = "false";

        window.location.href = "../account/login.html";
    };
});

function prepareLocalStorageObject(){
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        if(localStorage.doctors == undefined){
            localStorage.doctors = JSON.stringify(doctorsArray);
        }
        else{
            doctorsArray = JSON.parse(localStorage.doctors);
        }
    } else {
        // Sorry! No Web Storage support..
        alert('Your browser does not support local storage. The minimum version requirement for browsers that support this techonology are as follows: ' +
              'Chrome v4.0 -- Internet Explorer v8.0 -- Firefox v 3.5 -- Safari v4.0 -- Opera v11.5');
    }
}
    
function getAllDoctors(){
    return doctorsArray;
}

function saveDoctor(){

}