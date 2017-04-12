
const
  bodyParser = require('body-parser'),
  express = require('express'),
  https = require('https'),
  logger = require("./logger.js"),
  request = require('request');

// Create a new instance of express
const app = express();

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
//app port
app.set('port', process.env.PORT || 5000);

//GET request just to verify webhook url from fb dashbpard/webhook
app.post('/gora/golfcourse', function (req, res) {
  var data = req.body;
  logger.log(req.body);
  if (("app_id" in data) && ("app_secret" in data)) {
    var place = data.place;
    var date = data.date;
    var category = data.category;
    
    var retData = {
      "title":"",
      "df":""
    }

    res.set('Content-Type', 'text/plain');
    res.send(retData);
  } else {
    logger.log("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});  


// Tell our app to listen on port 
app.listen(app.get('port'), function () {
  logger.log('Node app is running on port', app.get('port'));
});