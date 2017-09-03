'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker', 'siyfion.sfTypeahead'])
    // Chart controller 
    .controller('NewStoryCtrl', ['$scope', '$rootScope', '$sce', '$compile', 'LanguageService', 'ArticleService', '$location','ipCookie',
                                 function($scope, $rootScope, $sce, $compile, LanguageService, ArticleService, $location,ipCookie) {
        
        $scope.languages = $rootScope.languages;
        $scope.language = {};
        
        $scope.error = {};
        $scope.story = {};
        $scope.tags;
        
        $scope.story.pin = false;
        $scope.status = true;
                                     
                                     
        $scope.trustAsHtml = function(value) {
            return $sce.trustAsHtml(value);
        };

        $scope.summernote_options = {
            height: 200,
            direction: 'rtl',
            onfocus: function(e) {
                $('body').addClass('overlay-disabled');
            },
            onblur: function(e) {
                $('body').removeClass('overlay-disabled');
            }
        }

        $scope.focus = function(e) {
            $('body').addClass('overlay-disabled');
        };
        $scope.blur = function(e) {
            $('body').removeClass('overlay-disabled');
        };

        var token = ipCookie('JWT');

        $scope.dropzoneConfig = {
                parallelUploads: 3,
                maxFileSize: 30,
                paramName: "photo",
                headers: { "Authorization": "JWT " + token },
                url: 'http://wain013.com/api/upload/',
                addRemoveLinks: true
        };

        $scope.dropzoneOneFileConfig = {
                parallelUploads: 1,
                maxFileSize: 30,
                paramName: "photo",
                headers: { "Authorization": "JWT " + token },
                url: 'http://wain013.com/api/upload/',
                addRemoveLinks: true,
                maxFiles: 1
        };  
                                     

        
    $scope.create = function ($redirect) {

        if($scope.tags)
        $scope.story.tags = $scope.tags.split(",");
        
        if($scope.status)
        $scope.story.status = "PUBLISHED";

        if($scope.pin)
            $scope.story.editorPick = true;

        //get cover
        if($scope.cover.getAcceptedFiles().length > 0){
            var coverscovers = angular.fromJson($scope.cover.getAcceptedFiles()[0].xhr.response);
            if(coverscovers.data.photo){
                $scope.story.cover = coverscovers.data.photo;
            } 
        }
        
        //get images
        var images = $scope.dropzone.getAcceptedFiles();
        var storyimages = [];
        for(var i = 0; i < images.length; i++){
            var image = angular.fromJson(images[i].xhr.response);
            if(image.data.photo){
                storyimages.push(image.data.photo);
            } 
            
        }
        if(storyimages.length >0)
        $scope.story.photos = storyimages;
        
        //Error Validation
        $scope.error.title = null;
        $scope.error.body = null;
        $scope.error.cover = null;
        var hasErrorFlag = false;
        
        if(!$scope.story.title){
            $scope.error.title = "This field is required.";
            hasErrorFlag = true;
        }

        if(!$scope.story.body){
            $scope.error.body = "This field is required.";
            hasErrorFlag = true;
        }

        if(!$scope.story.cover){
            $scope.error.cover = "This field is required.";
            hasErrorFlag = true;
        }

        if(!hasErrorFlag)
         var newArticle = ArticleService.save($scope.story, function () {
             console.log(newArticle);

            if($redirect){
                $location.path('/stories/all');
            }else{
                $location.path('/stories/new');
            }
             
        }, function(err){
            console.log(err);
            $('body').pgNotification({
                style: 'bar',
                message: ""+ err.data.message + " :(",
                position: 'top', //'bottom'
                timeout: 5000,
                type: 'error'
            }).show();
        });


    };



    }]);


