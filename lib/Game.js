// Reference the other modules needed.

const inquirer = require( 'inquirer' );
const Enemy    = require( './Enemy' );
const Player   = require( './Player' );


/////////////////////////////////////////////////////////
function Game() {

    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;

};

///////////////////////////////////////////////////////
Game.prototype.initializeGame = function() {

    // Setup the enemies
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    // Start the game with the first enemy
    this.currentEnemy = this.enemies[0];

    // Now prompt the user for their name.
    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        // Destructure name from the prompt object
        .then(({ name }) => {
            this.player = new Player(name);

            // Test the object creation
            //console.log(this.currentEnemy, this.player);

            // Start a new battle.
            this.startNewBattle();
        });
};

module.exports = Game;