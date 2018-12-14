var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('port', (process.env.PORT || 3000));

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

app.get('/api/textbooks', function(req, res) {
    // Lab 10 - MongoDB commands
    db.collection('textbooks').find({}).toArray(function (err, textbooks){
        res.json(textbooks);
    });
});

// app.post('/api/photos', function(req, res) {
//     db.collection("textbooks").insertOne(newTextbook, function(err, result) {
//         if (err) throw err;
//         db.collection("textbooks").find({}).toArray(function(err, textbooks) {
//             if (err) throw err;
//             res.json(textbooks);
//         });
//     });
// });

app.post('/api/newTextbook', function(req, res) {
    var newTextbook = {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        course: req.body.course,
        condition: req.body.condition,
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



// app.put('/api/comments/:id', function(req, res) {
//     var updateId = Number(req.params.id);
//     var update = req.body;
//     db.collection('textbooks').updateOne(
//         { id: updateId },
//         { $set: update },
//         function(err, result) {
//             if (err) throw err;
//             db.collection("textbooks").find({}).toArray(function(err, docs) {
//                 if (err) throw err;
//                 res.json(docs);
//             });
//         });
// });

// app.delete('/api/comments/:id', function(req, res) {
//     db.collection("textbooks").deleteOne(
//         {'id': Number(req.params.id)},
//         function(err, result) {
//             if (err) throw err;
//             db.collection("textbooks").find({}).toArray(function(err, docs) {
//                 if (err) throw err;
//                 res.json(docs);
//             });
//         });
// });

app.use('*', express.static(APP_PATH));

MongoClient.connect(mongo_connection, function (err, client) {
    if (err) throw err;

    db = client;
    console.log('Connected to MongoDB: ' + mongo_connection);

    app.listen(app.get('port'), function() {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    });
});
