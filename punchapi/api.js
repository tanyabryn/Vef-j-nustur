const express = require("express");
const app = express();
const entities = require("./entities");
const bodyParser = require('body-parser')
const uuid = require("node-uuid");

const adminToken ="smuuu";

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

console.log("hello");

app.get("/", (req, res)=> {
    console.log("ok");
    entities.User.find(function(err, docs){
        if(err){
            // ekki senda samt (err) tilbaka!
            res.status(500).send(err);
        } else {
            res.json(docs);
        }
    });
});

app.get("/api/users/:id", (req, res)=> {
    var query = {
        _id: req.params.id
    };
    entities.User.find(query);
});

app.post("/api/users", (req, res) => {
    if(req.headers.Authorization !== adminToken){
        res.status(401).send("Not authorized");
        return;
    }
    var data = {
        name: req.body.name,
        gender: req.body.gender,
        token: uuid.v1()
    }

    var entity = new entities.User(data);

    entity.save(function(err){
        if(err){
            // uppl'ysingar um hvad er ad feila'
            res.status(412);
            return;
        } else {
            res.status(201).send({
                _id: entity._id,
                token: data.token
            });
        }
    });
});


app.get("/api/my/punches", (req, res) => {
    const token = req.headers.Authorization;

    var query = {
        token: token
    };

    var user = entities.User.find(query, function(err, doc){
        console.log(doc);
        if (doc.lenght !== 1){
            //Villa eitthvad hefur farid urskeidis
        }
    });
});
//TODO: fleiri rutur

module.export = app;