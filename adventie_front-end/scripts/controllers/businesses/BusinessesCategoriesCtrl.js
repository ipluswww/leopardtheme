'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker', 'siyfion.sfTypeahead'])
    .controller('BusinessesCategoriesCtrl', ['$scope', 'BusinessService','ipCookie', function($scope, BusinessService,ipCookie) {


        $scope.businessCategories = BusinessService.getBusinessesCategories();


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

        var defaultColor = "#6d5cae";
        $scope.icon;
        $scope.addColor = defaultColor;




        $scope.add = function(){

            if($scope.background.getAcceptedFiles().length > 0){
                var iconcovers = angular.fromJson($scope.background.getAcceptedFiles()[0].xhr.response);
                if(iconcovers.data.photo){
                    $scope.backgroundPhoto = iconcovers.data.photo;
                }
            }

            if($scope.icon.getAcceptedFiles().length > 0){
                var iconcovers = angular.fromJson($scope.icon.getAcceptedFiles()[0].xhr.response);
                if(iconcovers.data.photo){
                    $scope.iconPhoto = iconcovers.data.photo;
                }
            }

            var item = {
                name:{
                    arabic: $scope.addArabicCategory,
                    english: $scope.addEnglishCategory
                },
                color: $scope.addColor,
                icon: $scope.iconPhoto,
                background: $scope.backgroundPhoto
            }

            if($scope.addItem.selected){
                item.parent=$scope.addItem.selected;
            }


            BusinessService.addBusinessesCategory(item,function () {
                    $scope.businessCategories = BusinessService.getBusinessesCategories();
                    $('#addNewAppModal').modal('hide');

                    //Reset The From
                    $scope.addArabicCategory = "";
                    $scope.addEnglishCategory = "";
                    $scope.addColor = defaultColor;
                    $scope.addItem.selected = null;
                    console.log($scope.icon);
                    $scope.icon.removeAllFiles();
                    $scope.background.removeAllFiles();

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
            BusinessService.removeBusinessesCategory({categoryId: item._id},function (response) {

                    var index = $scope.businessCategories.indexOf(item);
                    $scope.businessCategories.splice(index, 1);

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


        $scope.revert = function(){
            $scope.businessCategories[$scope.selectedIndex] = $scope.original;
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }
        }

        $scope.save = function(){
            $('#EditModel').modal('hide');

            BusinessService.updateBusinessesCategory({categoryId: $scope.item._id},$scope.item,function (response) {

                    //$scope.businessCategories = BusinessService.getBusinessesCategories();

                },
                function(err){
                    console.log(err);
                    $scope.revert();
                    $('body').pgNotification({
                        style: 'bar',
                        message: ""+ err.data.message + " :(",
                        position: 'top', //'bottom'
                        timeout: 5000,
                        type: 'error'
                    }).show();
                });

            $scope.newIcon.removeAllFiles();
            $scope.newBackground.removeAllFiles();
        }

        $scope.dzSuccess = function(file, xhr){
            console.log($scope.selectedIndex);
            $scope.item.icon = xhr.data.photo;
            $scope.$apply();
        }

        $scope.dzSuccessB = function(file, xhr){
            console.log($scope.selectedIndex);
            $scope.item.background = xhr.data.photo;
            $scope.$apply();
        }


        $scope.showModal = function() {
            $('#addNewAppModal').modal('show');
        }

        $scope.editModal = function(item, index) {

            $scope.selectedIndex = index;
            $scope.original = angular.copy(item);
            console.log($scope.original);
            $scope.item = item;
            $('#EditModel').modal('show');

        }

    }]);
