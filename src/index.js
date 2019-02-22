
const
  bodyParser = require('body-parser'),
  express = require('express'),
  https = require('https'),
  logger = require("./logger.js"),
  request = require('request'),
  golfcourse = require("./golfcourse.js"),
  golfplan = require("./golfplan.js"),
  hotels = require("./hotels.js"),
  ichibaitem = require("./ichibaitem.js");

// Create a new instance of express
const app = express();

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.raw({ extended: false }));
//app port
app.set('port', process.env.PORT || 5000);

//POST /gora/golfcourse
app.get('/gora/golfcourse', function (req, res) {
  
  //logger.log(JSON.stringify(req));
  
  var date = req.query.date; //JSON object with all the request data
  var place = req.query.place;

  logger.log(place + "body:   ->   "+date);
  
  //data = JSON.parse(data);
  //logger.log("REQUEST params: -> "+ JSON.stringify(req));
  if (date && place) {
    
    golfcourse.get(date, place, res);

  } else {
    logger.log("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});  

//POST /gora/golfplan
app.get('/gora/golfplan', function (req, res) {
  var date = req.query.date; //JSON object with all the request data
  var place = req.query.place;
  //data = JSON.parse(data);
  //logger.log("REQUEST params: -> "+ JSON.stringify(data));
  if (date && place) {
    
    golfplan.get(date, place, res);

  } else {
    logger.log("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
}); 

//POST /gora/ichiba
app.get('/gora/ichibaitem', function (req, res) {
  var key = req.query.keyword; //JSON object with all the request data
  var sex = req.query.gender
  //data = JSON.parse(data);
  //logger.log("REQUEST params: -> "+ JSON.stringify(data));
  if (key && sex) {
    
    ichibaitem.get(key, sex, res);

  } else {
    logger.log("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});  

//POST /gora/hotels
app.get('/gora/hotels', function (req, res) {
  var cin = req.query.cin; //JSON object with all the request data
  var cout = req.query.cout;
  var lat = req.query.lat;// || null;
  var lng = req.query.lng;
  //data = JSON.parse(data);
  //logger.log("REQUEST params: -> "+ JSON.stringify(data));
  if (cin && cout && lat && lng) {
    
    hotels.get(cin, cout, lat, lng, res);

  } else {
    logger.log("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});  

app.post('/getMovieInfo', (req, res) => {
  console.log('hit');
  const API_KEY = process.env.IMDB_API;
  const http = require('http');
  const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
  console.log(req.body);
  const reqUrl = encodeURI(`http://www.omdbapi.com/?t=${movieToSearch}&apikey=${API_KEY}`);
  http.get(reqUrl, (responseFromAPI) => {
      let completeResponse = '';
      responseFromAPI.on('data', (chunk) => {
          completeResponse += chunk;
      });
      responseFromAPI.on('end', () => {
          const movie = JSON.parse(completeResponse);
          let dataToSend = movieToSearch === 'The Godfather' ? `I don't have the required info on that. Here's some info on 'The Godfather' instead.\n` : '';
          dataToSend += `${movie.Title} is a ${movie.Actors} starer ${movie.Genre} movie, released in ${movie.Year}. It was directed by ${movie.Director}`;

          return res.json({
              speech: dataToSend,
              displayText: dataToSend,
              source: 'get-movie-details'
          });
      });
  }, (error) => {
      return res.json({
          speech: 'Something went wrong!',
          displayText: 'Something went wrong!',
          source: 'get-movie-details'
      });
  });
});



// Tell our app to listen on port 
app.listen(app.get('port'), function () {
  logger.log('Node app is running on port', app.get('port'));
});
