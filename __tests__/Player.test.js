////////////////////////////////////////////////////////////////
// Import the 'Potion' constructor and its 'mocked' data
const Potion = require('../lib/Potion');
jest.mock('../lib/Potion');          // this replaces the Potion constructor with the mocked data.
//console.log( new Potion() );

////////////////////////////////////////////////////////////////
const Player = require( '../lib/Player' );


// Test Suite 2
// Test 1
test('Creates a player object', () => {
    const player = new Player( 'Dave' );

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

// Test 2
// Verify the 'player' object has 4 specific properties.
test("Get player's stats as an object", () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

// Test 3
// Check player inventory on creation and then when empty.
test('Gets inventory from player or returns false', () => {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

// Test 4
// Check player health, converted to string incase the display is 
// changed later in an update.
test("Gets player's health value", () => {
    const player = new Player('Dave');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

// Test 5
// Verify both a "live" and "dead" player.
test('Checks if player is alive or not', () => {
    const player = new Player('Dave');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;
    expect(player.isAlive()).toBeFalsy();
});

// Test 6
// Test reducing a player's health, and that 
// the minimum health is zero.
test("Subtracts from player's health", () => {
    const player    = new Player('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);
    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);
    expect(player.health).toBe(0);
});

// Test 7
// Here we test for an allowed range.
test("Gets player's attack value", () => {
    const player    = new Player('Dave');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

// Test 8
test('Adds a potion to the inventory', () => {
    const player   = new Player('Dave');
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());
    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

// Test 9
// Need to know which potion is being used, then reduce
// the inventory.
test('Uses a potion from inventory', () => {
    const player = new Player('Dave');

    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount   = player.inventory.length;

    player.usePotion(1);
    expect(player.inventory.length).toBeLessThan(oldCount);
});