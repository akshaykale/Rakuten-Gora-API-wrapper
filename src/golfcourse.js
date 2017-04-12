
var exports = module.exports = {};


/*

@param resp
resp = {
    "app_id":"",
    "app_secret":"",
    "place":"",
    "date":"",
    "category":""
}
Ex: var appID = resp.app_id;

@return goraResp #response obtained from GORA APIs
*/
function callGoraAPIs(resp) {
    
}


/*
@param goraResp #response obtained from GORA APIs
Parse the response and get the fields according to the response format.
send `null` if no value is specified

@return result
RESPONSE FORMAT
var result ={
  "name":"",
  "desc":"",
  "price":"",
  "address":"",
  "rating":"",
  "pictures":["","",""],
  "reviews":["","",""],
  "book_url":"",
  "location":{
    "lat":"",
    "lng":""
  }
}
*/
function parseGolfCourse(goraResp){
    
}

exports.get = function(date,place,category){
    var responseGORA = callGoraAPIs(date,place,category);

    return listGolfCourse = parseGolfCourse(responseGORA);

}