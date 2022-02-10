const Potion = require( '../lib/Potion.js' );  // import the actual functions to be tested
const { TestScheduler } = require('jest');


// Test Suite 1
// Test 1
test('Creates a health potion object', () => {
    const potion = new Potion( 'health' );      // Create a 'Potion' object with the name 'health'

    expect( potion.name ).toBe('health');
    expect( potion.value ).toEqual(expect.any(Number));
});


// Test 2 
test('Creates a random potion object', () => {
    const potion = new Potion();                // Create a random 'Potion' object

    expect( potion.name ).toEqual(expect.any(String));     // a random name from the array
    expect( potion.name.length) .toBeGreaterThan(0);
    expect( potion.value ).toEqual(expect.any(Number));    // a random number

});