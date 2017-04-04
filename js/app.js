/*jshint esversion: 6 */
var yLoc = [74,156,238];

// Enemies our player must avoid
var Enemy = function() {
    //set starting values for x,y,speed
    this.reset();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
    //Updates emeny's position and render it.
    this.x = this.x + this.speed;
    this.render();

    //If enemy is off the screen, reset it.
    if(this.x > 490){
      this.reset();
    }

    //Handle collisions with player:
    if(this.y === player.y){
      var xTopRange = this.x + 70;
      var xBotRange = this.x - 70;
      if(player.x >= xBotRange && player.x <= xTopRange){
        player.reset();
        this.reset();
      }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset enemy x,y,speed values
Enemy.prototype.reset = function(){
  this.x = -1 * (Math.floor(Math.random() * 250 + 100));
  this.y = yLoc[Math.floor(Math.random() * 3)];
  this.speed = Math.floor(Math.random() * 7 + 1);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
  // Set initial player values
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 402;
};

Player.prototype = {
  //update location of player
  update: function(x=0, y=0){
    this.x += x;
    this.y += y;

    if (this.x > 400) this.x = 400;
    if (this.x < 0) this.x = 0;
    if (this.y > 402) this.y = 402;
    if (this.y < -8) this.reset();
    // if (this.y < -8) this.y = -8;

    player.render(); //render the updates
  },
  render: function(){ //draw the player on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  },
  reset: function(){ //reset the player to starting position
    this.x = 200;
    this.y = 402;
  },
  handleInput: function(key){ //transform key values to numerical changes
    var x = 0;
        y = 0;
    switch (key) {
      case 'left':
        x = -100;
        break;
      case 'right':
        x = 100;
        break;
      case 'up':
        y = -82;
        break;
      case 'down':
        y = 82;
        break;
    }
    player.update(x,y);
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// create 6 enemies and save them to the allEnemies array
var allEnemies = [];
for(var i = 0; i < 6; i++){
  allEnemies.push(new Enemy());
}

//create our new player
var player = new Player();

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
});
