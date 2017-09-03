var BusinessOptionsCtrl = function($scope, BusinessService) {


    $scope.eventsOptions = BusinessService.getBusinessesOptions();


    $scope.add = function(){
        var item = {
            option:{
                arabic: $scope.addArabicOption,
                english: $scope.addEnglishOption
            }
        }
        BusinessService.addBusinessesOption(item,function () {
                $('#addNewAppModal').modal('hide');
                $scope.eventsOptions = BusinessService.getBusinessesOptions();
            },
            function(err){
                console.log(err);
                $('body').pgNotification({
                    style: 'bar',
                    message: ""+ err.data.message + " :(",
                    position: 'top', //'bottom'
                    timeout: 5000,
                    type: 'error'
                }).show();
            });
    }


    $scope.delete = function(item){
        BusinessService.removeBusinessesOption({optionId: item._id},function (response) {

                var index = $scope.eventsOptions.indexOf(item);
                $scope.eventsOptions.splice(index, 1);

                if(!response._id){
                    $scope.eventsOptions = BusinessService.getBusinessesOptions();
                }

            },
            function(err){
                console.log(err);
                $('body').pgNotification({
                    style: 'bar',
                    message: ""+ err.data.message + " :(",
                    position: 'top', //'bottom'
                    timeout: 5000,
                    type: 'error'
                }).show();
            });
    }



    $scope.save = function(){
        console.log("ssaas");
        $('#EditModel').modal('hide');
        BusinessService.updateBusinessesOption({optionId: $scope.item._id},$scope.item,function (response) {

            },
            function(err){
                console.log(err);
                $scope.revert();
                $('body').pgNotification({
                    style: 'bar',
                    message: ""+ err.data.message + " :(",
                    position: 'top', //'bottom'
                    timeout: 5000,
                    type: 'error'
                }).show();
            });
    }


    $scope.revert = function(){
        $scope.eventsOptions[$scope.selectedIndex] = $scope.original;
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }
    }


    $scope.showModal = function() {
        $('#addNewAppModal').modal('show');
    }


    $scope.editModal = function(item, index) {

        $scope.selectedIndex = index;
        $scope.original = angular.copy(item);
        console.log($scope.original);
        $scope.item = item;
        $('#EditModel').modal('show');

    }

};

module.exports = BusinessOptionsCtrl;