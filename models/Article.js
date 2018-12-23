var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: { //href from nyt page
    type: String,
    required: true,
    unique: true
  },
  img: {
    type: String,
    required: true,
    unique: true
  },
  saved: {
    type: Boolean
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
