var app = angular.module('angApp', []);

// Get the ng-controller
app.controller('PatientController', function ($scope, $http) {
    $scope.data = [];
    var request = $http.get('/GetPatient');
    request.success(function (data) {
        console.log(data);
        $scope.data = data;
        
    });
    request.error(function (data) {
        console.log('Error: ' + data);
    });
});

