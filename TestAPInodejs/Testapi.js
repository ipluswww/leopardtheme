/**
 * Created by Owner on 3/11/2017.
 */
var express = require('express');
var sqlite3 = require('sqlite3').verbose();

var port = 80;

var app     = express();
var test_db  =  new sqlite3.Database('TestApiDB.db');

// set up our one route to the index.html file

app.get('/', function(req, res) {
    res.sendStatus(200);
});

// start the server on port 8080 (http://localhost:8080)

app.listen(port);

console.log("Proces monitor app running at" +  port);


app.get('/getdata', function(req, res){

    if(req.query.N != undefined) {

        query = "SELECT * FROM Data" + " DESC limit " + req.query.N ;
        test_db.all(query, function (err, rows) {
            console.log(JSON.stringify(rows));
            res.send(JSON.stringify(rows));
        });

    } else {
        res.sendStatus(400);
    }

});

