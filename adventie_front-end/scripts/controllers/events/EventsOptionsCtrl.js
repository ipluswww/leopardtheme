var EventsOptionsCtrl = function($scope, EventsService) {


        $scope.eventsOptions = EventsService.getEventsOptions();
        
        $scope.showModal = function() {
            $('#addNewAppModal').modal('show');
        }
        
        $scope.editModal = function(item) {
            $scope.item = item;
            $('#EditModel').modal('show');
        }
        
        
        
        $scope.add = function(){
            var item = {
                option:{
                    arabic: $scope.addArabicOption,
                    english: $scope.addEnglishOption
                }
            }
            EventsService.addEventsOption(item,function () {
                $('#addNewAppModal').modal('hide');
                $scope.eventsOptions = EventsService.getEventsOptions();
            });
        }
        
        $scope.delete = function(item){
            EventsService.removeEventsOption({optionId: item._id},function (response) {
                
                var index = $scope.eventsOptions.indexOf(item);
                $scope.eventsOptions.splice(index, 1);
                
                if(!response._id){
                    $scope.eventsOptions = EventsService.getEventsOptions();
                }
                
            });
        }

        $scope.save = function(item){
            $('#EditModel').modal('hide');
            EventsService.updateEventsOption({optionId: $scope.item._id},$scope.item,function (response) {
                if(!response.ok){
                    $scope.eventsOptions = EventsService.getEventsOptions();
                }
            })
        }

    };

module.exports = EventsOptionsCtrl;