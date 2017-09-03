'use strict';

/* Controllers */

angular.module('wain013')
    // Email controller 
    .controller('EmailListCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$window','ContactService', '$sce',
        function($scope, $stateParams, $state, $timeout, $window,ContactService,$sce) {

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
                ],
            }


            $scope.convertTo = function (arr, key) {
                var groups = {};
                for (var i=0;i<arr.length;i++) {
                    arr[i][key] = moment(arr[i][key]).format( "L" );
                    groups[arr[i][key]] = groups[arr[i][key]] || [];
                    groups[arr[i][key]].push(arr[i]);
                }
                return groups;
            };

            ContactService.query(function(response){
                response = response.reverse();

                $scope.emails = $scope.convertTo(response, 'updatedAt');

            });
            $scope.showInbox = function(){
                $timeout(function() {
                    if ($.Pages.isVisibleSm() || $.Pages.isVisibleXs()) {
                        $('.split-list').toggleClass('slideLeft');
                    }
                });
            }

            $scope.delete = function(message){

                ContactService.remove({id: message._id},function (response) {
                        $scope.emailContent = null;
                        $('body').pgNotification({
                            style: 'bar',
                            message: "The message has been deleted successfully!",
                            position: 'top', //'bottom'
                            timeout: 500,
                            type: 'success'
                        }).show();
                    },
                    function(err){
                        console.log(err);
                        $('body').pgNotification({
                            style: 'bar',
                            message: "Couldn't delete the message: "+ err.data.message + " :(",
                            position: 'top', //'bottom'
                            timeout: 5000,
                            type: 'error'
                        }).show();
                    });
            }


            $scope.changeCategory = function(message, category){
                message.category = category;
  
                ContactService.update({id: message._id},message,function (response) {
                        $scope.emailContent = null;
                        $('body').pgNotification({
                            style: 'bar',
                            message: "Done!",
                            position: 'top', //'bottom'
                            timeout: 500,
                            type: 'success'
                        }).show();
                    },
                    function(err){
                        message.category = "removed";
                        $('body').pgNotification({
                            style: 'bar',
                            message: "Couldn't move the message : "+ err.data.message + " :(",
                            position: 'top', //'bottom'
                            timeout: 5000,
                            type: 'error'
                        }).show();
                    });
            }

            $scope.reopen = function(message){
                message.status = "Open";
          
                ContactService.update({id: message._id},message,function (response) {
                        $scope.emailContent = null;
                        $('body').pgNotification({
                            style: 'bar',
                            message: "Done!",
                            position: 'top', //'bottom'
                            timeout: 500,
                            type: 'success'
                        }).show();
                    },
                    function(err){
                        message.category = "removed";
                        $('body').pgNotification({
                            style: 'bar',
                            message: "Couldn't open this issue : "+ err.data.message + " :(",
                            position: 'top', //'bottom'
                            timeout: 5000,
                            type: 'error'
                        }).show();
                    });
            }

            $scope.solved = function(message){
                message.status = "Closed";
       
                ContactService.update({id: message._id},message,function (response) {
                        $scope.emailContent = null;
                        $('body').pgNotification({
                            style: 'bar',
                            message: "Done!",
                            position: 'top', //'bottom'
                            timeout: 3000,
                            type: 'success'
                        }).show();
                    },
                    function(err){
                        message.category = "removed";
                        $('body').pgNotification({
                            style: 'bar',
                            message: "Couldn't close this issue : "+ err.data.message + " :(",
                            position: 'top', //'bottom'
                            timeout: 5000,
                            type: 'error'
                        }).show();
                    });
            }

            $scope.send = function(message,replyMessage){
                console.log($scope.currentUser);
                var msg = ""+replyMessage;
                var reply = {
                    "reply": msg,
                    "user" : $scope.currentUser
                };
                $scope.replyMessage = "";
                message.replies.push(reply);
                ContactService.reply({id: message._id},reply,function (response) {},
                    function(err){

                    console.log(err);

                        $('body').pgNotification({
                            style: 'bar',
                            message: "Couldn't send your message : "+ err.data.message + " :(",
                            position: 'top', //'bottom'
                            timeout: 5000,
                            type: 'error'
                        }).show();
                    });
            };


            $scope.newEmail = {};
            $scope.sendEmail = function(){
                var emailBody = $('.email-body');
                $scope.newEmail.body = emailBody.val();



            };

            $scope.view = function(email) {
                $scope.emailContent = email;
                $scope.replyMessage = "";
                $scope.emailHTML = $sce.trustAsHtml(email.message.body);
                $timeout(function() {
                    if ($.Pages.isVisibleSm() || $.Pages.isVisibleXs()) {
                        $('.split-list').toggleClass('slideLeft');
                    }
                });
            };


        }
    ])



/* Directives */

angular.module('wain013')
    .directive('emailComposer', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                // Email composer
                var emailComposerToolbarTemplate = {
                    "font-styles": function(locale) {
                        return '<li class="dropdown">' + '<a data-toggle="dropdown" class="btn btn-default dropdown-toggle ">' + '<span class="editor-icon editor-icon-headline"></span>' + '<span class="current-font">Normal</span>' + '<b class="caret"></b>' + '</a>' + '<ul class="dropdown-menu">' + '<li><a tabindex="-1" data-wysihtml5-command-value="p" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">Normal</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h1" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">1</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h2" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">2</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h3" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">3</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h4" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">4</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h5" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">5</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h6" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">6</a></li>' + '</ul>' + '</li>';
                    },
                    emphasis: function(locale) {
                        return '<li>' + '<div class="btn-group">' + '<a tabindex="-1" title="CTRL+B" data-wysihtml5-command="bold" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-bold"></i></a>' + '<a tabindex="-1" title="CTRL+I" data-wysihtml5-command="italic" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-italic"></i></a>' + '<a tabindex="-1" title="CTRL+U" data-wysihtml5-command="underline" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-underline"></i></a>' + '</div>' + '</li>';
                    },
                    blockquote: function(locale) {
                        return '<li>' + '<a tabindex="-1" data-wysihtml5-display-format-name="false" data-wysihtml5-command-value="blockquote" data-wysihtml5-command="formatBlock" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-quote"></i>' + '</a>' + '</li>'
                    },
                    lists: function(locale) {
                        return '<li>' + '<div class="btn-group">' + '<a tabindex="-1" title="Unordered list" data-wysihtml5-command="insertUnorderedList" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-ul"></i></a>' + '<a tabindex="-1" title="Ordered list" data-wysihtml5-command="insertOrderedList" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-ol"></i></a>' + '<a tabindex="-1" title="Outdent" data-wysihtml5-command="Outdent" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-outdent"></i></a>' + '<a tabindex="-1" title="Indent" data-wysihtml5-command="Indent" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-indent"></i></a>' + '</div>' + '</li>'
                    },
                    image: function(locale) {
                        return '<li>' + '<div class="bootstrap-wysihtml5-insert-image-modal modal fade">' + '<div class="modal-dialog ">' + '<div class="modal-content">' + '<div class="modal-header">' + '<a data-dismiss="modal" class="close">×</a>' + '<h3>Insert image</h3>' + '</div>' + '<div class="modal-body">' + '<input class="bootstrap-wysihtml5-insert-image-url form-control" value="http://">' + '</div>' + '<div class="modal-footer">' + '<a data-dismiss="modal" class="btn btn-default">Cancel</a>' + '<a data-dismiss="modal" class="btn btn-primary">Insert image</a>' + '</div>' + '</div>' + '</div>' + '</div>' + '<a tabindex="-1" title="Insert image" data-wysihtml5-command="insertImage" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-image"></i>' + '</a>' + '</li>'
                    },
                    link: function(locale) {
                        return '<li>' + '<div class="bootstrap-wysihtml5-insert-link-modal modal fade">' + '<div class="modal-dialog ">' + '<div class="modal-content">' + '<div class="modal-header">' + '<a data-dismiss="modal" class="close">×</a>' + '<h3>Insert link</h3>' + '</div>' + '<div class="modal-body">' + '<input class="bootstrap-wysihtml5-insert-link-url form-control" value="http://">' + '<label class="checkbox"> <input type="checkbox" checked="" class="bootstrap-wysihtml5-insert-link-target">Open link in new window</label>' + '</div>' + '<div class="modal-footer">' + '<a data-dismiss="modal" class="btn btn-default">Cancel</a>' + '<a data-dismiss="modal" class="btn btn-primary" href="">Insert link</a>' + '</div>' + '</div>' + '</div>' + '</div>' + '<a tabindex="-1" title="Insert link" data-wysihtml5-command="createLink" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-link"></i>' + '</a>' + '</li>'
                    },
                    html: function(locale) {
                        return '<li>' + '<div class="btn-group">' + '<a tabindex="-1" title="Edit HTML" data-wysihtml5-action="change_view" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-html"></i>' + '</a>' + '</div>' + '</li>'
                    }
                }

                setTimeout(function() {
                    var emailBody = $(element).find('.email-body');
                    emailBody.length && emailBody.wysihtml5({
                        html: true,
                        stylesheets: ["pages/css/editor.css"],
                        customTemplates: emailComposerToolbarTemplate
                    });

                    $(element).find('.wysihtml5-toolbar').appendTo('.email-toolbar-wrapper');
                }, 500);
            }
        }
    })

.directive('replyEditor', function() {
    // Wysiwyg editor custom options

    var editorTemplate = {
        "font-styles": function(locale) {
            return '<li class="dropdown dropup">' + '<a data-toggle="dropdown" class="btn btn-default dropdown-toggle ">    <span class="glyphicon glyphicon-font"></span>    <span class="current-font">Normal text</span>    <b class="caret"></b>  </a>' + '<ul class="dropdown-menu">    <li><a tabindex="-1" data-wysihtml5-command-value="p" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">Normal text</a></li>     <li><a tabindex="-1" data-wysihtml5-command-value="h1" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">Heading 1</a></li>    <li><a tabindex="-1" data-wysihtml5-command-value="h2" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">Heading 2</a></li>    <li><a tabindex="-1" data-wysihtml5-command-value="h3" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">Heading 3</a></li>    <li><a tabindex="-1" data-wysihtml5-command-value="h4" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">Heading 4</a></li>    <li><a tabindex="-1" data-wysihtml5-command-value="h5" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">Heading 5</a></li>    <li><a tabindex="-1" data-wysihtml5-command-value="h6" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">Heading 6</a></li>  </ul>' + '</li>';
        },
        emphasis: function(locale) {
            return '<li>' + '<div class="btn-group">' + '<a tabindex="-1" title="CTRL+B" data-wysihtml5-command="bold" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-bold"></i></a>' + '<a tabindex="-1" title="CTRL+I" data-wysihtml5-command="italic" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-italic"></i></a>' + '<a tabindex="-1" title="CTRL+U" data-wysihtml5-command="underline" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-underline"></i></a>' + '</div>' + '</li>';
        },
        blockquote: function(locale) {
            return '<li>' + '<a tabindex="-1" data-wysihtml5-display-format-name="false" data-wysihtml5-command-value="blockquote" data-wysihtml5-command="formatBlock" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-quote"></i>' + '</a>' + '</li>'
        },
        lists: function(locale) {
            return '<li>' + '<div class="btn-group">' + '<a tabindex="-1" title="Unordered list" data-wysihtml5-command="insertUnorderedList" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-ul"></i></a>' + '<a tabindex="-1" title="Ordered list" data-wysihtml5-command="insertOrderedList" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-ol"></i></a>' + '<a tabindex="-1" title="Outdent" data-wysihtml5-command="Outdent" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-outdent"></i></a>' + '<a tabindex="-1" title="Indent" data-wysihtml5-command="Indent" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-indent"></i></a>' + '</div>' + '</li>'
        },
        image: function(locale) {
            return '<li>' + '<div class="bootstrap-wysihtml5-insert-image-modal modal fade">' + '<div class="modal-dialog ">' + '<div class="modal-content">' + '<div class="modal-header">' + '<a data-dismiss="modal" class="close">×</a>' + '<h3>Insert image</h3>' + '</div>' + '<div class="modal-body">' + '<input class="bootstrap-wysihtml5-insert-image-url form-control" value="http://">' + '</div>' + '<div class="modal-footer">' + '<a data-dismiss="modal" class="btn btn-default">Cancel</a>' + '<a data-dismiss="modal" class="btn btn-primary">Insert image</a>' + '</div>' + '</div>' + '</div>' + '</div>' + '<a tabindex="-1" title="Insert image" data-wysihtml5-command="insertImage" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-image"></i>' + '</a>' + '</li>'
        },
        link: function(locale) {
            return '<li>' + '<div class="bootstrap-wysihtml5-insert-link-modal modal fade">' + '<div class="modal-dialog ">' + '<div class="modal-content">' + '<div class="modal-header">' + '<a data-dismiss="modal" class="close">×</a>' + '<h3>Insert link</h3>' + '</div>' + '<div class="modal-body">' + '<input class="bootstrap-wysihtml5-insert-link-url form-control" value="http://">' + '<div class="checkbox check-success"> <input type="checkbox" class="bootstrap-wysihtml5-insert-link-target" checked="checked" value="1" id="link-checkbox"> <label for="link-checkbox">Open link in new window</label></div>' + '</div>' + '<div class="modal-footer">' + '<a data-dismiss="modal" class="btn btn-default">Cancel</a>' + '<a data-dismiss="modal" class="btn btn-primary" href="">Insert link</a>' + '</div>' + '</div>' + '</div>' + '</div>' + '<a tabindex="-1" title="Insert link" data-wysihtml5-command="createLink" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-link"></i>' + '</a>' + '</li>'
        }
    }

    var editorOptions = {
        "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
        "emphasis": true, //Italics, bold, etc. Default true
        "lists": false, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
        "html": false, //Button which allows you to edit the generated HTML. Default false
        "link": true, //Button to insert a link. Default true
        "image": true, //Button to insert an image. Default true,
        "color": false, //Button to change color of font  
        "blockquote": true, //Blockquote  
        stylesheets: ["pages/css/editor.css"],
        customTemplates: editorTemplate
    };

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            !$(element).data('wysihtml5') && $(element).wysihtml5(editorOptions);
        }
    }
});