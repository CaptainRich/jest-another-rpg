
class Character {
    constructor(name = '') { 

        this.name     = name;
        this.health   = Math.floor(Math.random() * 10 + 95);
        this.strength = Math.floor(Math.random() * 5 + 7);
        this.agility  = Math.floor(Math.random() * 5 + 10);
    }

    ///////////////////////////////////////////////////////////////
    //Character.prototype.isAlive = function() {
    isAlive() {
        if (this.health === 0) {
            return false;
        }
        return true;
    };

    ///////////////////////////////////////////////////////////////
    //Character.prototype.getHealth = function() {
    getHealth() {
        return `${this.name}'s health is now ${this.health}!`;
    };

    ///////////////////////////////////////////////////////////////
    //Character.prototype.getAttackValue = function() {
    getAttackValue() {
        const min = this.strength - 5;
        const max = this.strength + 5;

        return Math.floor(Math.random() * (max - min) + min);
    };

    ///////////////////////////////////////////////////////////////
    //Character.prototype.reduceHealth = function(health) {
    reduceHealth(health) {
        console.log( "Original health: ", this.health );
        this.health -= health;      // reduce the character's health by the value passed in.

        if (this.health < 0) {
            this.health = 0;
        }
        console.log( "Final health: ", this.health );
    };
};

module.exports = Character;