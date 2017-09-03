'use strict';

/* Controllers */

angular.module('wain013', ['daterangepicker', 'datetimepicker',])
// Chart controller
    .controller('ArticlesListCtrl', ['$scope', '$state', '$location', 'ArticleService', 'EventsService', 'UserService', 'LanguageService',
        function ($scope, $state, $location, ArticleService, EventsService, UserService, LanguageService) {


            $scope.events = null;
            $scope.pending = null;
            $scope.published = null;
            $scope.showEditPanel = false;

            var articles = [];
            var pending = [];
            var published = [];

            // All articles
            var events = EventsService.query(function () {
                    angular.forEach(events, function (events) {
                        events.created = new Date(events.createdAt);
                    });

                    $scope.events = events;
                }
            );



            // fetch the logged in user
            var loggedInUser = UserService.getUser();

            // language filter
            $scope.myLanguage = function (item) {
                $scope.myLanguageV = item;
            };

            // maximize the body text to 60 char
            $scope.ellipsis = function (str) {
                if (str.length <= 60) {
                    return str;
                }
                return str.substring(0, 60) + "...";

            };


            $scope.sortArticle = function () {
                if ($scope.Adv == 1) {
                    $scope.sort = 'attendants.length';

                }
                else if ($scope.Adv == 2) {
                    $scope.sort = 'ratings.length';
                }
                else if ($scope.Adv == 3) {
                    $scope.sort = 'entranceFee';
                }
                $scope.events = []


            }

            $scope.applyFilters = function () {

                $scope.sortArticle();
    
                $scope.events = events;
                if ($scope.date)
                    if ($scope.date.startDate && $scope.date.endDate) {
                        var retArray = [];

                        angular.forEach($scope.events, function (obj) {
                            var receivedDate = obj.created;
                            if (receivedDate >= $scope.date.startDate && receivedDate <= $scope.date.endDate) {
                                retArray.push(obj);
                            }
                        });

                        $scope.events = retArray;
                    }

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

            $scope.init = function () {
                $('.item-slideshow > div').each(function () {
                    var img = $(this).data('image');
                    $(this).css({
                        'background-image': 'url(' + img + ')',
                        'background-size': 'cover'
                    })
                });

            }
            $scope.showItemDetails = function (event) {
                $scope.article = event;
                var dlg = new DialogFx($('#itemDetails').get(0));
                dlg.toggle();
            }
            $scope.showFilters = function () {
                $('#filters').toggleClass('open');
            }

        }]);

