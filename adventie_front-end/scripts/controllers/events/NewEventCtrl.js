'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker', 'datetimepicker', 'siyfion.sfTypeahead', 'ngMap'])
// Chart controller
    .controller('NewEventCtrl', ['$scope', '$rootScope', '$sce', '$compile','lookupFilter', 'LanguageService', 'EventsService', '$location', 'ipCookie', 'NgMap',
        function ($scope, $rootScope, $sce, $compile,lookupFilter, LanguageService, EventsService, $location, ipCookie, NgMap) {

            var token = ipCookie('JWT');

            $scope.dropzoneConfig = {
                parallelUploads: 3,
                maxFileSize: 30,
                paramName: "photo",
                headers: {"Authorization": "JWT " + token},
                url: 'http://wain013.com/api/upload/',
                addRemoveLinks: true
            };

            $scope.dropzoneOneFileConfig = {
                parallelUploads: 1,
                maxFileSize: 30,
                paramName: "photo",
                headers: {"Authorization": "JWT " + token},
                url: 'http://wain013.com/api/upload/',
                addRemoveLinks: true,
                maxFiles: 1
            };

            $scope.languages = $rootScope.languages;
            $scope.language = {};
            $scope.selectedOption = [];
            $scope.selectedCategory = [];
            $scope.selectedDays = [];
            $scope.autocomplete = {};
            $scope.autocomplete.types = [{"name": "All", "type": null},
                {"name": "Geodode", "type": "['geocode']"},
                {"name": "Establishment", "type": "['establishment']"},
                {"name": "Address", "type": "['address']"}];
            $scope.autocomplete.type = {};

            $scope.error = {};
            $scope.event = {};
            $scope.tags = [];
            $scope.event.socialMedias = [];
            $scope.event.recurrence = {};
            $scope.event.recurrence.repeat = {};
            $scope.eventOptions = EventsService.getEventsOptions();
            $scope.eventCategories = EventsService.getEventsCategories();
            $scope.event.pin = false;
            $scope.status = true;


            /*-----------------------------------------------*/

            $scope.create = function ($redirect) {


                if ($scope.date.dateStart)
                    $scope.event.startDate = moment($scope.date.dateStart+" "+$scope.date.timeStart).format(); //'MMMM Do YYYY, h:mm:ss a')

                if ($scope.date.dateEnd)
                    $scope.event.endDate = moment($scope.date.dateEnd+" "+$scope.date.timeEnd).format();

                if ($scope.tags)
                    $scope.event.tags = $scope.tags.split(",");

                if ($scope.status)
                    $scope.event.status = "APPROVED";

                if ($scope.instagram) {
                    $scope.event.socialMedias.push({
                        "type": "instagram",
                        "url": "http://www.instagram.com/" + $scope.instagram
                    })
                }

                if ($scope.twitter) {
                    $scope.event.socialMedias.push({
                        "type": "twitter",
                        "url": "http://www.twitter.com/@" + $scope.twitter
                    })
                }

                if ($scope.facebook) {
                    $scope.event.socialMedias.push({
                        "type": "facebook",
                        "url": "http://www.facebook.com/" + $scope.facebook
                    })
                }

                if ($scope.googlePlus) {
                    $scope.event.socialMedias.push({
                        "type": "googlePlus",
                        "url": "http://www.plus.google.com/" + $scope.googlePlus
                    })
                }

                if ($scope.snapchat) {
                    $scope.event.socialMedias.push({
                        "type": "snapchat",
                        "url": "https://www.snapchat.com/add/"+$scope.snapchat
                    })
                }

                if ($scope.website) {
                    $scope.event.socialMedias.push({
                        "type": "website",
                        "url": ""+$scope.website
                    })
                }

                if(!$scope.isRepeated){
                    $scope.event.recurrence.repeat = $scope.selectedDays;
                    $scope.event.recurrence.frequence = "WEEKLY";
                }

                //get cover
                if ($scope.cover.getAcceptedFiles().length > 0) {
                    var coverscovers = angular.fromJson($scope.cover.getAcceptedFiles()[0].xhr.response);
                    if (coverscovers.data.photo) {
                        $scope.event.cover = coverscovers.data.photo;
                    }
                }

                //get cover
                if ($scope.logo.getAcceptedFiles().length > 0) {
                    var coverscovers = angular.fromJson($scope.cover.getAcceptedFiles()[0].xhr.response);
                    if (coverscovers.data.photo) {
                        $scope.event.logo = coverscovers.data.photo;
                    }
                }

                //get images
                var images = $scope.dropzone.getAcceptedFiles();
                var eventimages = [];
                for (var i = 0; i < images.length; i++) {
                    var image = angular.fromJson(images[i].xhr.response);
                    if (image.data.photo) {
                        eventimages.push(image.data.photo);
                    }

                }
                if (eventimages.length > 0)
                    $scope.event.photos = eventimages;


                $scope.event.options = $scope.selectedOption;
                $scope.event.categories = $scope.selectedCategory;


                var hasErrorFlag = false;
                $scope.error.title = {}

                if (!$scope.event.host) {
                    $scope.error.host = "This field is required.";
                    hasErrorFlag = true;
                }

                if (!$scope.event.entranceFee) {
                    $scope.error.entranceFee = "This field is required.";
                    hasErrorFlag = true;
                }

                if (!$scope.event.phone) {
                    $scope.error.phone = "This field is required.";
                    hasErrorFlag = true;
                }

                if (!$scope.event.startDate) {
                    $scope.error.startDate = "This field is required.";
                    hasErrorFlag = true;
                }

                if (!$scope.event.endDate) {
                    $scope.error.endDate = "This field is required.";
                    hasErrorFlag = true;
                }

                if (!$scope.event.title) {
                    $scope.error.title.english = "This field is required.";
                    $scope.error.title.arabic = "This field is required.";
                    hasErrorFlag = true;
                }

                if ($scope.event.title && !$scope.event.title.english) {
                    $scope.error.title.english = "This field is required.";
                    hasErrorFlag = true;
                }

                if ($scope.event.title && !$scope.event.title.arabic) {
                    $scope.error.title.arabic = "This field is required.";
                    hasErrorFlag = true;
                }

                if (!$scope.event.cover) {
                    $scope.error.cover = "This field is required.";
                    hasErrorFlag = true;
                }

                if (!$scope.event.logo) {
                    $scope.error.logo = "This field is required.";
                    hasErrorFlag = true;
                }

                console.log($scope.event);
                if (!hasErrorFlag)
                    var newEvent = EventsService.save($scope.event, function () {
                        $scope.languages = $rootScope.languages;
                        $scope.language = {};
                        $scope.selectedOption = [];
                        $scope.selectedCategory = [];
                        $scope.selectedDays = [];
                        $scope.tags = [];
                        $scope.autocomplete = {};
                        $scope.autocomplete.types = [{"name": "All", "type": null},
                            {"name": "Geodode", "type": "['geocode']"},
                            {"name": "Establishment", "type": "['establishment']"},
                            {"name": "Address", "type": "['address']"}];
                        $scope.autocomplete.type = {};
                        $scope.instagram = "";
                        $scope.twitter = "";
                        $scope.facebook = "";
                        $scope.snapchat = "";
                        $scope.website = "";
                        $scope.googlePlus = "";



                        $scope.error = {};
                        $scope.event = {};
                        $scope.logo.removeAllFiles(true);
                        $scope.cover.removeAllFiles(true);
                        $scope.dropzone.removeAllFiles(true);



                        $('body').pgNotification({
                            style: 'bar',
                            message: "The item has been added successfully!",
                            position: 'top', //'bottom'
                            timeout: 2000,
                            type: 'success'
                        }).show();

                    },
                        function(err){
                            $scope.event = {};

                                console.log(err);
                            $('body').pgNotification({
                                style: 'bar',
                                message: "Couldn't save the event : "+ err.data.message + " :(",
                                position: 'top', //'bottom'
                                timeout: 5000,
                                type: 'error'
                            }).show();
                        });

            };

            $scope.trustAsHtml = function (value) {
                return $sce.trustAsHtml(value);
            };

            $scope.summernote_options = {
                height: 200,
                onfocus: function (e) {
                    $('body').addClass('overlay-disabled');
                },
                onblur: function (e) {
                    $('body').removeClass('overlay-disabled');
                }
            }

            $scope.summernote_options_arabic = {
                height: 200,
                onfocus: function (e) {
                    $('body').addClass('overlay-disabled');
                },
                onblur: function (e) {
                    $('body').removeClass('overlay-disabled');
                },
                direction: 'rtl'
            }

            $scope.showMap = function () {
                $('#myModal').modal('show');

            }
            $scope.zoom = function () {
                NgMap.getMap("pop-map").then(function (map) {
                    map.setZoom(15);
                    console.log(map);
                    google.maps.event.trigger(map, 'resize');
                });
            }
            $("#myModal").on("shown.bs.modal", function () {
                NgMap.getMap("pop-map").then(function (map) {
                    google.maps.event.trigger(map, 'resize')

                });
            });


            /* Google Maps functions
             -----------------------------------------------*/
            var vm = this;
            var markers = [];
            $scope.location = {};

            function getCity(place) {
                var city = $.grep(place.address_components, function (x) {
                    return $.inArray('locality', x.types) != -1;
                });
                if (city.length > 0)
                    if (city[0].short_name)
                        return city[0].short_name;
            }

            function clearMap() {
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
            }

            NgMap.getMap("pop-map").then(function (map) {
                vm.map = map;
            });

            $scope.placeChanged = function () {

                clearMap();

                $scope.place = this.getPlace();
                $scope.location.city = getCity($scope.place);

                vm.map.setCenter($scope.place.geometry.location);

                var marker = new google.maps.Marker({
                    position: $scope.place.geometry.location,
                    map: vm.map,
                    draggable: true
                });

                google.maps.event.addListener(marker, 'dragend', function () {
                        document.getElementById('location.lat').value = marker.position.lat();
                        document.getElementById('location.lng').value = marker.position.lng();
                    }
                );

                markers.push(marker);

                $scope.location.lat = $scope.place.geometry.location.lat();
                $scope.location.lng = $scope.place.geometry.location.lng();

            }


            $scope.$watch('location.lat', function (newLocation, oldLocation, $scope) {

                if (newLocation && markers.length > 0 && $scope.location.lng) {
                    var myLatlng = new google.maps.LatLng(newLocation, markers[0].getPosition().lng());
                    markers[0].setPosition(myLatlng);
                    vm.map.setCenter(myLatlng);
                } else if (newLocation && markers.length == 0 && $scope.location.lng) {
                    var myLatlng = new google.maps.LatLng(newLocation, document.getElementById('location.lng').value);

                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        map: vm.map,
                        draggable: true
                    });
                    google.maps.event.addListener(marker, 'dragend', function () {
                            document.getElementById('location.lat').value = marker.position.lat();
                            document.getElementById('location.lng').value = marker.position.lng();
                        }
                    );
                    markers.push(marker);
                    vm.map.setCenter(myLatlng);
                }
            });

            $scope.$watch('location.lng', function (newLocation, oldLocation, $scope) {

                if (newLocation && markers.length > 0 && $scope.location.lat) {
                    var myLatlng = new google.maps.LatLng(markers[0].getPosition().lat(), newLocation);
                    markers[0].setPosition(myLatlng);
                    vm.map.setCenter(myLatlng);
                } else if (newLocation && markers.length == 0 && $scope.location.lat) {
                    var myLatlng = new google.maps.LatLng(document.getElementById('location.lat').value, newLocation);

                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        map: vm.map,
                        draggable: true
                    });
                    google.maps.event.addListener(marker, 'dragend', function () {
                            document.getElementById('location.lat').value = marker.position.lat();
                            document.getElementById('location.lng').value = marker.position.lng();
                        }
                    );
                    markers.push(marker);
                    vm.map.setCenter(myLatlng);
                }
            });
            $scope.addLoaction = function () {
                $scope.event.location = $scope.location;
                $('#myModal').modal('hide');
            }
            /*-----------------------------------------------*/


            $scope.focus = function (e) {
                $('body').addClass('overlay-disabled');
            };
            $scope.blur = function (e) {
                $('body').removeClass('overlay-disabled');
            };


            // toggle selection for a given fruit by name
            $scope.toggleOption = function toggleOption(option) {

                var idx = lookupFilter($scope.selectedOption, option);

                if (idx > -1) {
                    $scope.selectedOption.splice(idx, 1);
                }
                // is newly selected
                else {
                    $scope.selectedOption.push(option);
                }
            };

            // toggle selection for a given fruit by name
            $scope.toggleCategory = function toggleCategory(option) {

                var idx = lookupFilter($scope.selectedCategory, option);

                if (idx > -1) {
                    $scope.selectedCategory.splice(idx, 1);
                }
                // is newly selected
                else {
                    $scope.selectedCategory.push(option);
                }
            };

            // toggle selection for a given fruit by name
            $scope.toggleDay = function toggleDay(day) {
                var idx = $scope.selectedCategory.indexOf(day);
                // is currently selected
                if (idx > -1) {
                    $scope.selectedDays.splice(idx, 1);
                }
                // is newly selected
                else {
                    $scope.selectedDays.push(day);
                }
            };

        }]);


