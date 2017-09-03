var ShowEventCtrl = function ($scope, EventsService, UserService, LanguageService) {

        // fetch event and replace comment user id by user object
        var eventId = $stateParams.id;
        var comments = null;
        var event = EventsService.get({id: eventId}, function () {
                comments = event.comments;
                async.forEach(comments, function (comment, callback) {
                        var user = UserService.get({id: comment.user}, function () {
                                comment.user = user;
                                return callback()
                        })
                });
        });
        $scope.event = event;
        console.log(event);

        
        // fetch the event's user
        var userId = event.user;
        var user = UserService.get({id: userId});
        $scope.user = user;

        // fetch the logged in user
        var loggedInUser = UserService.getUser();
        console.log(loggedInUser);

        // fetch languages
        var languages = LanguageService.query();
        $scope.languages = languages;

        // post comment will not work on the admin because he has no language
        $scope.addComment = function (Id) {
                console.log(loggedInUser.language);
                var comment = {
                        "body": $scope.comment,
                        "language": loggedInUser.language
                };
                console.log(comment);

                var newComment = EventsService.addComment({id: Id}, comment, function () {
                        $state.reload();
                        console.log(newComment);
                });
        };

        $scope.deleteComment = function (id, commentId) {
                EventsService.removeComment({id: id, commentId: commentId});
                console.log("comment deleted " + commentId);
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

        $scope.deleteSocialMedia = function (id, socialMediaId) {
                EventsService.removeSocialMedia({id: id, socialMediaId: socialMediaId});
                console.log("social media deleted " + socialMediaId);
        };

        $scope.addRating = function (id, rating) {
                EventsService.addRating({id: id}, rating);
                console.log("rating added ");
        };

        $scope.deleteRating = function (id, ratingId) {
                EventsService.removeRating({id: id, ratingId: ratingId});
                console.log("rating deleted " + ratingId);
        };

        $scope.addAttendant = function (id, attendantId) {
                EventsService.addAttendant({id: id}, attendantId);
                console.log("attendant added " + attendantId);
        };

        $scope.deleteAttendant = function (id, attendantId) {
                EventsService.removeAttendant({id: id, attendantId: attendantId});
                console.log("attendant deleted " + attendantId);
        };

        $scope.addTag = function (id, tag) {
                EventsService.addTag({id: id}, tag);
                console.log("tag added " + tag);
        };

        $scope.deleteTag = function (id, tag) {
                EventsService.removeTag({id: id, tag: tag});
                console.log("tag deleted " + tag);
        };
        
        // delete array of tags
        $scope.deleteTags = function (tags) {
                for (var i = 0; i < tags.length; i++){
                        EventsService.removeTag({id: eventId, tag: tags[i]});
                        console.log(tags[i] + " Deleted");
                }
        };

        $scope.deletePhoto = function (id, photoId) {
                EventsService.removePhoto({id: id, photoId: photoId});
                console.log("photoId deleted " + photoId);
        };

        // delete array of photos
        $scope.deletePhotos = function (photos) {
                // photos is an array of photo object
                for (var i = 0; i < tags.length; i++){
                        EventsService.removePhoto({id: eventId, photoId: photos[i]._id});
                        console.log(photos[i] + " Deleted");
                }
        };

        $scope.deleteCollection = function (collection) {
                EventsService.removeCollection({id: eventId, collectionId: collection[i]._id});
                console.log(collection[i] + " Deleted");

        };


        // show edit panel
        $scope.invokeEditPanel = function (event) {
                $scope.showEditPanel = !$scope.showEditPanel;
                $scope.eventToEdit = event;

                //initialize edit fields
                $scope.eventToEdit.newLanguage = $scope.eventToEdit.language;
                $scope.eventToEdit.newTitle = $scope.eventToEdit.title;
                $scope.eventToEdit.newBody = $scope.eventToEdit.body;
                //$scope.eventToEdit.newCover = $scope.eventToEdit.cover;
        };

        // edit event
        $scope.editEvent = function () {
                var event = {
                        "language": $scope.eventToEdit.newLanguage._id,
                        "title": $scope.eventToEdit.newTitle,
                        "body": $scope.eventToEdit.newBody
                        // "cover"   : $cover.files[0]
                };
                console.log(event);

                EventsService.update({id: $scope.eventToEdit._id}, event, function () {
                        $scope.showEditPanel = false;
                        console.log("Updated: " + $scope.eventToEdit._id);
                })
        };

        // hide panel
        $scope.cancel = function () {
                $scope.showEditPanel = false;
        };

    };
module.exports = ShowEventCtrl;