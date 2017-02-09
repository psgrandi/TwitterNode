var mongoose = require("mongoose");
mongoose.set('debug', true);

var db = mongoose.connect('mongodb://localhost:27017/tweets');