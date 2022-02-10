module.exports = function( val1, val2 ) {
    if( val1 === val2 ) {
        return true;
    }
    else {
        return false;
    }
};

function randomNumber () {
    // Create a random number between 1 and 10
    return Math.floor( Math.random() * 9 + 1 );
}

module.exports = randomNumber;