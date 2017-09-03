var  EventsListCtrl = function ($scope, $state, $location, EventsService, UserService, LanguageService) {


    $scope.events = null;

    var events = [];
    // All events
    events = EventsService.query(function () {
        events.forEach(function (events) {
            UserService.get(function (res) {
                events.user = res
            });
        })
    });
    $scope.events = events;
    console.log(events);

    $scope.deleteEvent = function (id) {
        EventsService.removeAttendant({id: id});
        console.log("event deleted " + id);
    };

    $scope.deleteAttendant = function (id, attendantId) {
        EventsService.removeAttendant({id: id, attendantId: attendantId});
        console.log("attendant deleted " + attendantId);
    };
    
    $scope.addAttendant = function (id, attendantId) {
        EventsService.addAttendant({id: id}, attendantId);
        console.log("attendant added " + attendantId);
    };

    $scope.deletePhoto = function (id, photoId) {
        EventsService.removePhoto({id: id, photoId: photoId});
        console.log("photo deleted " + photoId);
    };

    $scope.addSocialMedia = function (Id) {
        console.log(loggedInUser.language);
        var SocialMedia = {
            "type": $scope.socialMediaType,
            "url": $scope.socialMediaUrl
        };
        console.log(SocialMedia);

        EventsService.addSocialMedia({id: Id}, SocialMedia);
    };

    $scope.deleteSocial = function (id, socialId) {
        EventsService.removeSocialMedia({id: id, socialId: socialId});
        console.log("Social Media deleted " + socialId);
    };

    $scope.addOption = function (Id) {
        var option = {
            "englishOption": $scope.englishOption,
            "arabicOption": $scope.arabicOption
        };
        EventsService.addOption({id: Id}, option);
    };

    $scope.deleteOption = function (id, optionId) {
        EventsService.removeOption({id: id, optionId: optionId});
        console.log("Option deleted " + optionId);
    };

    $scope.deleteTag = function (id, tag) {
        EventsService.removeTag({id: id, tag: tag});
        console.log("tag deleted " + tag);
    };

    $scope.deleteRating = function (id, ratingId) {
        EventsService.removeRating({id: id, ratingId: ratingId});
        console.log("rating deleted " + ratingId);
    };
    
    $scope.addRating = function (id, rating) {
        EventsService.addRating({id: id}, rating);
        console.log("rating added ");
    };

    $scope.deleteCategory = function (id, categoryId) {
        EventsService.removeCategory({id: id, categoryId: categoryId});
        console.log("category deleted " + categoryId);
    };

    $scope.deleteComment = function (id, commentId) {
        EventsService.removeComment({id: id, commentId: commentId});
        console.log("comment deleted " + commentId);
    };


    var languages = LanguageService.query();
    $scope.languages = languages;
    console.log(languages);


// TODO
// change edit fields
/*    $scope.invokeEditPanel = function(event) {
        $scope.showEditPanel = !$scope.showEditPanel;
        $scope.eventToEdit = event;
        $scope.tags = event.tags;
        console.log($scope.tags);

        //initialize edit fields
        $scope.eventToEdit.newLanguage = $scope.eventToEdit.language;
        $scope.eventToEdit.newTitle = $scope.eventToEdit.title;
        $scope.eventToEdit.newBody = $scope.eventToEdit.body;
        $scope.eventToEdit.tagsToDelete = null;
    };

    $scope.editEvent =  function() {
        var event = {
            "language": $scope.eventToEdit.newLanguage,
            "title":  $scope.eventToEdit.newTitle,
            "body" : $scope.eventToEdit.newBody
        };
        console.log(event);

        EventsService.update({id: $scope.eventToEdit._id}, event, function() {
            $scope.showEditPanel = false;
            console.log("Updated: " + $scope.eventToEdit._id);
        })
    };*/

    $scope.cancel = function() {
        $scope.showEditPanel = false;
    };
    
    };
module.exports = EventsListCtrl;