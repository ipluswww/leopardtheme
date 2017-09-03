var async = require('async');

var ShowArticleCtrl = function ($scope, $state, $stateParams, ArticleService, UserService, LanguageService) {
    // fetch article and replace comment user id by user object
    var articleId = $stateParams.id;
    var comments = null;
    var article = ArticleService.get({id: articleId}, function () {
        comments = article.comments;
        async.forEach(comments, function (comment, callback) {
           var user = UserService.get({id: comment.user}, function () {
                comment.user = user;
               return callback()
            })
        });
    });
    $scope.article = article;
    console.log(article);

    // fetch the article's user
    var userId = article.user;
    var user = UserService.get({id: userId});
    $scope.user = user;

    // fetch the logged in user
    var loggedInUser = UserService.getUser();
    console.log(loggedInUser);

    // fetch languages
    var languages = LanguageService.query();
    $scope.languages = languages;

    // post comment will not work on the admin because he has no language
    $scope.comment = '';
    $scope.addComment = function (Id) {
        console.log(loggedInUser.language);
        var comment = {
            "comment": $scope.comment,
            "language": loggedInUser.language
        };
        console.log(comment);

        var newComment = ArticleService.addComment({id: Id}, comment, function () {
            $state.reload();
            console.log(newComment);
        });
    };
    
    $scope.deleteComment = function (articleId, commentId) {
        ArticleService.removeComment({id: articleId, commentId: commentId});
        $state.reload();
        console.log("Comment deleted " + commentId);
    };

    $scope.likeArticle = function (article) {
        if (article.likes.includes(loggedInUser._id)){
            console.log("You removed your like :(");
            var like = ArticleService.removeLike({id: article._id});
            $state.reload();
            return console.log(like);
        }

        console.log("You like this ;)");
        var newLike = ArticleService.addLike({id: article._id});
        $state.reload();
        console.log(newLike)
    };

    // delete array of tags
    $scope.deleteTags = function (tags) {
        for (var i = 0; i < tags.length; i++){
            ArticleService.removeTag({id: articleId, tag: tags[i]});
            console.log(tags[i] + " Deleted");
        }
    };

    // delete array of photos
    $scope.deletePhotos = function (photos) {
        // photos is an array of photo object
        for (var i = 0; i < tags.length; i++){
            ArticleService.removePhoto({id: articleId, photoId: photos[i]._id});
            console.log(photos[i] + " Deleted");
        }
    };

    // delete collection
    $scope.deleteCollections = function (collection) {
        ArticleService.removeCollection({id: articleId, collectionId: collection[i]._id});
        console.log(collection[i] + " Deleted");

    };

    // show edit panel
    $scope.invokeEditPanel = function (article) {
        $scope.showEditPanel = !$scope.showEditPanel;
        $scope.articleToEdit = article;

        //initialize edit fields
        $scope.articleToEdit.newLanguage = $scope.articleToEdit.language;
        $scope.articleToEdit.newTitle = $scope.articleToEdit.title;
        $scope.articleToEdit.newBody = $scope.articleToEdit.body;
        //$scope.articleToEdit.newCover = $scope.articleToEdit.cover;
    };

    // edit article
    $scope.editArticle = function () {
        var article = {
            "language": $scope.articleToEdit.newLanguage._id,
            "title": $scope.articleToEdit.newTitle,
            "body": $scope.articleToEdit.newBody
            // "cover"   : $cover.files[0]
        };
        console.log(article);

        ArticleService.update({id: $scope.articleToEdit._id}, article, function () {
            $scope.showEditPanel = false;
            console.log("Updated: " + $scope.articleToEdit._id);
        })
    };

    // hide panels
    $scope.cancel = function () {
        $scope.showEditPanel = false;
        $scope.showSurePanel = false;
    };

    // show edit panel
    $scope.invokeSurePanel = function () {
        $scope.showSurePanel = !$scope.showSurePanel;

    };


};
module.exports = ShowArticleCtrl;