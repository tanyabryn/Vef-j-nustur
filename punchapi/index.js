const express = require("express");
const mongoose = require("mongoose");
const app = express();
const api = require ("./api");
const port = 5000;


mongoose.connect('localhost/punchapi');
mongoose.connection.open("open", () => {
    console.log("Connected to database");
    app.listen(port, function(){
        console.log("Web server started on port: " + port)
    });
});