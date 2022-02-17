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
            message: 'What is your player name?'
        })
        // Destructure name from the prompt object.  Use => notation so that 'this'
        // refers to the 'Game' object.
        .then(({ name }) => {
            this.player = new Player(name);

            // Test the object creation
            console.log(this.currentEnemy, this.player);

            // Start a new battle.
            this.startNewBattle();
        });
};

//////////////////////////////////////////////////////////
Game.prototype.startNewBattle = function() {

    if(this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else{
        this.isPlayerTurn = false;
    };

    // Display the current 'player' stats, and the current enemy.
    console.log( 'Your stats are as follows:' );
    console.table( this.player.getStats() );          // output is formatted as a table
    console.log( this.currentEnemy.getDescription() );

    // Start the current turn's battle.
    this.battle();
};

///////////////////////////////////////////////////////////
Game.prototype.battle = function() {

    if (this.isPlayerTurn) {
        // Prompt the player for the next action
        console.log( " " );
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use a potion']
            })
            .then(({action}) => {
                // Here the player (tries to) use a potion
                if (action === 'Use a potion') {
                    // Prompt for which potion to use.
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        return this.checkEndOfBattle();
                    };

                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use:',
                            name: 'action',
                            // Here we build a string with a number (index) followed nby the potion name
                            choices: this.player.getInventory().map((item,index) => `${index+1}: ${item.name}`)
                        })
                        .then(({ action }) => {
                            const potionDetails = action.split(': ');  // get the index number/name as two values

                            this.player.usePotion(potionDetails[0]-1);               // the index
                            console.log(`You used a ${potionDetails[1]} potion.`);   // the name
                            this.checkEndOfBattle();
                        });
                }
                // Here the player attacks the enemy
                else {
                    // Get the strength and agility of both the player and enemy.  Invoke the modification 
                    // function to see if the attacker's damage (attack) value will be increased or decreased.
                    const attackerStrength = this.player.strength;
                    const attackerAgility  = this.player.agility;
                    const defenderStrength = this.currentEnemy.strength;
                    const defenderAgility  = this.currentEnemy.agility;

                    let modifier = this.getAttackModifier( attackerStrength, attackerAgility, defenderStrength, defenderAgility );

                    // Since there are 3 enemies to fight, multiply the modifier by 3 if it is positive.
                    if( modifier > 0 )
                        modifier *= 3;

                    let damage = this.player.getAttackValue();
                    console.log( "Player's attack and modifier: ", damage, modifier );
                    damage += modifier;                           // adjust based on relative strength and agility
                    this.currentEnemy.reduceHealth(damage);

                    console.log( `You attacked the ${this.currentEnemy.name}`);
                    console.log( this.currentEnemy.getHealth() );
                    this.checkEndOfBattle();
                };
            });
    }
    else {
        // Get the strength and agility of both the player and enemy.  Invoke the modification 
        // function to see if the attacker's damage (attack) value will be increased or decreased.
        const attackerStrength = this.currentEnemy.strength;
        const attackerAgility  = this.currentEnemy.agility;
        const defenderStrength = this.player.strength;
        const defenderAgility  = this.player.agility;

        const modifier = this.getAttackModifier(attackerStrength, attackerAgility, defenderStrength, defenderAgility);

        // For the enemy's turn, reduce the player's health
        // by the enemy's attack value.
        let damage = this.currentEnemy.getAttackValue();
        console.log( "Enemy's attack and modifier: ", damage, modifier );
        damage += modifier;                                        // adjust based on relative strength and agility
        this.player.reduceHealth(damage);

        console.log( " " );
        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
        this.checkEndOfBattle();
    };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Game.prototype.checkEndOfBattle = function() {

    if(this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;                // this statement alternates turns
        this.battle();
    }
    else if(this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}`);

        this.player.addPotion(this.currentEnemy.potion);      // consume an enemy's potion
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name}`);

        this.roundNumber++;
        console.log( " ");
        console.log( "Round ", this.roundNumber, " starting." );

        if(this.roundNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        }
        else {
            console.log("You win!");
        };
    }
    else {
        console.log("You have been defeated!");
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Game.prototype.getAttackModifier = function ( attackerStrength, attackerAgility, defenderStrength, defenderAgility ) {
    var modifier = 0;

    // If both the strength and agility of the attacker are greater than the defender's, set the modifier to 3.
    if( attackerAgility > defenderAgility  && attackerStrength > defenderStrength ) {
        modifier = 3;
    }
    // If only the attacker's strength is greater than the defender's, set the modifier to 2.
    else if( attackerStrength > defenderStrength ) {
        modifier = 2;
    }
    // If only the attacker's agility is greater than the defender's, set the modifier to 1.
    else if( attackerAgility > defenderAgility ) {
        modifier = 1;
    }

    // If both the strength and agility of the defender are greater than the attacker's, set the modifier to -3.
    if( defenderAgility > attackerAgility  &&  defenderStrength > attackerStrength ) {
        modifier = -3;
    }

    // If either of the defender's strength or agility is greater than the attacker's, reduce the modifier by 1.
    else if( defenderAgility > attackerAgility ){
        modifier--;
    }

    else if( defenderStrength > attackerStrength ) {
        modifier--;
    }

    return modifier;
    
}

module.exports = Game;