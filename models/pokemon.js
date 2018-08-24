const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const PokemonSchema = new Schema({
    pokedexNumber: Number,
    name: String,
    primaryType: String,
    secondaryType: String,
    shortDescription: String, //should include defining characteristics and location
    isLegendary: Boolean
});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;
