'use strict';
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    this.checkCollisions();
    if(this.x > 505)
        this.x = -150;
};
//checking for collision: runs within update method of Enemy
Enemy.prototype.checkCollisions = function() {
    let disX = Math.abs(player.x - this.x);
    let disY = Math.abs(player.y - this.y);
    if(disX < 70 && disY < 20){
        player.x = 101*2;
        player.y = 75*6;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{
    /* this is the constructor for the class Player */
	constructor(x, y){
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }
    /*
        in update method here, we make sure that the player is always in the game frame.
        We also check for collision
    */
	update(){
        if(this.x < 0){
            this.x = 0
        }
        if(this.x > 400){
            this.x = 400
        }
        if(this.y < 75){
            this.y = 75*6
            alert("you win!")
        }
        if(this.y > 75*6){
            this.y = 75*6
        }
        this.checkCollisions();

    }
    //checking for collision: runs within update method of Player(on each move)
    checkCollisions(){
        allEnemies.forEach((enemy)=>{
            let disX = Math.abs(enemy.x - this.x);
            let disY = Math.abs(enemy.y - this.y);
            if(disX < 70 && disY < 20){
                this.x = 101*2
                this.y = 75*6
            }
        });
    }
    /*
        renders the sprite depending on player coordinates(x,y)
    */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //if an arrow key is clicked, the player moves depending on which arrow key is clicked
    handleInput(clickedArrow){
        switch(clickedArrow){
            case "left":  this.x -= 101;break;
            case "right": this.x += 101;break;
            case "up":    this.y -= 75;break;
            case "down":  this.y += 75;break;
        }
        this.update();
        this.render();
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (let i = 0; i < 3; i++) {
    let speed = 80 + (25 * Math.floor(Math.random() * 10))
    let enemy = new Enemy(0, 75*(i+1),speed);
    allEnemies.push(enemy);
}
let player = new Player(101*2,75*6);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}, true);//I've used true for "onCapture" to run listener in the event capture phase
