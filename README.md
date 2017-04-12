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
Postman-Token: 3ba6f3ea-ba02-b618-81c0-3b3c55476b1e

param={"app_id":"sd","app_secret":"akshay","place":"","date":"","category":""}
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

