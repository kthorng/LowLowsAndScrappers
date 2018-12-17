var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 8080;

var app = express();

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(MONGODB_URI);

app.get("/scrape", function(req, res) {
    axios.get("").then(function(res) {
        var $ = cheerio.load(res.data);
        $("").each(function(i, element) {
            var result = {};

            
        })
    })
})