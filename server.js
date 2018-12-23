var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var logger = require("morgan");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(logger("dev")); // log requests
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articleScraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true } );


app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT + "!");
});