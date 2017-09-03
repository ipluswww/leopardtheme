var BizAccountListCtrl = function ($scope, $location,BusinessAccount) {
    $scope.showAccountPanel = false;
    $scope.showEditPanel = false;
    $scope.account = new BusinessAccount();
    $scope.sortReverse = false;
    $scope.fetchPublished = null;

    $scope.createAccount = function() {
        $scope.showAccountPanel = !$scope.showAccountPanel;
        console.log("createAccount")
    };

    function fetchAccounts () {
        BusinessAccount.query(function(accounts) {
            $scope.accounts = accounts;
            for (var i = 0; i < accounts.length; i++) {
                $scope.accounts[i].starting_date = formatDate(new Date($scope.accounts[i].starting_date));
                $scope.accounts[i].end_date = formatDate(new Date($scope.accounts[i].end_date));
            }
        });
    };

    $scope.saveAccount = function() {
        console.log("saved");
        console.log($scope.account);
        $scope.account.$save(function() {
            $scope.showAccountPanel = false;
            fetchAccounts();
        });
    }

    $scope.removeAccount = function(id) {
        BusinessAccount.delete({id: id}, function() {
            fetchAccounts();
        })
    }

    $scope.invokeEditPanel =  function(account) {
        $scope.showEditPanel = true;
        $scope.accountToEdit = account;

        $scope.accountToEdit.newSubscriptionType = $scope.accountToEdit.subscription_type;
        $scope.accountToEdit.newIsValid = $scope.accountToEdit.is_valid;
        $scope.accountToEdit.newStartingDate = $scope.accountToEdit.starting_date;
        $scope.accountToEdit.newEndDate = $scope.accountToEdit.end_date;
    };

    $scope.editAccount =  function() {
        var account = {
            "subscriptionType": $scope.accountToEdit.newSubscriptionType,
            "isValid": $scope.accountToEdit.newIsValid,
            "startingDate": $scope.accountToEdit.newStartingDate,
            "endDate": $scope.accountToEdit.newEndDate
        };

        BusinessAccount.update({id: $scope.accountToEdit.id}, account, function() {
            $scope.showEditPanel = false;
            fetchAccounts();
        })
    };

    $scope.cancel = function() {
        $scope.showAccountPanel = false;
        $scope.showEditPanel = false;
    }

    !($scope.activate = function () {
        fetchAccounts();
    })();

    function formatDate(date) {
        var month = date.getMonth() + 1;
        var day = date.getDate();

        if (month < 10)
            month = "0" + month;

        if (day < 10)
            day = "0" + day;
        var year = date.getFullYear();

        return month + "/" + day + "/" + year;
    }
};
module.exports = BizAccountListCtrl;