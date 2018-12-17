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

            result.title = $(this)
            .children("a").text();
            result.line = $(this)
            .children("a").attr("href");

            db.Article.create(result).then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err) {
                console.log(err);
            });
        });
        res.send("Scrape Complete");
    });
});

// Server Start
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT + "!")
})