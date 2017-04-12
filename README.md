# Rakuten-Gora-API-wrapper
API end points for Rakuten GORA APIs
<br>
>Clone the repository <br>
`git clone https://github.com/akshaykale/Rakuten-Gora-API-wrapper.git`

> Go to this directory <br>
`cd Rakuten-Gora-API-wrapper`

> Install all the dependencies <br>
`npm install`

> Run the program locally <br>
`node src/index`

## API endpoints

Get all the golfcourses
```
POST /gora/golfcourse HTTP/1.1
Host: localhost:5000
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache
Postman-Token: ec97c717-773c-a336-dfa6-a9148796367d

{
"app_id":"",
"app_secret":"",
"place":"",
"date":"",
"category":""
}
```
Response:
```
{
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
```

