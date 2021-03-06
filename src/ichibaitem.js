
var exports = module.exports = {};

const 
    Client = require('node-rest-client').Client,
    logger = require("./logger.js");

var restClient = new Client();

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
  "item_url":"",
  "shop_url":""
}
*/


function parseIchibaItem(ichibaResp, res){
    
    var results = [];
    //logger.log(ichibaResp);
    
    
    for (item in ichibaResp.Items) {
        result = {"name" : ichibaResp.Items[item]["Item"]["itemName"], 
        "desc" : ichibaResp.Items[item]["Item"]["itemCaption"],
        "price" : ichibaResp.Items[item]["Item"]["itemPrice"],
        "rating" : ichibaResp.Items[item]["Item"]["reviewAverage"],
        "item_url" : ichibaResp.Items[item]["Item"]["itemUrl"],
        "shop_url" : ichibaResp.Items[item]["Item"]["shopUrl"]};

        pic = [];
        for (num in ichibaResp.Items[item]["Item"]["mediumImageUrls"]) {
            var url = ichibaResp.Items[item]["Item"]["mediumImageUrls"][num]["imageUrl"];
            url = url.split("?")[0];
            pic.push(url);
        }

        result["picture"] = pic;
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
    "category":"",
    "sex":"",

}
Ex: var appID = resp.app_id;

@return goraResp #response obtained from GORA APIs
*/

exports.get = function(key, sex, resp){
    //logger.log(resp);
    var keyword = key;
    if (sex == 'man') {
        keyword = keyword + ' メンズ';
    } else if (sex == 'woman') {
        keyword = keyword + ' レディース';
    }
    keyword = encodeURI(keyword);

    var URL = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20140222?format=json&hits=5&sort=-reviewCount&genreId=101077&imageFlag=1&keyword=" + keyword + "&applicationId=" + process.env.APP_ID;
    logger.log(URL);

    restClient.get(URL, function (data, res) {
        // parsed response body as js object 
        parseIchibaItem(data,resp);
    });
}
