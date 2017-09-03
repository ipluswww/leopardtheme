'use strict';

/* Controllers */

angular.module('wain013', [])
    .controller('DashboardCtrl', ['$scope', '$timeout', '$http','AnalysisService', function($scope, $timeout, $http,AnalysisService) {

        $scope.wain_widget_1 = {
            title: "Stories",
            count: 10,
            total: 10
        };
        $scope.wain_widget_2 = {
            title: "Businesses",
            count: 10,
            total: 10
        };
        $scope.wain_widget_3 = {
            title: "Events",
            count: 10,
            total: 10
        };

        $scope.wain_widget_4 = {
            title: "Active Businesses",
            count: 10,
            total: 10
        };


        $scope.wain_widget_5 = {
            title: "Published Businesses",
            count: 10,
            total: 10
        };

        $scope.wain_widget_6 = {
            title: "Pending Businesses",
            count: 10,
            total: 10
        };

        $scope.wain_widget_7 = {
            title: "Pending Events",
            count: 10,
            total: 10
        };

        $scope.wain_widget_8 = {
            title: "Pending Events",
            count: 10,
            total: 10
        };

        $scope.wain_widget_9 = {
            title: "Pending Stories",
            count: 10,
            total: 10
        };

        $scope.wain_widget_10 = {
            title: "Pending Stories",
            count: 10,
            total: 10
        };

        $scope.wain_widget_11 = {
            title: "Pending Stories",
            count: 10,
            total: 10
        };

        $scope.wain_widget_12 = {
            title: "Pending Stories",
            count: 10,
            total: 10
        };

        $scope.wain_widget_13 = {
            title: "Active Users",
            count: 10,
            total: 10
        };

        $scope.wain_widget_14 = {
            title: "Regular Users",
            count: 10,
            total: 10
        };

        $scope.wain_widget_15 = {
            title: "Business Users",
            count: 10,
            total: 10
        };

        AnalysisService.businesses(function(result){
            $scope.wain_widget_2.count = result.count;
            $scope.wain_widget_4.total = result.count;
            $scope.wain_widget_5.total = result.count;
            $scope.wain_widget_6.total = result.count;

        });

        AnalysisService.active_businesses(function(result){
            $scope.wain_widget_4.count = result.count;
        });

        AnalysisService.published_businesses(function(result){
            $scope.wain_widget_5.count = result.count;
        });

        AnalysisService.pending_businesses(function(result){
            $scope.wain_widget_6.count = result.count;
        });


        AnalysisService.events(function(result){
            $scope.wain_widget_3.count = result.count;
            $scope.wain_widget_7.total = result.count;
            $scope.wain_widget_8.total = result.count;
            $scope.wain_widget_9.total = result.count;

        });

        AnalysisService.active_events(function(result){
            $scope.wain_widget_7.count = result.count;
        });

        AnalysisService.published_events(function(result){
            $scope.wain_widget_8.count = result.count;
        });

        AnalysisService.pending_events(function(result){
            $scope.wain_widget_9.count = result.count;
        });

        AnalysisService.articles(function(result){
            $scope.wain_widget_1.count = result.count;
            $scope.wain_widget_10.total = result.count;
            $scope.wain_widget_11.total = result.count;
            $scope.wain_widget_12.total = result.count;

        });

        AnalysisService.active_articles(function(result){
            $scope.wain_widget_10.count = result.count;
        });

        AnalysisService.published_articles(function(result){
            $scope.wain_widget_11.count = result.count;
        });

        AnalysisService.pending_articles(function(result){
            $scope.wain_widget_12.count = result.count;
        });

        AnalysisService.users(function(result){
            $scope.wain_widget_13.total = result.count;
            $scope.wain_widget_14.total = result.count;
            $scope.wain_widget_15.total = result.count;

        });

        AnalysisService.active_users(function(result){
            $scope.wain_widget_13.count = result.count;
        });

        AnalysisService.regular_users(function(result){
            $scope.wain_widget_14.count = result.count;
        });

        AnalysisService.business_users(function(result){
            $scope.wain_widget_15.count = result.count;
        });


        var colors = ["#6d5cae", "#10cfbd", "#f8d053", "#f55753", "#f8d053", "#10cfbd", "blue"];
        $scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                },
                color: function(d,i){
                    return (d.data && d.data.color) || colors[i % colors.length]
                }
            }
        };

        $scope.data = [
            {
                key: "One",
                y: 5,
            },
            {
                key: "Two",
                y: 2
            },
            {
                key: "Three",
                y: 9,
                color: "yellow"
            },
            {
                key: "Four",
                y: 7
            },
            {
                key: "Five",
                y: 4
            },
            {
                key: "Six",
                y: 3
            },
            {
                key: "Seven",
                y: .5
            }
        ];

        $scope.optionsa = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value + (1e-10);},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.4f')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: -10
                }
            }
        };

        $scope.dataa = [
            {
                key: "Cumulative Return",
                values: [
                    {
                        "label" : "A" ,
                        "value" : -29.765957771107
                    } ,
                    {
                        "label" : "B" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "C" ,
                        "value" : 32.807804682612
                    } ,
                    {
                        "label" : "D" ,
                        "value" : 196.45946739256
                    } ,
                    {
                        "label" : "E" ,
                        "value" : 0.19434030906893
                    } ,
                    {
                        "label" : "F" ,
                        "value" : -98.079782601442
                    } ,
                    {
                        "label" : "G" ,
                        "value" : -13.925743130903
                    } ,
                    {
                        "label" : "H" ,
                        "value" : -5.1387322875705
                    }
                ]
            }
        ];

        $http.get('assets/js/api/charts.json').success(function(data) {
            $scope.widget_4_data = data.nvd3.productRevenue;
            $scope.widget_12_data = data.nvd3.line;
        });

        $http.get('assets/js/api/min_sales_chart.json').success(function(data) {
            $scope.widget_8_data = data.siteVisits;
            $scope.widget_7_data = data.premarket;

        });

        // Widget-4
        $scope.widget_4_options = {
            chart: {
                type: 'lineChart',
                x: function(d) {
                    return d[0]
                },
                y: function(d) {
                    return d[1] / 100
                },
                margin: {
                    top: 60,
                    right: -10,
                    bottom: -10,
                    left: -10
                },
                color: [
                    $.Pages.getColor('success')

                ],
                useInteractiveGuideline: true,
                forceY: [0, 2],
                showLegend: false,
                transitionDuration: 500
            }
        }

        // Widget-8 weekly sales (2nd widget)
        $scope.widget_8_options = {
            chart: {
                type: 'lineChart',
                x: function(d) {
                    return d[0]
                },
                y: function(d) {
                    return d[1]
                },
                margin: {
                    top: 10,
                    right: -10,
                    bottom: -13,
                    left: -10
                },
                color: [
                    '#000'

                ],
                showXAxis: false,
                showYAxis: false,
                showLegend: false,
                useInteractiveGuideline: false
            }
        }

        // Widget-7
        $scope.widget_7_options = {
            chart: {
                type: 'lineChart',
                x: function(d) {
                    return d[0]
                },
                y: function(d) {
                    return d[1]
                },
                margin: {
                    top: 10,
                    right: -10,
                    bottom: 20,
                    left: -10
                },
                color: [
                    '#fff'

                ],
                showXAxis: false,
                showYAxis: false,
                showLegend: false,
                useInteractiveGuideline: false
            }
        }

        // Widget-12 (First widget)
        $scope.widget_12_options = {
            chart: {
                type: 'lineChart',
                x: function(d) {
                    return d[0]
                },
                y: function(d) {
                    return d[1]
                },
                margin: {
                    left: 30,
                    bottom: 35
                },
                color: [
                    $.Pages.getColor('success'),
                    $.Pages.getColor('danger'),
                    $.Pages.getColor('primary'),
                    $.Pages.getColor('complete'),

                ],
                xAxis: {
                    tickFormat: function(d) {
                        return d3.time.format('%a')(new Date(d))
                    }
                },
                yAxis: {
                    tickFormat: d3.format('d')
                },
                showLegend: false,
                useInteractiveGuideline: true,
            }
        }


        // Widget-5
        $scope.options1 = {
            renderer: 'bar'
        };

        $scope.series1 = [{
            name: 'Series 1',
            data: [{
                x: 0,
                y: 10
            }, {
                x: 1,
                y: 8
            }, {
                x: 2,
                y: 5
            }, {
                x: 3,
                y: 9
            }, {
                x: 4,
                y: 5
            }, {
                x: 5,
                y: 8
            }, {
                x: 6,
                y: 10
            }],
            color: $.Pages.getColor('danger')
        }, {
            name: 'Series 2',
            data: [{
                x: 0,
                y: 0
            }, {
                x: 1,
                y: 2
            }, {
                x: 2,
                y: 5
            }, {
                x: 3,
                y: 1
            }, {
                x: 4,
                y: 5
            }, {
                x: 5,
                y: 2
            }, {
                x: 6,
                y: 0
            }],
            color: $.Pages.getColor('master-light')
        }];


        // Widget-14
        var widget_14_seriesData = [
            [],
            [],
            []
        ];
        var random = new Rickshaw.Fixtures.RandomData(50);
        for (var i = 0; i < 50; i++) {
            random.addData(widget_14_seriesData);
        }

        $scope.widget_14_options = {
            renderer: 'area'

        };

        $scope.widget_14_series = [{
            data: widget_14_seriesData[0],
            color: $.Pages.getColor('success-light', .5),
            name: 'DB Server'
        }, {
            data: widget_14_seriesData[1],
            color: $.Pages.getColor('master-light'),
            name: 'Web Server'
        }];

        $scope.widget_14_features = {
            yAxis: {
                tickFormat: function(y) {
                    return y / 10;
                },
                orientation: 'right'
            }
        }


        // Widget-16
        $scope.widget_16_data = [{
            "key": "Site visits",
            "values": [
                [100, 0],
                [150, 8],
                [200, 20],
                [250, 22],
                [300, 30],
                [350, 26],
                [400, 10]
            ]
        }];

        $scope.widget_16_xFunction = function() {
            return function(d) {
                return d[0];
            };
        }
        $scope.widget_16_yFunction = function() {
            return function(d) {
                return d[1];
            };
        }
        $scope.widget_16_colorFunction = function() {
            return function(d, i) {
                return "#27cebc"
            };
        }

        var widget_14_seriesData = [
            [],
            [],
            []
        ];
        var random = new Rickshaw.Fixtures.RandomData(50);
        for (var i = 0; i < 50; i++) {
            random.addData(widget_14_seriesData);
        }

        $scope.widget_14_options = {
            renderer: 'area'

        };

        $scope.widget_14_series = [{
            data: widget_14_seriesData[0],
            color: $.Pages.getColor('success-light', .5),
            name: 'DB Server'
        }, {
            data: widget_14_seriesData[1],
            color: $.Pages.getColor('master-light'),
            name: 'Web Server'
        }];

        $scope.widget_14_features = {
            yAxis: {
                tickFormat: function(y) {
                    return y / 10;
                },
                orientation: 'right'
            }
        }

        // Widget-15-chart2
        var widget_15_2_seriesData = [
            [],
            [],
            []
        ];
        var random = new Rickshaw.Fixtures.RandomData(40);
        for (var i = 0; i < 40; i++) {
            random.addData(widget_15_2_seriesData);
        }

        $scope.widget_15_2_options = {
            renderer: 'bar'

        };

        $scope.widget_15_2_series = [{
            data: widget_15_2_seriesData[0],
            color: $.Pages.getColor('complete-light'),
            name: "New users"
        }, {
            data: widget_15_2_seriesData[1],
            color: $.Pages.getColor('master-lighter'),
            name: "Returning users"
        }];

        $scope.widget_15_2_features = {}



        // Manually Destroy LiveTile objects
        $scope.$on('$destroy', function() {
            $('.live-tile').liveTile("destroy");
        });


    }]);



angular.module('wain013')
    .directive('widget5Chart', function() {
        return {
            restrict: 'C',
            link: function(scope, el, attrs) {

                var container = '.widget-5-chart';

                var seriesData = [
                    [],
                    []
                ];
                var random = new Rickshaw.Fixtures.RandomData(7);
                for (var i = 0; i < 7; i++) {
                    random.addData(seriesData);
                }

                var graph = new Rickshaw.Graph({
                    element: document.querySelector(container),
                    renderer: 'bar',
                    series: [{
                        data: [{
                            x: 0,
                            y: 10
                        }, {
                            x: 1,
                            y: 8
                        }, {
                            x: 2,
                            y: 5
                        }, {
                            x: 3,
                            y: 9
                        }, {
                            x: 4,
                            y: 5
                        }, {
                            x: 5,
                            y: 8
                        }, {
                            x: 6,
                            y: 10
                        }],
                        color: $.Pages.getColor('danger')
                    }, {
                        data: [{
                            x: 0,
                            y: 0
                        }, {
                            x: 1,
                            y: 2
                        }, {
                            x: 2,
                            y: 5
                        }, {
                            x: 3,
                            y: 1
                        }, {
                            x: 4,
                            y: 5
                        }, {
                            x: 5,
                            y: 2
                        }, {
                            x: 6,
                            y: 0
                        }],
                        color: $.Pages.getColor('master-light')
                    }]

                });


                var MonthBarsRenderer = Rickshaw.Class.create(Rickshaw.Graph.Renderer.Bar, {
                    barWidth: function(series) {

                        return 7;
                    }
                });


                graph.setRenderer(MonthBarsRenderer);


                graph.render();


                $(window).resize(function() {
                    graph.configure({
                        width: $(container).width(),
                        height: $(container).height()
                    });

                    graph.render()
                });

                $(container).data('chart', graph);
            }
        };






    });

$('body').on('click', '.mapplic-pin', function(e) {
    e.preventDefault();
    var location = $(e.target).data('location');
    $('#mapplic').data().mapplic.goToLocation(location, 800);
});