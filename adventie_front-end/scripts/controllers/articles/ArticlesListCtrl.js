'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker', 'siyfion.sfTypeahead'])
    .controller('ArticlesListCtrl', ['$scope', '$rootScope', 'ArticleService', '$location', 'ipCookie', '$filter', function($scope, $rootScope, ArticleService, $location, ipCookie, $filter) {
        
        $scope.getData = function () {
            return $filter('filter')($scope.list, $scope.q)
        }
        
        $scope.numberOfPages=function(){
            return Math.ceil($scope.getData().length/1);                
        }
        
        
        
        var token = ipCookie('JWT');
        
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

        $scope.redirect = function(){
            $location.path('/stories/new');
        }
        
        $scope.list = ArticleService.query();
        
        $scope.showModal = function() {
            $('#addNewAppModal').modal('show');
        }
        
        $scope.statusList = ["PUBLISHED","PENDING","BLOCKED"];
        
        $scope.dropzoneOneFileConfig = {
                parallelUploads: 1,
                maxFileSize: 30,
                paramName: "photo",
                headers: {"Authorization": "JWT " + token},
                url: 'http://wain013.com/api/upload/',
                addRemoveLinks: true,
                maxFiles: 1
            };
        
        $scope.editModal = function(item, index) {
            
            $scope.selectedIndex = index;
            $scope.original = angular.copy(item);
            
            $scope.item = item;

            $('#EditModel').modal('show');
        }

        $scope.delete = function(){
            
            $('#myModal').modal('hide');
            ArticleService.remove({id: $scope.delItem._id},function (response) {

                var index = $scope.list.indexOf($scope.delItem);
                $scope.list.splice(index, 1);
                
                $('body').pgNotification({
                        style: 'bar',
                        message: "The item has been deleted successfully!",
                        position: 'top', //'bottom'
                        timeout: 0,
                        type: 'success'
                }).show();
                
            },
            function(err){
                $('body').pgNotification({
                        style: 'bar',
                        message: "Couldn't delete the item :(",
                        position: 'top', //'bottom'
                        timeout: 0,
                        type: 'error'
                }).show();
            })
            
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

            ArticleService.update({id:$scope.item._id}, $scope.item);
            //$scope.newIcon.removeAllFiles();
        }
        
        $scope.dzSuccess = function(file, xhr){
            $scope.item.cover = xhr.data.photo;
            $scope.$apply();
        }

    }])
.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
