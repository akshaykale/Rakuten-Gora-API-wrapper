
var exports = module.exports = {};


function callGoraAPIs(date,place,category) {
    
}


function parseGolfCourse(resp){
    
}

exports.get = function(date,place,category){
    var responseGORA = callGoraAPIs(date,place,category);

    return listGolfCourse = parseGolfCourse(responseGORA);

}