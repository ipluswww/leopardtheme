'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker', 'siyfion.sfTypeahead'])
    .controller('EventsCategoriesCtrl', ['$scope', 'EventsService','ipCookie', function($scope, EventsService,ipCookie) {


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




        $scope.eventsOptions = EventsService.getEventsCategories();/*function(response){
            $scope.selected = response[0];
        });*/
        
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
        
        var defaultColor = "#6d5cae";
        $scope.icon;
        $scope.addColor = defaultColor;
        
        
        
        
        $scope.add = function(){

            if($scope.icon.getAcceptedFiles().length > 0){
                var iconcovers = angular.fromJson($scope.icon.getAcceptedFiles()[0].xhr.response);
                if(iconcovers.photo){
                    $scope.iconPhoto = iconcovers.photo;
                } 
            }
            
            var item = {
                name:{
                    arabic: $scope.addArabicCategory,
                    english: $scope.addEnglishCategory
                },
                color: $scope.addColor,
                icon: $scope.iconPhoto
            }

            if($scope.addItem.selected){
                    item.parent=$scope.addItem.selected;
            }
            
            
            EventsService.addEventsCategory(item,function () {
                $scope.eventsOptions = EventsService.getEventsCategories();
                $('#addNewAppModal').modal('hide');
                
                //Reset The From
                $scope.addArabicCategory = "";
                $scope.addEnglishCategory = "";
                $scope.addColor = defaultColor;
                $scope.addItem.selected = null;
                console.log($scope.icon);
                $scope.icon.removeAllFiles();
                
            });
        }
        
        
        
        
        $scope.delete = function(item){
            EventsService.removeEventsCategory({categoryId: item._id},function (response) {
                
                var index = $scope.eventsOptions.indexOf(item);
                $scope.eventsOptions.splice(index, 1);
                
                if(!response._id){
                    $scope.eventsOptions = EventsService.getEventsCategories();
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
            
            EventsService.updateEventsCategory({categoryId: $scope.item._id},$scope.item,function (response) {
                if(!response.ok){
                    $scope.eventsOptions = EventsService.getEventsCategories();
                }
            })
            
            $scope.newIcon.removeAllFiles();
        }
        
        $scope.dzSuccess = function(file, xhr){
            console.log($scope.selectedIndex);
            $scope.item.icon = xhr.data.photo;
            $scope.$apply();
        }


    }]);
