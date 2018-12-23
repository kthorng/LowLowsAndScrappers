var db = require("../models");

module.exports = function(app) {

app.get("/", function(req, res) {
  db.Article
    .find( { "saved": false } )
    .then(function(dbArticle) {
      res.render("scraped", { articles: dbArticle });
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/saved", function(req, res) {
  db.Article
    .find( { "saved": true } )
    .then(function(dbArticle) {
      res.render("saved", { articles: dbArticle });
    })
    .catch(function(err) {
      res.json(err);
    });
});
};