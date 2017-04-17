
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


function parseHotels(hotelResp, res){
    
    var results = [];
    
    for (hotel in hotelResp.hotels) {
        
        var xx = hotelResp.hotels[hotel]["hotel"][0].hotelBasicInfo;
        //logger.log("ITEM=>"+JSON.stringify(xx));
        result = {
            "name" : xx.hotelName, 
            "desc" : xx.hotelSpecial,
            "price" : xx.hotelMinCharge,
            "address" : xx.address1+"\n"+xx.address2,
            "rating" : xx.reviewAverage,
            "picture" : xx.hotelImageUrl,
            "reviews" : xx.reviewUrl,
            "book_url" : xx.planListUrl,
            "gif" : xx.hotelMapImageUrl
            };
        results.push(result);
    }
    
    logger.log(results);
    res.set('Content-Type', 'application/json');
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

exports.get = function(cin, cout, lat, lng, resp){

    var URL_HOTEL = "https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20131024?format=json&checkinDate="+cin+"&checkoutDate="+cout+"&latitude="+lat+"&longitude="+lng+"&searchRadius=3&datumType=1&applicationId=1045487862265155150";//+ process.env.APP_ID; 
    //var URL = "https://app.rakuten.co.jp/services/api/Gora/GoraGolfCourseSearch/20131113?format=json&hits=5&sort=evaluation&" + "areaCode=" + areaCode + "&applicationId=" + process.env.APP_ID;

    restClient.get(URL_HOTEL, function (data, res) {
        // parsed response body as js object 
        logger.log(data);
        
        parseHotels(data,resp);
    });
}
