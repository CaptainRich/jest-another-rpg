
const Potion    = require('../lib/Potion');
const Character = require('./Character');



// If no 'name' is provided, 'name' is set to an empty string.
class Player extends Character {
    constructor(name = '') {
        
        // Call the parent constructor
        super(name);

        // this.name = name;

        // this.health = Math.floor(Math.random() * 10 + 95);
        // this.strength = Math.floor(Math.random() * 5 + 7);
        // this.agility = Math.floor(Math.random() * 5 + 7);

        this.inventory = [new Potion('health'), new Potion()];

        // The problem with these functions in the constructor is that
        // each player has their own set of functions.  Instead pull these
        // out so there is only one copy of these functions in memory.


        // // Return an object with the various player properties
        // this.getStats = function() {
        //     return {
        //         potions: this.inventory.length,
        //         health: this.health,
        //         strength: this.strength,
        //         agility: this.agility
        //     };
        // };

        // // Return the inventory array or false if empty
        // this.getInventory = function() {
        //     if(this.inventory.length) {
        //         return this.inventory;
        //     };
        //     return false;
        // };
    };


    //////////////////////////////////////////////////////////
    // Inherit prototype methods from 'Character' here
    //Player.prototype = Object.create(Character.prototype);


    //////////////////////////////////////////////////////////
    // Can't use ES6 arrow function here, since 'this' is bound
    // to the parent instead of the local scope.

    //Player.prototype.getStats = function () {
    getStats() {
        return {
            potions:  this.inventory.length,
            health:   this.health,
            strength: this.strength,
            agility:  this.agility
        };
    };

    /////////////////////////////////////////////////////////
    //Player.prototype.getInventory = function () {
    getInventory() {

        // Return the inventory array or false if empty

        if (this.inventory.length) {
            return this.inventory;
        };
        return false;
    };

    /// These functions moved to 'character.js' since they are shared by
    /// both the 'Player' and 'Enemy' objects.
    
    // /////////////////////////////////////////////////////////
    // Player.prototype.getHealth = function() {
    //     return `${this.name}'s; health is now ${this.health}!`;
    // };

    // ////////////////////////////////////////////////////////
    // Player.prototype.isAlive = function() {
    //     if(this.health === 0) {
    //         return false;
    //     }
    //     return true;
    // };

    // ////////////////////////////////////////////////////////////
    // Player.prototype.reduceHealth = function(health) {
    //     this.health -= health;

    //     if( this.health < 0 ) {
    //         this.health = 0;
    //     };
    // };

    // ////////////////////////////////////////////////////////////
    // Player.prototype.getAttackValue = function() {
    //     const min = this.strength - 5;
    //     const max = this.strength + 5;

    //     return Math.floor(Math.random() * (max-min) + min);
    // };

    ////////////////////////////////////////////////////////////
    //Player.prototype.addPotion = function(potion) {
    addPotion(potion) {
        this.inventory.push(potion);
    };

    //////////////////////////////////////////////////////////
    //Player.prototype.usePotion = function(index) {
    usePotion(index) {
        const potion = this.getInventory().splice(index, 1)[0];

        switch (potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;
            case 'health':
                this.health = + potion.value;
                break;
            case 'strength':
                this.strength += potion.value;
                break;
        }
    };

};

module.exports = Player;