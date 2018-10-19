var buttonArr = []
var purpleSuit = {
    name: "Sam",
    spriteWidth: 800,
    spriteHeight: 400,
    rows: 2,
    cols: 4,
    trackRight: 0,
    trackLeft: 1,
    reverseRow: false,
    pauseFrame: 0,
    startHeight: 200,
    url: "sprite.png"
};
var greenShirt = {
    name: "James",
    spriteWidth: 512,
    spriteHeight: 254,
    rows: 2,
    cols: 4,
    trackRight: 0,
    trackLeft: 1,
    reverseRow: false,
    pauseFrame: 0,
    startHeight: 250,
    url: "sprite2.png"
};
var puma = {
    name: "Geran",
    spriteWidth: 2048,
    spriteHeight: 256,
    rows: 2,
    cols: 8,
    trackRight: 0,
    trackLeft: 1,
    reverseRow: true,
    pauseFrame: 4,
    startHeight: 250,
    url: "puma.png"
};

var jungle  = {
    width: 1920,
    height: 1080,
    url: "jungle.png"
}
var newyork = {
    width: 1920,
    height: 1080,
    url: "newyork.png"
}

var bg = jungle;
angular.module('characterSelection', [])
    .controller("CharacterSelect", ['$scope', function($scope) {

        $scope.characters = [purpleSuit, greenShirt, puma];
        $scope.go = { selection: purpleSuit };
        $scope.start = function(character) {
            startGame(character, bg)
        }
    }]);

function startGame(character, bg) {
    var canvasWidth = 1200;
    var canvasHeight = 400;

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
    sprite.src = character.url;
    var background = new Image();
    background.src = bg.url
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
        
        if (x >= (3 * canvasWidth / 4) - width && buttonArr.includes('d') && !buttonArr.includes('a')){
            
            bgsrcX += 20
            if (bgsrcX > (bg.width - canvasWidth) && bgsrcX < bg.width){
                ctx.drawImage(background, 0, 0, canvasWidth,bg.height, bg.width-bgsrcX, 0, canvasWidth, canvasHeight);
            }
            else if(bgsrcX >= bg.width){
                bgsrcX = 0
            }
            ctx.drawImage(background, bgsrcX, 0, canvasWidth,bg.height, 0, 0, canvasWidth, canvasHeight);
        }
        else{
            if (bgsrcX > (bg.width - canvasWidth) && bgsrcX < bg.width){
                ctx.drawImage(background, 0, 0, canvasWidth,bg.height, bg.width-bgsrcX, 0, canvasWidth, canvasHeight);
            }
            else if(bgsrcX >= bg.width){
                bgsrcX = 0
            }
            ctx.drawImage(background, bgsrcX, 0, canvasWidth,bg.height, 0, 0, canvasWidth, canvasHeight);
        }



    }

    function draw() {
        updateFrame();
        updateBackground();

        ctx.drawImage(sprite, srcX, srcY, width, height, x, y, width, height);
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
