// TODO
// finish the POST calls
var BusinessCreateCtrl =  function ($ocLazyLoad, $scope, $location, BusinessService, LanguageService, CollectionsService) {

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
    $('#businessTags').tagsinput('items');

    // Add tag
    $('#businessTags').on('itemAdded', function(event) {
        // event.item: contains the item
        tags.push(event.item);
    });

    // Delete tag
    $('#businessTags').on('beforeItemRemove', function(event) {
        // event.item: contains the item
        var index = tags.indexOf(event.item);
        tags.splice(index,1)
    });
    // tags part ends

    // options part starts
    var options = [];
    $('#businessOptions').tagsinput('items');

    // Add options
    $('#businessOptions').on('itemAdded', function(event) {
        // event.item: contains the item
        options.push(event.item);
    });

    /*// Delete options
    $('#businessOptions').on('beforeItemRemove', function(event) {
        // event.item: contains the item
        var index = options.indexOf(event.item);
        options.splice(index,1)
    });
    // options part ends*/

    $scope.socialMediaType = null;
    $scope.socialMediaUrl = null;


    $scope.create = function () {

        var collections = {
            collection: collectionsArray
        };

        var SocialMedia = [];
        SocialMedia.push({
            "type": $scope.socialMediaType,
            "url": $scope.socialMediaUrl
            });
        console.log(SocialMedia);

        console.log(collectionsArray);
        console.log(collections);

        // ArticleService.addCollection(collections);

        var $photos = document.getElementById('photos');
        var $logo = document.getElementById('logo');
        var photos = new FormData();
        var Business = new FormData();


        Business.append('language', $scope.language._id);
        Business.append('name.arabicName', $scope.arabicName);
        Business.append('name.englishName', $scope.englishName);
        Business.append('description.arabicDescription', $scope.arabicDescription);
        Business.append('description.englishDescription', $scope.englishDescription);
        Business.append('website', $scope.website);
        // Business.append('socialMedias', SocialMedia);
        Business.append('logo', $logo.files[0]);

        for (var x = 0; x < tags.length; x++) {
            console.log(tags[x]);
            Business.append('tags', tags[x]);
        }

        /*for (var x = 0; x < collectionsArray.length; x++) {
         console.log(collectionsArray[x])
         article.append('collections', collectionsArray[x]);

         }*/

        for (var i = 0; i < $photos.files.length; i++) {
            console.log($photos.files[i]);
            photos.append("photo", $photos.files[i]);
        }

        var newBusiness = BusinessService.save(Business, function () {
            
            /*for (var j = 0; j < options.length; j++) {
                console.log(options[j]);
                BusinessService.addOption(newBusiness._id, options[j]);
            }*/
            //ArticleService.addPhotos(photos, {id: newArticle._id});
            // ArticleService.addCollection(collections, {id: newArticle._id});
            $location.path('/businesses/list');
        })


    };

};
module.exports = BusinessCreateCtrl;