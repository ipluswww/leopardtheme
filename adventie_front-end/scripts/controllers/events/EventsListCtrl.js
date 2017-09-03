'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker', 'siyfion.sfTypeahead'])
    .controller('EventsListCtrl', ['$scope', '$rootScope', 'EventsService', '$location', function($scope, $rootScope, EventsService, $location) {

        $scope.languages = $rootScope.languages;

        $scope.summernote_options = {
            height: 200,
            onfocus: function(e) {
                $('body').addClass('overlay-disabled');
            },
            onblur: function(e) {
                $('body').removeClass('overlay-disabled');
            }
        }

        $scope.list = EventsService.query();
        
        $scope.redirect = function(){
            $location.path('/events/new');
        }

        $scope.edit = function(item) {
            $rootScope.temp_event = item;
            $location.path('/events/edit/'+item._id);
/*            $scope.selectedIndex = index;
            $scope.original = angular.copy(item);
            console.log($scope.original);
            $scope.item = item;
            $('#EditModel').modal('show');*/

        }

        $scope.delete = function(){
            
            $('#myModal').modal('hide');
            EventsService.remove({id: $scope.delItem._id},function (response) {

                var index = $scope.list.indexOf($scope.delItem);
                $scope.list.splice(index, 1);
                
                $('body').pgNotification({
                        style: 'bar',
                        message: "The item has been deleted successfully!",
                        position: 'top', //'bottom'
                        timeout: 500,
                        type: 'success'
                }).show();
                
            },
                function(err){
                    console.log(err);
                    $('body').pgNotification({
                        style: 'bar',
                        message: "Couldn't delete the item : "+ err.data.message + " :(",
                        position: 'top', //'bottom'
                        timeout: 5000,
                        type: 'error'
                    }).show();
                });
            
        }

        $scope.alert = function(item){
            $scope.delItem = item;
            $('#myModal').modal('show');
        }


        $scope.revert = function(){
            $scope.list[$scope.selectedIndex] = $scope.original;
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }
        }

        $scope.save = function(item){
            $('#EditModel').modal('hide');

            EventsService.updateEventsCategory({categoryId: $scope.item._id},$scope.item,function (response) {
                if(!response.ok){
                    $scope.list = EventsService.query();
                }
            })
            //$scope.newIcon.removeAllFiles();
        }
        
        $scope.dzSuccess = function(file, xhr){
            console.log($scope.selectedIndex);
            $scope.item.icon = xhr.data.photo;
            $scope.$apply();
        }


    }]);
