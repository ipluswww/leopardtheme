'use strict';

/* Controllers */

var app = angular.module('wain013', ['daterangepicker', 'datetimepicker',])
// Chart controller
    .controller('ArticlesPublishedListCtrl', ['$scope', '$state', '$location', 'ArticleService', 'UserService', 'LanguageService', '$timeout'    ,
        function ($scope, $state, $location, ArticleService, UserService, LanguageService) {


            $scope.articles = null;
            $scope.pending = null;
            $scope.published = null;
            $scope.showEditPanel = false;

            var articles = [];
            var pending = [];
            var published = [];

            // All articles
            var articles = ArticleService.query(function () {
                angular.forEach(articles, function (article) {
                    article.created = new Date(article.createdAt);
                });

                $scope.articles = articles;
            });

            // $scope.sort = 'likes.length';

            $scope.sortArticle=function () {
                if ($scope.Adv == 1) {
                    $scope.sort = 'likes.length';

                }
                else if ($scope.Adv == 2) {
                    $scope.sort = 'likes.length';
                }
                else if ($scope.Adv == 3) {
                    $scope.sort = 'comments.length';
                }
                $scope.articles=[]


            }

            $scope.applyFilters = function () {

                $scope.sortArticle();
                $scope.articles = articles;
                if ($scope.date)
                    if ($scope.date.startDate && $scope.date.endDate) {
                        var retArray = [];

                        angular.forEach($scope.articles, function (obj) {
                            var receivedDate = obj.created;
                            if (receivedDate >= $scope.date.startDate && receivedDate <= $scope.date.endDate) {
                                retArray.push(obj);
                            }
                        });
                        $scope.articles = retArray;
                    }

            };

            $scope.pending = ArticleService.getPending();

            $scope.published = ArticleService.getPublished();

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
            $scope.showItemDetails = function (article) {
                $scope.article = article;
                var dlg = new DialogFx($('#itemDetails').get(0));
                dlg.toggle();
            }
            $scope.showFilters = function () {
                $('#filters').toggleClass('open');
            }

        }]);

