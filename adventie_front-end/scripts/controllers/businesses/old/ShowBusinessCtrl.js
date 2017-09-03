var ShowBusinessCtrl = function ($scope, BusinessService, UserService, LanguageService) {

    var businessId = $stateParams.id;
    var reviews = null;
    var business = BusinessService.get({id: businessId}, function () {
        reviews = business.reviews;
        async.forEach(reviews, function (review, callback) {
            var user = UserService.get({id: review.user}, function () {
                review.user = user;
                return callback()
            })
        });
    });
    
    $scope.business = business;
    console.log(business);

    // fetch the business's user
    var userId = business.user;
    var user = UserService.get({id: userId});
    $scope.user = user;

    // fetch the logged in user
    var loggedInUser = UserService.getUser();
    console.log(loggedInUser);

    // fetch languages
    var languages = LanguageService.query();
    $scope.languages = languages;

    // post review will not work on the admin because he has no language
    $scope.review = '';
    $scope.addReview = function (Id) {
        console.log(loggedInUser.language);
        var review = {
            "body": $scope.review,
            "language": loggedInUser.language
        };
        console.log(review);

        var newReview = BusinessService.addReview({id: Id}, review, function () {
            $state.reload();
            console.log(newReview);
        });
    };

    $scope.deleteReview = function (businessId, reviewId) {
        BusinessService.removeReview({id: businessId, reviewId: reviewId});
        $state.reload();
        console.log("review deleted " + reviewId);
    };
    
    // delete array of tags
    $scope.deleteTags = function (tags) {
        for (var i = 0; i < tags.length; i++){
            BusinessService.removeTag({id: businessId, tag: tags[i]});
            console.log(tags[i] + " Deleted");
        }
    };

    // delete array of photos
    $scope.deletePhotos = function (photos) {
        // photos is an array of photo object
        for (var i = 0; i < tags.length; i++){
            BusinessService.removePhoto({id: businessId, photoId: photos[i]._id});
            console.log(photos[i] + " Deleted");
        }
    };

    // delete collection
    $scope.deleteCollection = function (collection) {
        BusinessService.removeCollection({id: businessId, collectionId: collection[i]._id});
        console.log(collection[i] + " Deleted");

    };

    // show edit panel
    $scope.invokeEditPanel = function (business) {
        $scope.showEditPanel = !$scope.showEditPanel;
        $scope.businessToEdit = business;

        //initialize edit fields
        $scope.businessToEdit.newLanguage = $scope.businessToEdit.language;
        $scope.businessToEdit.newTitle = $scope.businessToEdit.title;
        $scope.businessToEdit.newBody = $scope.businessToEdit.body;
        //$scope.businessToEdit.newCover = $scope.businessToEdit.cover;
    };

    // edit business
    $scope.editbusiness = function () {
        var business = {
            "language": $scope.businessToEdit.newLanguage._id,
            "title": $scope.businessToEdit.newTitle,
            "body": $scope.businessToEdit.newBody
            // "cover"   : $cover.files[0]
        };
        console.log(business);

        BusinessService.update({id: $scope.businessToEdit._id}, business, function () {
            $scope.showEditPanel = false;
            console.log("Updated: " + $scope.businessToEdit._id);
        })
    };

    // hide panel
    $scope.cancel = function () {
        $scope.showEditPanel = false;
    };

    
};
module.exports = ShowBusinessCtrl;