// Variable to decide if the game is over or not
let levelComplete = false;

// Enemies our player be aware of
//class Enemy to create objects of class Enemy.
class Enemy {
    constructor(x, y) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
    }

    update(dt) {
        this.x = this.x + 65 * dt;
        if (this.x > 500) {
            this.x = 0;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Class to update the enemy's position at a slower pace
class EnemySlow extends Enemy {
    update(dt) {
        this.x = this.x + 20 * dt;
        if (this.x > 500) {
            this.x = 0;
        }
    }
}

// Class to update the enemy's position at a fast pace
class EnemyFast extends Enemy {
    update(dt) {
        this.x = this.x + 100 * dt;
        if (this.x > 520) {
            this.x = 0;
        }
    }
}

//Class player that attempts to cross the area and reach the river
class Player {
    constructor() {
        this.sprite = 'images/char-cat-girl.png';
        this.x = 200;
        this.y = 385;
    }

    update(dt) {}

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Function to handle the inputs of the user
    handleInput(k) {
        switch (k) {
            case 'left':
                this.x = this.x - 20;
                if (this.x < -45) {
                    this.x = -45;
                };
                break;
            case 'right':
                this.x += 20;
                if (this.x > 445) {
                    this.x = 445;
                };
                break;
            case 'up':
                this.y -= 20;
                break;
            case 'down':
                this.y += 20;
                if (this.y > 415) {
                    this.y = 415;
                };
                break;
        }
    }
// Function which checks for the collision 
    checkForCollision() {
        let xLow = this.x - 48;
        let xHigh = this.x + 48;
        let yLow = this.y - 40;
        let yHigh = this.y + 40;
        allEnemies.forEach(function (e) {
            //Checks for the condition if the player
            //falls into the collision window
            //reset the position to the original
            if (e.x > xLow && e.x < xHigh && e.y > yLow && e.y < yHigh) {
                player.x = 200;
                player.y = 405;
            };
        });
    }

    checkForFinish() {
        if (this.y < -10) {
            document.body.querySelector('#completion-popover').style.display = 'block';
            levelComplete = true;
        }
    }
}
// Instantiation of the objects to create game entities
const enemy1 = new Enemy(25, 220);
const enemy2 = new Enemy(200, 220);
const enemy3 = new EnemySlow(-140, 130);
const enemy4 = new EnemySlow(10, 130);
const enemy5 = new EnemySlow(210, 130);
const enemy6 = new EnemyFast(300, 50);
const enemy7 = new EnemyFast(5, 50);
const enemy8 = new EnemyFast(-100, 50);

// All the enemy-objects are put into an array
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8];
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/*
 * Functionality for popover adapted from the w3schools tutorial
 * "How TO - CSS/JS Modal": https://www.w3schools.com/howto/howto_css_modals.asp.
 */
const popoverClose = document.body.querySelectorAll('.popover-close');
const popover = document.body.querySelectorAll('.popover');
const completionPopoverClose = document.body.querySelector('#completion-popover-close');

// Designed to handle possiblity of multiple popovers on page.
popoverClose.forEach(function(x) {
  x.addEventListener('click', closePopover);
});

function closePopover() {
  popover.forEach(function(x) {
    x.style.display = 'none';
  });
  // Reload page if completion popover is displayed.
  if (this.id == 'completion-popover-close') {
    location.reload();
  }
}

// Refresh page if user selects to play again on displaying completion popover.
document.querySelector("#play-again-button").addEventListener('click', function () {
  location.reload();
});
