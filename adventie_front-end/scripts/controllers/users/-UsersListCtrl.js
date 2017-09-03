// create a new controller for the Business User ?
var UsersListCtrl = function ($scope, $state, $location, UserService, LanguageService) {

    var loggedinUser = UserService.getUser(function () {
        if (loggedinUser.__t != 'Admin'){
            $location.path('/notAllowed');
        }
    });

    var users = [];
    
    // All users
    users = UserService.query(function (res) {
        users.forEach(function (users) {
            LanguageService.get({id: users.language}, function (res) {
                users.language = res.name
            })
        })
    });
    $scope.users = users;
    console.log(users)

    $scope.checkStatus = function (status) {
        switch (status) {
            case "ACTIVE":
                return "";
            case "PENDING":
                return "btn-warning";
            case "BLOCKED":
                return "btn-inverse";
        }
    };

    $scope.status = ["ACTIVE","PENDING","BLOCKED"];

    // language filter
    $scope.myLanguage = function (item) {
        $scope.myLanguageV = item;
    };

    // go to create new article page
    $scope.createNew = function () {
        $location.path('/articles/new');
    };

    // suspend article
    $scope.suspend = function (index) {
        ArticleService.suspend({id: index})
        $state.reload();
        console.log('Article suspended: ' + index)
    };

    // approve article
    $scope.approve = function (index) {
        ArticleService.approve({id: index})
        $state.reload();
        console.log('Article approved: ' + index)
    };

    // publish article
    $scope.publish = function (index) {
        ArticleService.approve({id: index})
        $state.reload();
        console.log('Article publish: ' + index)
    };

    // delete article
    $scope.deleteUser = function (index) {
        UserService.delete({id: index})
        $state.reload();
        console.log('User deleted: ' + index)
    };


    var languages = LanguageService.query();
    $scope.languages = languages;

    $scope.invokeEditPanel = function (user) {
        $scope.showEditPanel = !$scope.showEditPanel;
        $scope.userToEdit = user;

        //initialize edit fields
        $scope.userToEdit.newLanguage  = $scope.userToEdit.language;
        $scope.userToEdit.newStatus    = $scope.userToEdit.status;
        $scope.userToEdit.newBirthDate = $scope.userToEdit.birthDate;
        $scope.userToEdit.newBiography = $scope.userToEdit.biography;
    };

    $scope.editUser = function () {
        var user = {
            "language": $scope.userToEdit.newLanguage,
            "birthDate": $scope.userToEdit.newBirthDate,
            "biography": $scope.userToEdit.newBiography,
            "status": $scope.userToEdit.newStatus
        };
        console.log(user);

        UserService.update({id: $scope.userToEdit._id}, user, function () {
            $scope.showEditPanel = false;
            console.log("Updated: " + $scope.userToEdit._id);
        })
    };

    $scope.cancel = function () {
        $scope.showEditPanel = false;
    };

};
module.exports = UsersListCtrl;
