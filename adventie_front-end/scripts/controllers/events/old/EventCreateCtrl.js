// TODO
// finish the POST calls
var EventCreateCtrl = function($scope, $http, $resource, $location, EventsService, LanguageService, CollectionsService) {
    console.log("add event");

    var languages = LanguageService.query();
    $scope.languages = languages;

    // $scope.language = null;

    $scope.saveLanguage = function(){
        console.log($scope.language.name);
        console.log($scope.language._id);
    };

    var collections = CollectionsService.query();
    $scope.collections = collections;
    console.log(collections)

    // Collections part starts
    var collectionsArray = [];

    $scope.saveCheck = function(){
        $scope.collectionNameArray = [];
        angular.forEach($scope.collections, function(collection){
            if (!!collection.selected) $scope.collectionNameArray.push(collection._id);
        });
        console.log($scope.collectionNameArray);
        collectionsArray = $scope.collectionNameArray;
    };
    // Collections part ends

    // tags part starts
    var tags = [];
    $('#eventTags').tagsinput('items');

    // Add tag
    $('#eventTags').on('itemAdded', function(event) {
        // event.item: contains the item
        tags.push(event.item);
    });

    // Delete tag
    $('#eventTags').on('beforeItemRemove', function(event) {
        // event.item: contains the item
        var index = tags.indexOf(event.item);
        tags.splice(index,1)
    });
    // tags part ends

    // add option
    $scope.addOption = function (Id) {
        var option = {
            "englishOption": $scope.englishOption,
            "arabicOption": $scope.arabicOption
        };
        console.log(option);
        var newOption = EventsService.addOption({id: Id}, option);
    };

    $scope.goBack = function() {
        $location.path('/events/list');
    };

    $scope.create = function () {

        var collections = {
            collection: collectionsArray
        };

        console.log(collectionsArray);
        console.log(collections);

        var $photos = document.getElementById('photos');
        var $cover = document.getElementById('cover');
        var photos = new FormData();
        var Event = new FormData();


        Event.append('title.arabicTitle', $scope.arabicTitle);
        Event.append('title.englishTitle', $scope.englishTitle);
        Event.append('host', $scope.host);
        Event.append('description.arabicDescription', $scope.arabicDescription);
        Event.append('description.englishDescription', $scope.englishDescription);
        Event.append('date', $scope.date);
        Event.append('duration', $scope.duration);
        Event.append('phone', $scope.phone);
        Event.append('entranceFee', $scope.entranceFee);
        Event.append('cover', $cover.files[0]);

        for (var x = 0; x < tags.length; x++) {
            console.log(tags[x]);
            Event.append('tags', tags[x]);
        }

        /*for (var x = 0; x < collectionsArray.length; x++) {
         console.log(collectionsArray[x])
         Event.append('collections', collectionsArray[x]);

         }*/

        for (var i = 0; i < $photos.files.length; i++) {
            console.log($photos.files[i]);
            photos.append("photo", $photos.files[i]);
        }

        var newEvent = EventsService.save(Event, function () {

            /*for (var j = 0; j < options.length; j++) {
             console.log(options[j]);
             BusinessService.addOption(newBusiness._id, options[j]);
             }*/
            //EventsService.addPhotos(photos, {id: newEvent._id});
            // EventsService.addCollection(collections, {id: newEvent._id});
            $location.path('/events/list');
        })


    };






/*
    $http.post('http://localhost:8080/api/event', data)
        .success(function (res) {
            console.log(res);
        })
        .error(function (res) {
            console.log(res)
        });

    $scope.myLanguage = function (item) {
        $scope.myLanguageV = item;
        console.log($scope.myLanguageV);
    };

    function initNewEvent() {
        $scope.event = new SingleEvent();
        $scope.event.title.arabicTitle = '';
        $scope.event.title.englishTitle = '';
        $scope.event.description.arabicDescription = '';
        $scope.event.description.englishDescription = '';
        $scope.event.host = '';
        $scope.event.duration = '';
        $scope.event.googleMap = '';
        $scope.event.phoneNumber = '';
        $scope.event.entranceFee = '';
        $scope.event.coverPhoto = '';
    }

    $scope.addEvent = function() {
        console.log($scope.event);
        $scope.event.$save(function() {
            $location.path('/events/list');
        });
    };

    $scope.cancel = function() {
        $location.path('/events/list');
    };

    !($scope.activate = function () {
        initNewEvent();
    })();*/
};
module.exports = EventCreateCtrl;