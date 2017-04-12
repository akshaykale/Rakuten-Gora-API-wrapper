
var exports = module.exports = {};

const 
    Client = require('node-rest-client').Client,
    logger = require("./logger.js");

var restClient = new Client();

var areacodes = {
    "hokkaido" : "1",
    "aomori" : "2",
    "iwate" : "3",
    "miyagi" : "4",
    "akita" : "5",
    "yamagata" : "6",
    "fukushima" : "7",
    "ibaraki" : "8",
    "tochigi" : "9",
    "gunma" : "10",
    "saitama" : "11",
    "chiba" : "12",
    "tokyo" : "13",
    "kanagawa" : "14",
    "yamanashi" : "19",
    "nagano" : "20",
    "shizuoka" : "22",
    "nigata" : "15",
    "toyama" : "16",
    "ishikawa" : "17",
    "fukui" : "18",
    "gifu" : "21",
    "aichi" : "23",
    "mie" : "24",
    "shiga" : "25",
    "kyoto" : "26",
    "osaka" : "27",
    "hyogo" : "28",
    "nara" : "29",
    "wakayama" : "30",
    "tottori" : "31",
    "shimane" : "32",
    "okayama" : "33",
    "hiroshima" : "34",
    "yamaguchi" : "35",
    "tokushima" : "36",
    "kagawa" : "37",
    "ehime" : "33",
    "kochi" : "39",
    "fukuoka" : "40",
    "saga" : "41",
    "nagasaki" : "42",
    "kumamoto" : "43",
    "oita" : "44",
    "miyazaki" : "45",
    "kagoshima" : "46",
    "okinawa" : "47"
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


function parseGolfCourse(goraResp, res){
    
    var results = [];
    
    for (item in goraResp.Items) {
        result = {"name" : goraResp.Items[item]["Item"]["golfCourseName"], 
        "desc" : goraResp.Items[item]["Item"]["golfCourseCaption"],
        "price" : null,
        "address" : goraResp.Items[item]["Item"]["address"],
        "rating" : goraResp.Items[item]["Item"]["evaluation"],
        "picture" : goraResp.Items[item]["Item"]["golfCourseImageUrl"],
        "reviews" : goraResp.Items[item]["Item"]["ratingUrl"],
        "book_url" : goraResp.Items[item]["Item"]["reserveCalUrl"],
        "location" : {"lat" : goraResp.Items[item]["Item"]["latitude"], "lng" : goraResp.Items[item]["Item"]["longitude"]}};
        results.push(result);
    }
    
    //logger.log(results);
    res.set('Content-Type', 'text/plain');
    res.send(results);
}



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

exports.get = function(param,resp){
    //logger.log(resp);
    var areaCode = areacodes[param.place];
    var URL = "https://app.rakuten.co.jp/services/api/Gora/GoraGolfCourseSearch/20131113?format=json&hits=5&sort=evaluation&" + "areaCode=" + areaCode + "&applicationId=" + param.app_id;

    restClient.get(URL, function (data, res) {
        // parsed response body as js object 
        //logger.log(resp);
        parseGolfCourse(data,resp);
    });
}