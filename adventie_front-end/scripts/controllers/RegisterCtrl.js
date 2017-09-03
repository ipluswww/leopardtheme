var RegisterCtrl = function ($scope, $location, $rootScope, AuthService) {

/*
    $scope.email = $rootScope.email;
    $scope.password = $rootScope.password;
    $scope.nationalId = '3241235145';
    $scope.nationalIdType = '1';
    $scope.phone  = '12';

    $scope.register = function () {

        register();

    }

    // Registertion
    function register () {

        var credentials = {
            "userInfo": {
                "password": $scope.password,
                "email": $scope.email,
                "nationalId": $scope.nationalId,
                "nationalIdType": $scope.nationalIdType,
                "phone": $scope.phone
            }
        }

        AuthService.register(credentials, function () {

            $rootScope.email = $scope.email;
            $rootScope.password = $scope.password;

            $location.path('/login');

        }, function () {
            $scope.error = 'Please check the username and the password!';
        });
    }

};
*/


    // TEST
    $scope.email = $rootScope.email;
    $scope.password = $rootScope.password;
    $scope.username = $rootScope.username;
    //$location.path('/dashboard');


    // Auth
    /*AuthService.isAuthenticated(function () {

     $location.path('/dashboard');

     });*/

    // Register
    $scope.register = function () {

        // TEST
        //$location.path('/dashboard');

        var credentials = {
            'email': $scope.email,
            'password': $scope.password,
            'username': $scope.username
        }

        AuthService.register(credentials, function () {
            $rootScope.email = $scope.email;
            $rootScope.password = $scope.password;
         $location.path('/login');
         }, function () {
         $scope.error = 'Please check the username and the password!';
         });

    }
};

module.exports = RegisterCtrl;