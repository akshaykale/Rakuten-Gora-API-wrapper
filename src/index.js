
const
  bodyParser = require('body-parser'),
  express = require('express'),
  https = require('https'),
  logger = require("./logger.js"),
  request = require('request'),
  golfcourse = require("./golfcourse.js"),
  golfplan = require("./golfplan.js"),
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
app.post('/gora/golfcourse', function (req, res) {
  var data = req.body.param; //JSON object with all the request data
  data = JSON.parse(data);
  logger.log("REQUEST params: -> "+ JSON.stringify(data));
  if (("app_id" in data) && ("app_secret" in data)) {
    
    golfcourse.get(data, res);

  } else {
    logger.log("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});  

//POST /gora/golfplan
app.post('/gora/golfplan', function (req, res) {
  var data = req.body.param; //JSON object with all the request data
  data = JSON.parse(data);
  logger.log("REQUEST params: -> "+ JSON.stringify(data));
  if (("app_id" in data) && ("app_secret" in data)) {
    
    golfplan.get(data, res);

  } else {
    logger.log("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
}); 

//POST /gora/ichiba
app.post('/gora/ichibaitem', function (req, res) {
  var data = req.body.param; //JSON object with all the request data
  data = JSON.parse(data);
  logger.log("REQUEST params: -> "+ JSON.stringify(data));
  if (("app_id" in data) && ("app_secret" in data)) {
    
    ichibaitem.get(data, res);

  } else {
    logger.log("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});  


// Tell our app to listen on port 
app.listen(app.get('port'), function () {
  logger.log('Node app is running on port', app.get('port'));
});