$(document).ready(function() {

// base API route
var baseUrl = '/api/pokemon';

// array to hold pokemon data from API
var allPokemon = [];

// element to display list of pokemon
var $pokemonList = $('#pokemon-list');

// form to create new pokemon
var $createPokemon = $('#create-pokemon');

let onSuccess = function onIndexSuccess(json) {
    console.log(json);
    let pokemans = json.data
    pokemans.forEach(function(pokemon){
        $('#pokemon-list').append(
            `
    <li class="list-group-item pokemon" data-id="${pokemon._id}">
        <span class="label label-default">${pokemon.name}</span>
        ${pokemon.shortDescription}</li>
    `
        );
    })
}


// GET all pokemon on page load
$.ajax({
    method: "GET",
    url: baseUrl,
    success: onSuccess ,
});




// listen for submit even on form
$createPokemon.on('submit', function (event) {
event.preventDefault();

// serialze form data
var newPokemon = $(this).serialize();

console.log(newPokemon);
    // POST request to create new pokemon
    $.ajax({
        method: "POST",
        url: baseUrl,
        data: newPokemon,
        success: function onCreateSuccess(json) {
        console.log(json);
        window.location.reload();

        }
    });
    // reset the form
    $createPokemon[0].reset();
    $createPokemon.find('input').first().focus();
    });

//end of document ready
});