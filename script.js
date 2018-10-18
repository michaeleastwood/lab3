angular.module('game', ['ui.router'])
    .factory('locFactory', [function() {
        var o = {
            loc: ''
        };
        return o;
    }])
    .factory('charFactory', [function() {
        var o = {
            char: ''
        };
        return o;
    }])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'HomeCtrl'
                })
                .state('game', {
                    url: '/game/',
                    templateUrl: '/game.html',
                    controller: 'GameCtrl'
                });
            $urlRouterProvider.otherwise('home');
        }
    ])
    .controller('HomeCtrl', [
        '$scope',
        'locFactory',
        'charFactory',
        function($scope, locFactory, charFactory) {
            $scope.map = [{
                "shape": "rect",
                "type": "New York City",
                "coords": "82,85,150,150"
            }, {
                "shape": "circle",
                "type": "Amazon",
                "coords": "150,200,40"
            }, {
                "shape": "circle",
                "type": "Europe",
                "coords": "210,150,25"
            }, {
                "shape": "circle",
                "type": "Africa",
                "coords": "250, 200, 30"
            }, {
                "shape": "circle",
                "type": "Russia",
                "coords": "300,100,75"
            }];
            $scope.characters = [{
                "id" : "",
                "src" : "",
                "height" : "",
                "width" : ""
            }]
            $scope.location = locFactory.loc;
            $scope.character = charFactory.char;

            // $scope.start = function() {
            //     alert("here");
            //     if ($scope.location === '' || $scope.character === '') { return; }
            // //    locFactory.loc = $scope.location;
            //   //  charFactory.character = $scope.character;
            // };
            $scope.partClicked = function(id) {
                $scope.location = id;
                locFactory.loc = id;
            };
            $scope.charClicked = function(id) {
                $scope.character = id;
                charFactory.char = id;
            }
        }
    ])
    .controller('GameCtrl', [
        '$scope',
        'locFactory',
        'charFactory',
        function($scope, locFactory, charFactory) {
            $scope.location = locFactory.loc;
            switch($scope.location){
                case "New York City":
                    $scope.image = "grass.png"
            }

        }
    ]);
