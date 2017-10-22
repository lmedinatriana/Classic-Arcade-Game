// Whole-script strict mode syntax
'use strict';

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     this.x += this.speed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 900) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }

    // Collision between player and enemies
    if (player.x + 25 <= this.x + 88 &&
        player.x + 76 >= this.x + 11 &&
        player.y + 131 >= this.y + 90 &&
        73 + player.y <= this.y + 135) {
         player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
};


Player.prototype.update = function(dt) {
    // function not needed right now

     // increaseDifficulty function
    if (this.y + 63 <= 0) {
        this.x = 202.5;
        this.y = 383;
        console.log('you made it!');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 1000, 171);

        score += 1;
        gameLevel += 1;
        console.log('current score: ' + score + ', current level: ' + gameLevel);
        increaseDifficulty(score);

    }

    // Canvas Limit
    // Character will not go outside the canvas
    if (this.y > 383) {
        this.y = 383;
    }
    if (this.x > 900) {
        this.x = 900;
    }
    if (this.x < 2.5) {
        this.x = 2.5;
    }
};

// Draw the player on the screen, required method for game
// Display score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, gameLevel);

};

Player.prototype.handleInput = function(pressedKey) {
    if (pressedKey == 'left') {
        this.x -= this.speed;
    }
    if (pressedKey == 'up') {
        this.y -=this.speed - 20;
    }
    if (pressedKey == 'right') {
        this.x += this.speed;
    }
    if (pressedKey == 'down') {
        this.y += this.speed - 20;
    }
    console.log('pressedKey is: ' + pressedKey);
};

// Function to display player's score
var displayScoreLevel = function(aScore, aLevel) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // Player Score and Level
    scoreLevelDiv.innerHTML = 'Score: ' + aScore +
        ' / ' + 'Level: ' + aLevel;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};


// Number of enemies
var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

        allEnemies.push(enemy);
    }
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 380;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// New score and level
var allEnemies = [];
var player = new Player(450, 383, 40);
var score = 0;
var gameLevel = 0;
var scoreLevelDiv = document.createElement('div');
var enemy = new Enemy(0, Math.random() * 184 + 40, Math.random() * 256);

allEnemies.push(enemy);

document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});



// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};