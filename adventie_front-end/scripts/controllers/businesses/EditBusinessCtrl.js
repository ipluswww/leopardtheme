'use strict';

/* Controllers */

angular.module('wain013', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker', 'datetimepicker', 'siyfion.sfTypeahead', 'ngMap'])
// Chart controller
    .controller('EditBusinessCtrl', ['$scope', '$rootScope', '$sce', '$compile', 'LanguageService', 'BusinessService', '$location', 'ipCookie', 'NgMap',
        function ($scope, $rootScope, $sce, $compile, LanguageService, BusinessService, $location, ipCookie, NgMap) {
            
            // GET: Business
            $scope.business = $rootScope.temp_event;

            $scope.languages = $rootScope.languages;
            $scope.language = {};
            
            // Social Media (REMOVE url keep username only)
            
            
            
            var socialMedias = [{twitter: '', url: ''}, {instagram: '', url: ''}, {snapchat: '',url: ''}, {facebook: '', url: ''}, {googlePlus: '', url: ''}]
            
            $scope.business.socialMedias.push(socialMedias);
            
            //$scope.twitter = $scope.business.socialMedias[0].url.replace('http://www.twitter.com/@', '');
            //$scope.instagram = $scope.business.socialMedias[1].url.replace('http://www.instagram.com/', '');
            //$scope.snapchat = $scope.business.socialMedias[2].url.replace('http://www.snapchat.com/', '');
            //$scope.facebook = $scope.business.socialMedias[3].url.replace('http://www.facebook.com/', '');
            //$scope.googlePlus = $scope.business.socialMedias[4].url.replace('http://www.plus.google.com/', '');
            //$scope.website = $scope.business.website;
            
            //  
            if ( $scope.business.status == 'PUBLISHED' ) { $scope.status = true } else { $scope.status = false };
            
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
            $scope.autocomplete = {};
            $scope.autocomplete.types = [{"name": "All", "type": null},
                {"name": "Geodode", "type": "['geocode']"},
                {"name": "Establishment", "type": "['establishment']"},
                {"name": "Address", "type": "['address']"}];
            $scope.autocomplete.type = {};
            /*$scope.business = {
                  "status": "PUBLISHED",
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
                 

                "branches": [


            ],
                "options": [],
                "categories": []

            };*/
            $scope.tags;
            $scope.businessOptions = BusinessService.getBusinessesOptions();
            $scope.businessCategories = BusinessService.getBusinessesCategories();

            
            
            $scope.beforeRender = function ($view, $dates, $leftDate, $upDate, $rightDate) {
                var index = Math.floor(Math.random() * $dates.length);
                $dates[index].selectable = false;
            }

            /* Bindable functions
             -----------------------------------------------*/
            $scope.endDateBeforeRender = endDateBeforeRender
            $scope.endDateOnSetTime = endDateOnSetTime
            $scope.startDateBeforeRender = startDateBeforeRender
            $scope.startDateOnSetTime = startDateOnSetTime

            function startDateOnSetTime() {
                $scope.$broadcast('start-date-changed');
            }

            function endDateOnSetTime() {
                $scope.$broadcast('end-date-changed');
            }

            function startDateBeforeRender($dates) {
                if ($scope.dateRangeEnd) {
                    var activeDate = moment($scope.dateRangeEnd);

                    $dates.filter(function (date) {
                        return date.localDateValue() >= activeDate.valueOf()
                    }).forEach(function (date) {
                        date.selectable = false;
                    })
                }
            }

            function endDateBeforeRender($view, $dates) {
                if ($scope.dateRangeStart) {
                    var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute');

                    $dates.filter(function (date) {
                        return date.localDateValue() <= activeDate.valueOf()
                    }).forEach(function (date) {
                        date.selectable = false;
                    })
                }
            }

            function publish() {
                $scope.business.status = "PUBLISHED";
                        $scope.list = BusinessService.query();
                        $('body').pgNotification({
                            style: 'bar',
                            message: "The item has been updated successfully!",
                            position: 'top', //'bottom'
                            timeout: 2000,
                            type: 'success'
                        }).show();


            }

            $scope.alertDeletion = function(item){
                $scope.delItem = item;
                $('#deleteModal').modal('show');
            }
            
            $scope.removeImg = function (index) {
                $scope.business.photos.splice(index, 1)
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
                $scope.branch.location = $scope.location;
                $('#myModal').modal('hide');
            }
            /*-----------------------------------------------*/
            
            $scope.business.pin = false;
           

            $scope.person = {};
            $scope.people = [
                {name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States'},
                {name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina'},
                {name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina'},
                {name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador'},
                {name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador'},
                {name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States'},
                {name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia'},
                {name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador'},
                {name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia'},
                {name: 'Nicolás', email: 'nicolas@email.com', age: 43, country: 'Colombia'}
            ];

            $scope.availableColors = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Maroon', 'Umbra', 'Turquoise'];

            $scope.multipleDemo = {};
            $scope.multipleDemo.colors = ['Blue', 'Red'];
            $scope.multipleDemo.selectedPeople = [$scope.people[5], $scope.people[4]];
            $scope.multipleDemo.selectedPeopleWithGroupBy = [$scope.people[8], $scope.people[6]];
            $scope.multipleDemo.selectedPeopleSimple = ['samantha@email.com', 'wladimir@email.com'];

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

            $scope.focus = function (e) {
                $('body').addClass('overlay-disabled');
            };
            $scope.blur = function (e) {
                $('body').removeClass('overlay-disabled');
            };

            /* Drop Zone Config
             -----------------------------------------------*/
            
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
            /* -----------------------------------------------*/
            
            $scope.selectedOption = $scope.business.options;
            
            // If Option checked
            $scope.checkedOption = function (item) {
                for(var i = 0; i < $scope.business.options.length; i++){
                    if ($scope.business.options[i].option.english == item.option.english) { return true }
                }
            }
            
            // toggle selection for a given fruit by name
            $scope.toggleOption = function toggleOption(option) {
                var condtion = $scope.checkedOption(option);
                // is currently selected
                if (condtion) {

                    for(var i = 0; i < $scope.selectedOption.length; i++){
                        if ($scope.selectedOption[i].option.english == option.option.english) { $scope.selectedOption.splice(i, 1); }
                    }
                }
                // is newly selected
                else {
                    $scope.selectedOption.push(option);
                }
            };

            $scope.selectedCategory = $scope.business.categories;
            
            // If Category checked
            $scope.checkedCategory = function (item) {
                for(var i = 0; i < $scope.business.categories.length; i++){
                    if ($scope.business.categories[i].name.english == item.name.english) { return true }
                }
            }
            
            // toggle selection for a given fruit by name
            $scope.toggleCategory = function toggleCategory(option) {

                var condtion = $scope.checkedCategory(option);
                // is currently selected
                if (condtion) {

                    for(var i = 0; i < $scope.selectedCategory.length; i++){
                        if ($scope.selectedCategory[i].name.english == option.name.english) { $scope.selectedCategory.splice(i, 1); }
                    }
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
               }

            }

            $scope.create = function ($redirect) {

                if ($scope.tags)
                    $scope.business.tags = $scope.tags.split(",");

                if ($scope.status) { $scope.business.status = "PUBLISHED" } else { $scope.business.status = "PENDING"}

               
                
                //get cover
                if ($scope.cover.getAcceptedFiles().length > 0) {
                    var coverscovers = angular.fromJson($scope.cover.getAcceptedFiles()[0].xhr.response);
                    if (coverscovers.data.photo) {
                        $scope.business.cover = coverscovers.data.photo;
                    }
                }

                //get cover
                if ($scope.logo.getAcceptedFiles().length > 0) {
                    var coverscovers = angular.fromJson($scope.logo.getAcceptedFiles()[0].xhr.response);
                    if (coverscovers.data.photo) {
                        $scope.business.logo = coverscovers.data.photo;
                    }
                }

                //get images
                var images = $scope.dropzone.getAcceptedFiles();
                var eventimages = [];
                for (var i = 0; i < images.length; i++) {
                    var image = angular.fromJson(images[i].xhr.response);
                    if (image.data.photo) {
                        $scope.business.photos.push(image.data.photo);
                    }

                }


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
                
                $scope.business.socialMedias = [
                    {
                        "type": "twitter",
                        "url": "http://www.twitter.com/@" + $scope.twitter
                    },

                    {
                        "type": "instagram",
                        "url": "http://www.instagram.com/" + $scope.instagram
                    },

                    {
                        "type": "snapchat",
                        "url": "http://www.snapchat.com/" + $scope.snapchat
                    },
                    {
                        "type": "facebook",
                        "url": "http://www.facebook.com/" + $scope.facebook
                    },
                    {
                        "type": "googlePlus",
                        "url": "http://www.plus.google.com/" + $scope.googlePlus
                    },
                    {
                        "type": "website",
                        "url": $scope.website
                    }

                ];

                if (!hasErrorFlag) {
                    $scope.business.options = $scope.selectedOption;

                    $scope.business.categories = $scope.selectedCategory;


                    var newBusiness = BusinessService.update({id: $scope.business._id}, $scope.business, function () {
                        
                        $scope.business = $rootScope.temp_event;
                        
                        $scope.languages = $rootScope.languages;
                        $scope.language = {};
                        /*$scope.instagram = "";
                        $scope.twitter = "";
                        $scope.facebook = "";
                        $scope.snapchat = "";
                        $scope.website = "";
                        $scope.googlePlus = "";*/
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
                        
                        $scope.dropzone.removeAllFiles(true);
                        $scope.logo.removeAllFiles(true);
                        $scope.cover.removeAllFiles(true);
                        publish();
                        /*   if ($redirect) {
                         $location.path('/businesses/all');
                         } else {
                         $location.path('/businesses/new');
                         }*/

                    })
                }

            };


        }]);


