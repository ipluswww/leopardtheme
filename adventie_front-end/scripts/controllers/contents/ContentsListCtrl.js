'use strict';

/* Controllers */

angular.module('wain013')
    // Chart controller 
    .controller('ContentsListCtrl', ['$scope', '$state', '$location', 'ContentService', 'UserService', 'LanguageService',
                                     function($scope, $state, $location, ContentService, UserService, LanguageService) {

    $scope.articles = null;
    $scope.pending = null;
    $scope.published = null;
    $scope.showEditPanel = false;

    var articles = [];
    var pending = [];
    var published = [];

    // All articles
    $scope.articles = ContentService.query();

    $scope.pending = ContentService.getPending();

    $scope.published = ContentService.getPublished();

    // fetch the logged in user
    var loggedInUser = UserService.getUser();


    // language filter
    $scope.myLanguage = function (item) {
        $scope.myLanguageV = item;
    };
    
    // maximize the body text to 60 char
    $scope.ellipsis = function(str) {
        if (str.length <= 60) {
            return str;
        }
        return str.substring(0, 60) + "...";

    };




    var languages = LanguageService.query();
    $scope.languages = languages;



/*      var ctrl;
      ctrl = this;
      ctrl.members = []
 
      ctrl.carouselInitializer = function() {
          console.log("GOT YA");
        $(".item-slideshow").owlCarousel({
          items: 1,
          navigation: true,
          pagination: false,
          navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
      };*/

        $scope.init = function() {
            $('.item-slideshow > div').each(function() {
                var img = $(this).data('image');
                $(this).css({
                    'background-image': 'url(' + img + ')',
                    'background-size': 'cover'
                })
            });
            
        }
        $scope.showItemDetails = function(article) {
            $scope.article = article;
            var dlg = new DialogFx($('#itemDetails').get(0));
            dlg.toggle();
        }
        $scope.showFilters = function() {
            $('#filters').toggleClass('open');
        }

    }]);

