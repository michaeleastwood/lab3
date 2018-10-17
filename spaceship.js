var buttonArr = []
var purpleSuit = {
    name: "Sam",
    spriteWidth: 800,
    spriteHeight: 400,
    rows: 2,
    cols: 4,
    trackRight: 0,
    trackLeft: 1,
    url: "sprite.png"
};
var greenShirt = {
    name: "James",
    spriteWidth: 449,
    spriteHeight: 254,
    rows: 2,
    cols: 4,
    trackRight: 0,
    trackLeft: 1,
    url: "sprite2.png"
};

angular.module('characterSelection', [])
    .controller("CharacterSelect", ['$scope', function($scope) {
        
        $scope.characters = [ purpleSuit, greenShirt ];
        $scope.go = { selection: purpleSuit.name };
    }]);

function startGame(character) {
    var canvasWidth = 800;
    var canvasHeight = 400;

    var spriteWidth = character.spriteWidth;
    var spriteHeight = character.spriteHeight;

    var pauseFrame = 0;

    var rows = character.rows;
    var cols = character.cols;

    var trackRight = character.trackRight;
    var trackLeft = character.trackLeft;

    var width = spriteWidth / cols;
    var height = spriteHeight / rows;

    var curFrame = 0;
    var frameCount = 4;

    var x = 0;
    var y = 200;

    var srcX;
    var srcY;



    var speed = 24;

    var canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    var ctx = canvas.getContext("2d");

    var character = new Image();
    character.src = character.url;
    var background = new Image();
    background.src = "grass.png"

    function updateFrame() {
        curFrame = ++curFrame % frameCount;
        srcX = curFrame * width;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        if (buttonArr.includes('a') && buttonArr.includes('d')) {
            srcX = pauseFrame * width;
        }
        else if (buttonArr.includes('a')) {
            srcY = trackLeft * height;
            if (x > 0) {
                x -= speed;
            }
        }
        else if (buttonArr.includes('d')) {
            srcY = trackRight * height;
            if (x < (3 * canvasWidth / 4) - width) {
                x += speed;
            }
        }
        else {
            srcX = pauseFrame * width;
        }
    }

    function draw() {
        updateFrame();
        ctx.drawImage(background, 0, 0, 1920, 1080, 0, 0, 800, 400);
        ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);
    }



    setInterval(draw, 100);

}

window.addEventListener("keydown", keydown);

window.addEventListener("keyup", keyup);

//setInterval(draw, 200);
//setInterval(gameLoop, 1000 / 60);

/*function draw() {
    console.log(buttonArr)

}

function gameLoop() {

    window.requestAnimationFrame(gameLoop);

}*/

function keyup(event) {
    buttonArr.splice(buttonArr.indexOf(event.key.toLowerCase()), 1)
}

function keydown(event) {
    console.log(event.key)
    if (!buttonArr.includes(event.key.toLowerCase())) {
        buttonArr.push(event.key.toLowerCase());
    }
}
