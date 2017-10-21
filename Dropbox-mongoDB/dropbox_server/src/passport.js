var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/users";

module.exports = function(passport) {
    passport.use('users', new LocalStrategy(function(username   , password, done) {
        try {
            mongo.connect(mongoURL, function(){
                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('users');

                coll.findOne({username: username, password:password}, function(err, user){
                    if (user) {
                        done(null, {username: username, password: password});

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