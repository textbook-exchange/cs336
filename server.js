//Import required libraries for the server and the functionalities to parse the data and access the data
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Set the port to 3000 when running this server on LocalHost
app.set('port', (process.env.PORT || 3000));

//Configurations and import of the MongoDB feature
var MongoClient = require('mongodb').MongoClient
var db;
var password = process.env.MONGO_PASSWORD;
var mongo_connection = "mongodb://cs336:" + password + "@ds249583.mlab.com:49583/cs336";

var APP_PATH = path.join(__dirname, 'dist');

app.use('/', express.static(APP_PATH));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest textbooks.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//MongoDB: Get Entries Operation
app.get('/api/textbooks', function(req, res) {
    // Lab 10 - MongoDB commands
    db.collection('textbooks').find({}).toArray(function (err, textbooks){
        res.json(textbooks);
    });
});

//MongoDB: Create Entry Operation
app.post('/api/newTextbook', function(req, res) {
    var newTextbook = {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        course: req.body.course,
        condition: req.body.condition,
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo
    };
    db.collection("textbooks").insertOne(newTextbook, function(err, result) {
        if (err) throw err;
        db.collection("textbooks").find({}).toArray(function(err, textbooks) {
            if (err) throw err;
            res.json(textbooks);
        });
    });
});

//MongoDB: Update Entry Operation
app.put('/api/textbooks/:id', function(req, res) {
    var updateId = Number(req.params.id);
    var update = req.body;
    db.collection('textbooks').updateOne(
        { id: updateId },
        { $set: update },
        function(err, result) {
            if (err) throw err;
            db.collection("textbooks").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

//MongoDB: Delete Entry Operation
app.delete('/api/textbooks/:id', function(req, res) {
    db.collection("textbooks").deleteOne(
        {'id': Number(req.params.id)},
        function(err, result) {
            if (err) throw err;
            db.collection("textbooks").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

app.use('*', express.static(APP_PATH));

//Connect to the MongoDB database before starting the server to ensure the database connection first
MongoClient.connect(mongo_connection, function (err, client) {
    if (err) throw err;

    db = client;
    console.log('Connected to MongoDB: ' + mongo_connection);

    app.listen(app.get('port'), function() {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    });
});
