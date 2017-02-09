var mongoose = require("mongoose");
var mongoSchema = mongoose.Schema;
var tweetSchema = {
	"tweetId" : String,
	"userId" : String,
	"username" : String,
	"followers" : String,
	"language" : String,
	"fulldate" : String,
	"date" : String,
	"hour" : String,
	"text" : String,
	"hashtags" : [{
	    "tweetId" : String
	 }]
};

module.exports = mongoose.model('tweet', tweetSchema, 'tweet');