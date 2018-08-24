// require express and other modules
const express = require('express');
const app = express();

// parse incoming urlencoded form data
// and populate the req.body object
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/
//db for pokemon
const db = require('./models');

//my profile info
const myProfile = {
  name: "SA",
  githubUsername: "sofia-aguirre",
  githubLink: "https://github.com/sofia-aguirre", //url
  githubProfileImage: "https://avatars3.githubusercontent.com/u/41209137?s=460&v=4", //url
  personalSiteLink: "", //url
  currentCity: "Space",
  // pokemonInPokedex: 
};

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', (req, res) => {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "https://github.com/sofia-aguirre/express-personal-api",
    documentationUrl: "https://github.com/example-username/express-personal-api/README.md", 
    baseUrl: "https://still-tor-84279.herokuapp.com/", 
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, 
      {method: "GET", path: "/api/pokemon", description: "My current pokemon"},
      {method: "GET", path: "/api/pokemon/:id", description: "Shows this pokemon's info"},
      {method: "POST", path: "/api/pokemon", description: "Add some pokemon to my research!"} 
    ]
  })
});

// Index for Profile
app.get('/api/profile', (req, res) => {
  res.json({myProfile});
});

// Index for Pokemon (all Pokemon in database)
app.get('/api/pokemon', (req, res) => {
  db.Pokemon.find( {}, (err, allPokemon) => {
    if(err){ return res.status(400).json({err: "error has occured"})}
    console.log("Found pokemon: ", allPokemon.length);
    res.json({data: allPokemon});
  })
});

// // Show one Pokemon by _id
app.get('/api/pokemon/:id', (req, res) => {
  // get pokemon id from url params (`req.params`)
  let pokeId = req.params.id;
  // find pokemon in db by id
  db.Pokemon.findById(pokeId, (err, foundPokemon) => {
    if(err){ return res.status(400).json({err: "error has occured"})} 
    res.json(foundPokemon);
  });
});

// Create a pokemon in database
app.post('/api/pokemon', (req, res) => {
  // create new pokemon variable with form data (`req.body`)
  let newPokemon = req.body;
  console.log(req.body)
  // create new pokemon in db
  db.Pokemon.create(newPokemon, (err, savedPokemon) => {
    if(err){ return res.status(400).json({err: "error has occured"})} 
    res.json(savedPokemon);
  });
});



/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is up and running on http://localhost:3000/');
});
