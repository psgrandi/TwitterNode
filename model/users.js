var mongoose = require("mongoose");
mongoose.set('debug', true);

//var db = mongoose.createConnection('mongodb://localhost/tweets');
//var db = mongoose.connect('mongodb://localhost:27017/tweets');

var mongoSchema = mongoose.Schema;
var userSchema = {
	"userId" : String,
	"username" : String,
	"followers" : String
};

module.exports = mongoose.model('users', userSchema);

