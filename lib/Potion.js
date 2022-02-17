

// function Potion( name ) {
//     this.types = ['strength', 'agility', 'health'];
//     this.name = name || this.types[Math.floor(Math.random()*this.types.length)];

//     if( this.name === 'health' ) {
//         this.value = Math.floor(Math.random() * 10 + 30 );
//     }
//     else {
//         this.value = Math.floor(Math.random() * 5 + 7 );
//     }
// }

class Potion {
    constructor(name) {      // 'constructor' is needed to allow an argument to the constructor
        this.types = ['strength', 'agility', 'health'];
        // IF 'name' is specified use it, otherwise randomly select from the array.
        this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

        if (this.name === 'health') {
            this.value = Math.floor(Math.random() * 10 + 30);   // health potions get values from 30-40
        }
        else {
            this.value = Math.floor(Math.random() * 5 + 7);     // other potions get values form 7-12
        };
    };
};

module.exports = Potion;