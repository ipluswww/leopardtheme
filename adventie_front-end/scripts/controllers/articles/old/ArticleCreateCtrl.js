var ArticleCreateCtrl = function ($ocLazyLoad, $scope, $location, ArticleService, LanguageService, CollectionsService) {
    // TODO
    // fix post photos
    // fix post collections

    var languages = LanguageService.query();
    $scope.languages = languages;

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


    $scope.goBack = function() {
        $location.path('/articles/published');
    };

    // tags part starts
    var tags = [];
    $('#articleTags').tagsinput('items');

    // Add tag
    $('#articleTags').on('itemAdded', function(event) {
        // event.item: contains the item
        tags.push(event.item);
    });

    // Delete tag
    $('#articleTags').on('beforeItemRemove', function(event) {
        // event.item: contains the item
        var index = tags.indexOf(event.item);
        tags.splice(index,1)
    });
    // tags part ends

    $scope.print = function () {
        console.log("Clicked !!!")
    }

    $scope.cancel = function () {
        $location.path('/articles/pending');
        console.log("Clicked !!!")
    }



    $scope.create = function () {

        var collections = {
            collection:collectionsArray
        }

        console.log(collectionsArray);
        console.log(collections)

        // ArticleService.addCollection(collections);

        var $photos = document.getElementById('photos');
        var $cover = document.getElementById('cover');
        var photos = new FormData();
        var article = new FormData();


        article.append('language', $scope.language._id);
        article.append('title', $scope.title);
        article.append('body', $scope.body);
        article.append('cover', $cover.files[0]);

        for (var x = 0; x < tags.length; x++) {
            console.log(tags[x])
            article.append('tags', tags[x]);
        }

        /*for (var x = 0; x < collectionsArray.length; x++) {
            console.log(collectionsArray[x])
            article.append('collections', collectionsArray[x]);

        }*/

        for (var x = 0; x < $photos.files.length; x++) {
            console.log($photos.files[x])
            photos.append("photo", $photos.files[x]);
        }

         var newArticle = ArticleService.save(article, function () {
            //ArticleService.addPhotos(photos, {id: newArticle._id});
            // ArticleService.addCollection(collections, {id: newArticle._id});
            $location.path('/articles/pending');
        })


    };
    
};
module.exports = ArticleCreateCtrl;