// TODO
var EventsCalendarCtrl = function ($ocLazyLoad, $scope, $http) {
        console.log("CalendarCtrl");
        $ocLazyLoad.load(['assets/plugins/fullcalendar/dist/fullcalendar.css',
                'assets/css/pages.css',
                'assets/plugins/select2/select2.min.js',
                'assets/plugins/moment/moment.js',
                'assets/plugins/fullcalendar/dist/fullcalendar.min.js',
                'assets/pages/jquery.fullcalendar.js',
                'assets/plugins/select2/select2.css'],
            {cache: false, timeout: 5000});
    };
module.exports = EventsCalendarCtrl;