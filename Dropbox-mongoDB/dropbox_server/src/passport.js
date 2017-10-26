var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./DbConnection");
var mongoURL = "mongodb://localhost:27017/dropbox";

module.exports = function(passport) {
    passport.use('local', new LocalStrategy(function(username   , password, done) {
        try {
            mongo.connect(mongoURL, function(){
                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('users');

                coll.findOne({username: username, password:password}, function(err, user){
                    if (user) {
                        done(null, {username: username, password: password});
                        console.log('login found')
                    } else {
                        done(null, false);
                    }
                });
            });
        }
        catch (e){
            done(e,{});
        }
    }));
};