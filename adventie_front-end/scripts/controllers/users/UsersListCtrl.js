'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker'])
    .controller('UsersListCtrl', ['$scope', 'BusinessService', 'UserService', 'ipCookie', '$rootScope', '$http', function($scope, BusinessService, UserService,ipCookie,$rootScope, $http) {


        var token = ipCookie('JWT');

        $scope.dropzoneOneFileConfig = {
            parallelUploads: 1,
            maxFileSize: 30,
            paramName: "photo",
            headers: { "Authorization": "JWT " + token },
            url: 'http://wain013.com/api/upload/',
            addRemoveLinks: true,
            maxFiles: 1
        };


        $scope.languages = $rootScope.languages;
        $scope.userTypes = ["User","Business User"];
        $scope.subscriptions = ["Free","Premium","Premium Plus"];
        $scope.statusList = ["ACTIVE","PENDING","BLOCKED"];


        $scope.new = {};
        $scope.new.language = $scope.languages[0];
        $scope.new.subscription = $scope.subscriptions[0];
        $scope.new.userType = $scope.userTypes[0];
        $scope.new.status = $scope.statusList[0];

        /* --- Quick fix --- */
        //$scope.eventsOptions = UserService.query();
        $http.get('http://wain013.com/api/user/all')
            .then(function (res) {
                $scope.eventsOptions = res.data;
            }, function (res) {
        });
        /* --- END Quick fix --- */
        $scope.showModal = function() {
            $('#addNewAppModal').modal('show');
        }
        $scope.editModal = function(item, index) {
            $scope.selectedIndex = index;
            $scope.original = angular.copy(item);
            $scope.item = item;
            $('#EditModel').modal('show');
        }
        $scope.checkEmail = function() {
            console.log($scope.new.email);
            //alert("sdf");
            $scope.emailAvailablity = ($scope.new.email=="Khaleel");
        }
        $scope.checkUsername = function() {
            console.log($scope.new.username);
            $scope.usernameAvailablity = ($scope.new.username=="Khaleel");
        }
        $scope.add = function(){
            if($scope.avatar.getAcceptedFiles().length > 0){
                var avatarcovers = angular.fromJson($scope.avatar.getAcceptedFiles()[0].xhr.response);
                if(avatarcovers.data.photo){
                    $scope.new.avatar = avatarcovers.data.photo;
                }
            }
            console.log($scope.new);
            UserService.register($scope.new,function () {
                    $scope.eventsOptions = UserService.query();
                    $('#addNewAppModal').modal('hide');
                    $scope.newAvatar.removeAllFiles();
                    $scope.new = {};
                },
                function(err){
                    console.log(err);
                    $('body').pgNotification({
                        style: 'bar',
                        message: ""+ err.data.message + " :(",
                        position: 'top', //'bottom'
                        timeout: 5000,
                        type: 'error'
                }).show();
            });
        }
        $scope.delete = function(item){
            console.log(item._id);
            UserService.remove({id: item._id},function (response) {

                var index = $scope.eventsOptions.indexOf(item);
                $scope.eventsOptions.splice(index, 1);

                if(!response._id){
                    $scope.eventsOptions = UserService.query();
                }

            });
        }
        $scope.reset = function(item){
            console.log(item._id);
            UserService.reset({id: item._id},function (response) {

                if(!response._id){
                    $scope.eventsOptions = UserService.query();
                }

            });
        }
        $scope.revert = function(){
            $scope.eventsOptions[$scope.selectedIndex] = $scope.original;
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }
        }
        $scope.save = function(item){
            $('#EditModel').modal('hide');
            console.log($scope.item);
            UserService.update({id: $scope.item._id},$scope.item,function (response) {
                if(!response.ok){
                    $scope.eventsOptions = UserService.query();
                }
            })
            $scope.newAvatar.removeAllFiles();
        }
        $scope.dzSuccess = function(file, xhr){
            console.log($scope.selectedIndex);
            $scope.item.avatar = xhr.data.photo;
            $scope.$apply();
        }
    }]);
