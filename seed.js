// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

const db = require('./models');

var pokemon_list = [
    {
    pokedexNumber: 1,
    name: "Bulbasaur",
    primaryType: "Grass",
    secondaryType: " Poison",
    shortDescription: "One of the first three starter Pokemon (Kanto)",
    isLegendary: false
    },
    {
    pokedexNumber: 79,
    name: "Slowpoke",
    primaryType: "Water",
    secondaryType: " Psychic",
    shortDescription: "Takes a long time to respond to everything that's not food (Kanto)",
    isLegendary: false
    },
    {
    pokedexNumber: 93,
    name: "Haunter",
    primaryType: "Ghost",
    secondaryType: " Poison",
    shortDescription: "Mischevious ghost, paralizes prey with a lick from his tongue (Kanto)",
    isLegendary: false
    },
    {
    pokedexNumber: 143,
    name: "Snorlax",
    primaryType: "Normal",
    secondaryType: "",
    shortDescription: "Loves food, loves sleep. Good luck trying to move him out of the way (Kanto)",
    isLegendary: false
    },
    {
    pokedexNumber: 151,
    name: "Mew",
    primaryType: "Psychic",
    secondaryType: "",
    shortDescription: "Known for being able to learn any attack from any Pokemon, very elusive (???)",
    isLegendary: true
    },
]

db.Pokemon.deleteMany( {}, (err, everythingRemoved) => {
    if(err) { return console.log(err) }
    console.log("every pokemon in my db: ", everythingRemoved); 
    // now that everything is deleted can create people
    db.Pokemon.create( pokemon_list, (err, newPokemon) => {
        if(err) { return console.log(err) }
        console.log("saved new pokemon: ", newPokemon);
    });
});