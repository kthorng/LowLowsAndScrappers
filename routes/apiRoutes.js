var cheerio = require("cheerio");
var db = require("../models");
var axios = require("axios");

module.exports = function(app) {

// ===========================================
app.get("/api/scrape", function(req, res) {
  axios.get("https://www.theverge.com/").then(function(response) {
      var $ = cheerio.load(response.data);
      $("div.c-compact-river__entry ").each(function(i, element) {
          var result = {};

          result.title = $(this).children("div").children("div").children("h2").children("a").text();
          result.link = $(this).children("div").children("div").children("h2").children("a").attr("href")
          result.img = $(this).children("div").children("a").children("div").children("noscript").text();
          result.saved = false;
          if (result.title && result.link) {

          db.Article.create(result).then(function(dbArticle) {
              console.log(dbArticle);
          })
          .catch(function(err) {
              console.log(err);
          });
      }1
      });
      res.json("Scrape Complete");
  });
});

app.get("/api/articles", function(req, res) {
  db.Article
    .find( { "saved": false } )
    .then(function(dbArticle) {
      // console.log(dbArticle);
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});


app.put("/api/articles/:id", function(req, res) {
  db.Article
    .findOneAndUpdate(
      { _id: req.params.id },
      { $set: { saved: true } } )
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
  });
});


app.get("/api/articles/saved", function(req, res) {
  db.Article
    .find( { "saved": true } )
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});


app.put("/api/articles/saved/:id", function(req, res) {
  db.Article
    .findOneAndUpdate(
      { _id: req.params.id },
      { $set: { saved: false } } )
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
  });
});


app.get("/api/articles/saved/:id", function(req, res) {
  db.Article
    .findOne({ _id: req.params.id })
    // get the notes for this article
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});


app.post("/api/articles/saved/:id", function(req, res) {
  db.Note
    .create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { note: dbNote._id },
        { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});
};