var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var db = require("./db");
var usersCol = require("./model/users");
var tweetsCol = require("./model/tweets");
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	"extended" : false
}));

router.get("/", function(req, res) {
	res.json({
		"error" : false,
		"message" : "Twitter Extract API"
	});
});

router.route("/mostFollowedUsers").get(function(req, res) {
	 var response = {};
     usersCol.find({}, { '_id': 0, 'userId' :1, 'username': 1, 'followers': 1}).sort({'followers': -1}).limit(5).exec(function(err,data){
         if(err) {
             response = {"error" : true,"message" : "Error fetching data"};
         } else {
             response = {"error" : false,"message" : data};
         }
         res.json(response);
     });
});

router.route("/hashtags").get(function(req, res) {
	var response = {};
	 tweetsCol.aggregate([{$match: {"language" : "pt"}},
	                      {$group: {_id : {Hashtag : "$hashtags.text"}, Total : {$sum : 1}}}
	                      ]).allowDiskUse(true).exec(function(err,data){
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
});

router.route("/tweetsByHour").get(function(req, res) {
	 var response = {};
	 tweetsCol.aggregate([
	                      {$group: {_id : {Date : "$date", Hour : '$hour'}, Total : {$sum : 1}}}
	                      ]).allowDiskUse(true).exec(function(err,data){
		if(err) {
		    response = {"error" : true,"message" : "Error fetching data"};
		} else {
		    response = {"error" : false,"message" : data};
		}
		res.json(response);
	});
});

app.use('/', router);
var port = 3004;
app.listen(port);
console.log("Listening to PORT " + port);