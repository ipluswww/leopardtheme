var BusinessListCtrl = function ($scope, $state, $location, BusinessService, UserService, LanguageService) {

    $scope.businesses = null;

    var businesses = [];
    // All businesses
    businesses = BusinessService.query(function () {
        businesses.forEach(function (businesses) {
            UserService.get(function (res) {
                businesses.user = res
            });
        })
    });
    $scope.businesses = businesses;
    console.log(businesses);

    $scope.deleteBranch = function (id, branchId) {
        BusinessService.removeBranch({id: id, branchId: branchId});
        console.log("branch deleted " + branchId);
    };

    $scope.deletePhoto = function (id, photoId) {
        BusinessService.removePhoto({id: id, photoId: photoId});
        console.log("photo deleted " + photoId);
    };

    $scope.deleteSocial = function (id, socialId) {
        BusinessService.removeSocialMedia({id: id, socialId: socialId});
        console.log("Social Media deleted " + socialId);
    };

    $scope.deleteOption = function (id, optionId) {
        BusinessService.removeOption({id: id, optionId: optionId});
        console.log("Option deleted " + optionId);
    };
    
    $scope.deleteTag = function (id, tag) {
        BusinessService.removeTag({id: id, tag: tag});
        console.log("tag deleted " + tag);
    };

    $scope.deleteReview = function (id, reviewId) {
        BusinessService.removeReview({id: id, reviewId: reviewId});
        console.log("review deleted " + reviewId);
    };

    $scope.deleteRating = function (id, ratingId) {
        BusinessService.removeRating({id: id, ratingId: ratingId});
        console.log("rating deleted " + ratingId);
    };

    $scope.addRating = function (id, rating) {
        BusinessService.addRating({id: id}, rating);
        console.log("rating added ");
    };

    $scope.deleteCategory = function (id, categoryId) {
        BusinessService.removeCategory({id: id, categoryId: categoryId});
        console.log("category deleted " + categoryId);
    };

    $scope.deleteCollection = function (id, collectionId) {
        BusinessService.removeCollection({id: id, collectionId: collectionId});
        console.log("collection deleted " + collectionId);
    };
    
    $scope.deleteComment = function (id, reviewId, commentId) {
        BusinessService.removeComment({id: id, reviewId: reviewId, commentId: commentId});
        console.log("comment deleted " + commentId);
    };


    var languages = LanguageService.query();
    $scope.languages = languages;
    console.log(languages);

// TODO
// change edit fields
/*    $scope.invokeEditPanel = function(business) {
        $scope.showEditPanel = !$scope.showEditPanel;
        $scope.businessToEdit = business;
        $scope.tags = business.tags;
        console.log($scope.tags);

        //initialize edit fields
        $scope.businessToEdit.newLanguage = $scope.businessToEdit.language;
        $scope.businessToEdit.newTitle = $scope.businessToEdit.title;
        $scope.businessToEdit.newBody = $scope.businessToEdit.body;
        $scope.businessToEdit.tagsToDelete = null;
    };

    $scope.editBusiness =  function() {
        var business = {
            "language": $scope.businessToEdit.newLanguage,
            "title":  $scope.businessToEdit.newTitle,
            "body" : $scope.businessToEdit.newBody
        };
        console.log(business);

        businessService.update({id: $scope.businessToEdit._id}, business, function() {
            $scope.showEditPanel = false;
            console.log("Updated: " + $scope.businessToEdit._id);
        })
    };*/

    $scope.cancel = function() {
        $scope.showEditPanel = false;
    };

};
module.exports = BusinessListCtrl;
