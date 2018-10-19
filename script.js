var buttonArr = []
window.addEventListener("keydown", keydown);

window.addEventListener("keyup", keyup);

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
            }, {
                "shape": "circle",
                "type": "Ocean",
                "coords": "10,10,30"
            }];
            $scope.characters = [{
                id: "Sam",
                spriteWidth: 800,
                spriteHeight: 400,
                rows: 2,
                cols: 4,
                trackRight: 0,
                trackLeft: 1,
                reverseRow: false,
                pauseFrame: 0,
                startHeight: 400,
                src: "sprite.png"
            }, {
                id: "James",
                spriteWidth: 512,
                spriteHeight: 254,
                rows: 2,
                cols: 4,
                trackRight: 0,
                trackLeft: 1,
                reverseRow: false,
                pauseFrame: 0,
                startHeight: 450,
                src: "sprite2.png"
            }, {
                id: "Geran",
                spriteWidth: 2048,
                spriteHeight: 256,
                rows: 2,
                cols: 8,
                trackRight: 0,
                trackLeft: 1,
                reverseRow: true,
                pauseFrame: 4,
                startHeight: 450,
                src: "puma.png"
            }, {
                id: "Kevin",
                spriteWidth: 650,
                spriteHeight: 431,
                rows: 2,
                cols: 4,
                trackRight: 0,
                trackLeft: 1,
                reverseRow: false,
                pauseFrame: 0,
                startHeight: 400,
                src: "sprite3.png"
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
            switch ($scope.location) {
                case "New York City":
                    $scope.image = {
                        width: 1920,
                        height: 1080,
                        src: "newyork.png"
                    }
                    break;
                case "Russia":
                    $scope.image = {
                        width: 1920,
                        height: 1439,
                        src: "russia.png"
                    }
                    break;
                case "Ocean":
                    $scope.image = {
                        width: 1920,
                        height: 960,
                        src: "water.png"
                    }
                    break;
                case "Amazon":
                    $scope.image = {
                        width: 1920,
                        height: 1080,
                        src: "jungle.png"
                    }
                    break;
                case "Africa":
                    $scope.image = {
                        width: 1920,
                        height: 1152,
                        src: "desert.png"
                    }
                    break;
                case "Europe":
                    $scope.image = {
                        width: 1920,
                        height: 1447,
                        src: "beach.png"
                    }
                    break;
            }

            console.log($scope.image)
            console.log(charFactory.char)
            startGame(charFactory.char, $scope.image)

        }
    ]);

function startGame(character, bg) {
    var canvasWidth = 1300;
    var canvasHeight = 600;

    var spriteWidth = character.spriteWidth;
    var spriteHeight = character.spriteHeight;

    var pauseFrame = character.pauseFrame;

    var rows = character.rows;
    var cols = character.cols;

    var trackRight = character.trackRight;
    var trackLeft = character.trackLeft;

    var width = spriteWidth / cols;
    var height = spriteHeight / rows;

    var curFrame = 0;
    var frameCount = character.cols;

    var x = 0;
    var y = character.startHeight;

    var srcX;
    var srcY;



    var speed = 24;

    var canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    var ctx = canvas.getContext("2d");

    var sprite = new Image();
    sprite.src = character.src;
    var background = new Image();
    background.src = bg.src
    var bgsrcX = 0;

    function updateFrame() {

        if (buttonArr.includes('a') && buttonArr.includes('d')) {
            curFrame = ++curFrame % frameCount;
            srcX = curFrame * width;
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            srcX = pauseFrame * width;
        }
        else if (buttonArr.includes('a')) {
            if (character.reverseRow) {
                if (curFrame == 0) {
                    curFrame = frameCount - 1;
                }
                else {
                    curFrame = --curFrame % frameCount;
                }
            }
            else {
                curFrame = ++curFrame % frameCount;
            }
            srcX = curFrame * width;
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            srcY = trackLeft * height;
            if (x > 0) {
                x -= speed;
            }
        }
        else if (buttonArr.includes('d')) {
            curFrame = ++curFrame % frameCount;
            srcX = curFrame * width;
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            srcY = trackRight * height;
            if (x < (3 * canvasWidth / 4) - width) {
                x += speed;
            }
        }
        else {
            curFrame = ++curFrame % frameCount;
            srcX = curFrame * width;
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            srcX = pauseFrame * width;
        }
    }

    function updateBackground() {

        if (x >= (3 * canvasWidth / 4) - width && buttonArr.includes('d') && !buttonArr.includes('a')) {

            bgsrcX += 20
            if (bgsrcX > (bg.width - canvasWidth) && bgsrcX < bg.width) {
                ctx.drawImage(background, 0, 0, canvasWidth, bg.height, bg.width - bgsrcX, 0, canvasWidth, canvasHeight);
            }
            else if (bgsrcX >= bg.width) {
                bgsrcX = 0
            }
            ctx.drawImage(background, bgsrcX, 0, canvasWidth, bg.height, 0, 0, canvasWidth, canvasHeight);
        }
        else {
            if (bgsrcX > (bg.width - canvasWidth) && bgsrcX < bg.width) {
                ctx.drawImage(background, 0, 0, canvasWidth, bg.height, bg.width - bgsrcX, 0, canvasWidth, canvasHeight);
            }
            else if (bgsrcX >= bg.width) {
                bgsrcX = 0
            }
            ctx.drawImage(background, bgsrcX, 0, canvasWidth, bg.height, 0, 0, canvasWidth, canvasHeight);
        }



    }

    function draw() {
        updateFrame();
        updateBackground();

        ctx.drawImage(sprite, srcX, srcY, width, height, x, y, width, height);
    }



    setInterval(draw, 100);

}




function keyup(event) {
    buttonArr.splice(buttonArr.indexOf(event.key.toLowerCase()), 1)
}

function keydown(event) {
    console.log(event.key)
    if (!buttonArr.includes(event.key.toLowerCase())) {
        buttonArr.push(event.key.toLowerCase());
    }
}
