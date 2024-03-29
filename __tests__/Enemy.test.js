

const Enemy = require('../lib/Enemy.js');

/////////////////////////////////////////////////////
// Import the 'potion' object and its mocked data
const Potion = require('../lib/Potion.js');
jest.mock('../lib/Potion.js');


// Test suite 3
// Test 1
test('Creates an enemy object', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.name).toBe('goblin');
    expect(enemy.weapon).toBe('sword');
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.potion).toEqual(expect.any(Object));
});

// Test 2
// Check enemy health, converted to string incase the display is 
// changed later in an update.
test("Gets enemy's health value", () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
});


// Test 3
// Verify both a "live" and "dead" enemy.
test('Checks if enemy is alive or not', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.isAlive()).toBeTruthy();

    enemy.health = 0;
    expect(enemy.isAlive()).toBeFalsy();
});

// Test 4
// Test reducing an enemy's health, and that 
// the minimum health is zero.
test("Subtracts from enemy's health", () => {
    const enemy = new Enemy('goblin', 'sword');
    const oldHealth = enemy.health;

    enemy.reduceHealth(5);
    expect(enemy.health).toBe(oldHealth - 5);

    enemy.reduceHealth(99999);
    expect(enemy.health).toBe(0);
});

// Test 5
// Here we test for an allowed range.
test("Gets enemy's attack value", () => {
    const enemy = new Enemy('goblin', 'sword');
    enemy.strength = 10;

    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});

// Test 6
test('Gets a description of the enemy', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getDescription()).toEqual(expect.stringContaining('goblin'));
    expect(enemy.getDescription()).toEqual(expect.stringContaining('sword'));
});
