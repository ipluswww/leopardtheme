'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote'])
    .controller('EmailTemplatesCtrl', ['$scope', 'SettingsService', function($scope, SettingsService) {


    $scope.summernote_options = {
        height: 200,
        onfocus: function(e) {
            $('body').addClass('overlay-disabled');
        },
        onblur: function(e) {
            $('body').removeClass('overlay-disabled');
        },
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link','picture', 'video', 'hr']],
            ['view', ['fullscreen', 'codeview']]
        ],
    }

    $scope.summernote_options_arabic = {
        height: 200,
        onfocus: function(e) {
            $('body').addClass('overlay-disabled');
        },
        onblur: function(e) {
            $('body').removeClass('overlay-disabled');
        },
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link','picture', 'video', 'hr']],
            ['view', ['fullscreen', 'codeview']]
        ],
        direction: 'rtl'
    }

    $scope.template = {};

        $scope.templates = SettingsService.queryTemplates(function (response) {

            angular.forEach(response, function(value, key) {

                switch(value.type){
                    case "NEWUSER":
                        $scope.template.newUser = value;
                        break;
                    case "BUSINESSACCOUNT":
                        $scope.template.businessAccount = value;
                        break;
                    case "RESETPASSWORD":
                        $scope.template.resetPassword = value;
                        break;
                    case "FORGETPASSWORD":
                        $scope.template.forgetPassword = value;
                        break;
                    case "ADDCONTENT":
                        $scope.template.addContent = value;
                        break;
                    case "APPROVECONTENT":
                        $scope.template.approveContent = value;
                        break;
                    case "DELETECONTENT":
                        $scope.template.modifyContent = value;
                        break;
                    case "CONTACTUS":
                        $scope.template.deleteContent = value;
                        break;
                }

            });


        });
        //console.log($scope.eventsOptions);


    $scope.save = function(template){

        SettingsService.saveTemplate({templateId: template._id},template,function (response) {

            $('body').pgNotification({
                    style: 'bar',
                    message: "The template has been saved successfully!",
                    position: 'top', //'bottom'
                    timeout: 3000,
                    type: 'success'
                }).show();
            },
            function(err){
                $('body').pgNotification({
                    style: 'bar',
                    message: "Couldn't save the template :(",
                    position: 'top', //'bottom'
                    timeout: 5000,
                    type: 'error'
                }).show();
            });

    }

    $scope.reset = function(template){
        console.log(template);
        template.template = template.original_template;
        SettingsService.resetTemplate({templateId: template._id},function (response) {

                $('body').pgNotification({
                    style: 'bar',
                    message: "The template has been reseted successfully!",
                    position: 'top', //'bottom'
                    timeout: 3000,
                    type: 'success'
                }).show();
            },
            function(err){
                $('body').pgNotification({
                    style: 'bar',
                    message: "Couldn't reseted the template :(",
                    position: 'top', //'bottom'
                    timeout: 5000,
                    type: 'error'
                }).show();
            });


    }

    $scope.resetAll = function(){
        //SettingsService.resetAll();
    }
        


    }]);

