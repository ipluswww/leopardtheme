'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker', 'datetimepicker', 'siyfion.sfTypeahead', 'ngMap'])
// Chart controller
    .controller('NewBusinessCtrl', ['$scope', '$rootScope', '$sce', '$compile', 'LanguageService', 'BusinessService', '$location', 'ipCookie', 'NgMap',
        function ($scope, $rootScope, $sce, $compile, LanguageService, BusinessService, $location, ipCookie, NgMap) {
            $scope.summernote_options_arabic = {
                height: 200,
                onfocus: function(e) {
                    $('body').addClass('overlay-disabled');
                },
                onblur: function(e) {
                    $('body').removeClass('overlay-disabled');
                },
                direction: 'rtl'
            }

            $scope.summernote_options = {
                height: 200,
                onfocus: function (e) {
                    $('body').addClass('overlay-disabled');
                },
                onblur: function (e) {
                    $('body').removeClass('overlay-disabled');
                }
            }

            $scope.emailRE = /^[a-zA-Z]+[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9.]{2,5}$/;
            $scope.phoneRE = /^0+\d{9}$/;

            $scope.languages = $rootScope.languages;
            $scope.language = {};
            $scope.branch = {};
            $scope.error = {};
            $scope.selectedOption = [];
            $scope.selectedCategory = [];
            $scope.autocomplete = {};
            $scope.autocomplete.types = [{"name": "All", "type": null},
                {"name": "Geodode", "type": "['geocode']"},
                {"name": "Establishment", "type": "['establishment']"},
                {"name": "Address", "type": "['address']"}];
            $scope.autocomplete.type = {};
            $scope.business = {
                "branches": [],
                "options": [],
                "categories": []
            };
            $scope.tags;
            $scope.businessOptions = BusinessService.getBusinessesOptions();
            $scope.businessCategories = BusinessService.getBusinessesCategories();



            function publish() {
                $scope.business.status = "PUBLISHED";
                        //$scope.list = BusinessService.query();
                        $('body').pgNotification({
                            style: 'bar',
                            message: "The item has been added successfully!",
                            position: 'top', //'bottom'
                            timeout: 2000,
                            type: 'success'
                        }).show();
            }

            $scope.alertDeletion = function(item){
                $scope.delItem = item;
                $('#deleteModal').modal('show');
            }

            $scope.delete=function(item){
                var index = $scope.business.branches.indexOf(item);
                $scope.business.branches.splice(index, 1);

                $('body').pgNotification({
                    style: 'bar',
                    message: "The branch has been deleted successfully!",
                    position: 'top', //'bottom'
                    timeout: 2500,
                    type: 'success'
                }).show();

                $('#deleteModal').modal('hide');


            }
            $scope.showMap = function () {
                $scope.branch = {};
                $('#myModal').modal('show');

            }

            $("#myModal").on("shown.bs.modal", function () {
                NgMap.getMap("new-branch-map").then(function (map) {
                    vm.map = map;
                    google.maps.event.trigger(map, 'resize')

                });
            });

            $("#editModals").on("shown.bs.modal", function () {
                NgMap.getMap("pop-map").then(function (map) {
                    vm.map = map;
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

                $scope.location.latitude = $scope.place.geometry.location.lat();
                $scope.location.longitude = $scope.place.geometry.location.lng();

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
                $scope.branch.location = $scope.location;
                $('#myModal').modal('hide');
            }
            /*-----------------------------------------------*/
            $scope.business.pin = false;
            $scope.status = true;



            $scope.trustAsHtml = function (value) {
                return $sce.trustAsHtml(value);
            };



            $scope.focus = function (e) {
                $('body').addClass('overlay-disabled');
            };
            $scope.blur = function (e) {
                $('body').removeClass('overlay-disabled');
            };

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


            // toggle selection for a given fruit by name
            $scope.toggleOption = function toggleOption(option) {
                var idx = $scope.selectedOption.indexOf(option);
                // is currently selected
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
                var idx = $scope.selectedCategory.indexOf(option);
                // is currently selected
                if (idx > -1) {
                    $scope.selectedCategory.splice(idx, 1);
                }
                // is newly selected
                else {
                    $scope.selectedCategory.push(option);
                }
            };

            $scope.editModal = function (item,key) {
                $('#editModals').modal('show');
                $scope.branch= item;
            }

            $scope.editBranch = function (item,key) {

                $('#editModals').modal('hide');
            }

           $scope.addBranch= function () {
                $scope.error.phoneNumber = null;
                $scope.error.email = null;
               $scope.addLoaction();

               var hasErrorFlag = false;
               if (!$scope.branch.phoneNumber) {
                   $scope.error.phoneNumber = "This field is required.";
                   hasErrorFlag = true;
               }

               if (!$scope.branch.email) {
                   $scope.error.email = "This field is required.";
                   hasErrorFlag = true;
               }

               if (!$scope.branch.openingHours) {
                   $scope.error.openingHours = "This field is required.";
                   hasErrorFlag = true;
               }

               if(!hasErrorFlag){
                   $scope.business.branches.push($scope.branch);
                    $scope.branch={};
                    console.log($scope.business.branches);
               }

            }

            $scope.create = function ($redirect) {

                if ($scope.tags)
                    $scope.business.tags = $scope.tags.split(",");

                if ($scope.status)
                    $scope.business.status = "APPROVED";

                //get cover
                if ($scope.cover.getAcceptedFiles().length > 0) {
                    var coverscovers = angular.fromJson($scope.cover.getAcceptedFiles()[0].xhr.response);
                    if (coverscovers.data.photo) {
                        $scope.business.cover = coverscovers.data.photo;
                    }
                }
                //get logo
                if ($scope.cover.getAcceptedFiles().length > 0) {
                    var logologos = angular.fromJson($scope.cover.getAcceptedFiles()[0].xhr.response);
                    if (logologos.data.photo) {
                        $scope.business.logo = logologos.data.photo;
                    }
                }

                //get images
                var images = $scope.dropzone.getAcceptedFiles();
                var businessimages = [];
                for (var i = 0; i < images.length; i++) {
                    var image = angular.fromJson(images[i].xhr.response);
                    if (image.data.photo) {
                        businessimages.push(image.data.photo);
                    }

                }
                if (businessimages.length > 0)
                    $scope.business.photos = businessimages;

                //Error Validation
                $scope.error.englishName = null;
                $scope.error.arabicName = null;

                $scope.error.cover = null;
                $scope.error.logo = null;

                var hasErrorFlag = false;

                if (!$scope.business.name || !$scope.business.name.english) {
                    $scope.error.englishName = "This field is required.";
                    hasErrorFlag = true;
                }
                if (!$scope.business.name || !$scope.business.name.arabic) {
                    $scope.error.arabicName = "This field is required.";
                    hasErrorFlag = true;
                }



                if (!$scope.business.cover) {
                    $scope.error.cover = "This field is required.";
                    hasErrorFlag = true;
                }
                if (!$scope.business.logo) {
                    $scope.error.logo = "This field is required.";
                    hasErrorFlag = true;
                }

                $scope.business.socialMedias = [];

                if ($scope.instagram) {
                    $scope.business.socialMedias.push({
                        "type": "instagram",
                        "url": "http://www.instagram.com/" + $scope.instagram
                    })
                }

                if ($scope.twitter) {
                    $scope.business.socialMedias.push({
                        "type": "twitter",
                        "url": "http://www.twitter.com/@" + $scope.twitter
                    })
                }

                if ($scope.facebook) {
                    $scope.business.socialMedias.push({
                        "type": "facebook",
                        "url": "http://www.facebook.com/" + $scope.facebook
                    })
                }

                if ($scope.googlePlus) {
                    $scope.business.socialMedias.push({
                        "type": "googlePlus",
                        "url": "http://www.plus.google.com/" + $scope.googlePlus
                    })
                }

                if ($scope.snapchat) {
                    $scope.business.socialMedias.push({
                        "type": "snapchat",
                        "url": "https://www.snapchat.com/add/"+$scope.snapchat
                    })
                }

                if ($scope.website) {
                    $scope.business.socialMedias.push({
                        "type": "website",
                        "url": ""+$scope.website
                    })
                }



                if (!hasErrorFlag) {
                    $scope.business.options = $scope.selectedOption;

                    $scope.business.categories = $scope.selectedCategory;


                    var newBusiness = BusinessService.save($scope.business, function () {

                        $scope.languages = $rootScope.languages;
                        $scope.language = {};
                        $scope.instagram = "";
                        $scope.twitter = "";
                        $scope.facebook = "";
                        $scope.snapchat = "";
                        $scope.website = "";
                        $scope.googlePlus = "";
                        $scope.branch = {
                            /*     "phoneNumber": 546498763,
                             "email": "info@indielabs.sa",
                             "_id": "5820aebfb533436689252510",
                             "location": {
                             "city": "googlemaps.com/1236",
                             "longitude": "x",
                             "latitude": "latitude"}*/
                        };
                        $scope.error = {};
                        $scope.selectedOption = [];
                        $scope.selectedCategory = [];
                        $scope.business = {
                            /*  "status": "PUBLISHED",
                             "isSponsored": false,
                             "editorPick": false,
                             "tags": [
                             "travel"
                             ],

                             "socialMedias": [
                             {
                             "type": "twitter",
                             "url": "www.twitter.com/@"+ $scope.twitter
                             },

                             {
                             "type": "instagram",
                             "url": "www.instagram.com/"+ $scope.instagram
                             },

                             {
                             "type": "snapchat",
                             "url": "www.snapchat.com/"+ $scope.snapchat
                             },
                             {
                             "type": "facebook",
                             "url": "www.facebook.com/"+ $scope.facebook
                             },
                             {
                             "type": "googlePlus",
                             "url": "www.plus.google.com/"+ $scope.googlePlus
                             }
                             ],

                             "name": {
                             "english": "ada",
                             "arabic": "ss"
                             },
                             */

                            "branches": [],
                            "options": [],
                            "categories": []

                        };
                        $scope.dropzone.removeAllFiles(true);
                        $scope.logo.removeAllFiles(true);
                        $scope.cover.removeAllFiles(true);
                        publish();
                        /*   if ($redirect) {
                         $location.path('/businesses/all');
                         } else {
                         $location.path('/businesses/new');
                         }*/

                    },
                        function(err){
                            console.log(err);

                            $('body').pgNotification({
                                style: 'bar',
                                message: ""+ err.data.message + " :(",
                                position: 'top', //'bottom'
                                timeout: 5000,
                                type: 'error'
                            }).show();
                        });
                }

            };


        }]);


