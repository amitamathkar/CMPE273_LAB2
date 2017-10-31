var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./DbConnection");
var mongoURL = "mongodb://localhost:27017/dropbox";
var kafka = require('./kafka/client');


module.exports = function(passport) {
    passport.use('local', new LocalStrategy(function(username   , password, done) {
        try {

            console.log('passport called');
            kafka.make_request('login_topic',{"username":username,"password":password,"topic":"login_topic"}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                    console.log('passport client: some error: '+err);
                done(err,{});
            }
            else
            {
                console.log('else called');
                if(results.code == 200){
                    done(null,{username:username,password:password});
                    console.log('passport client: login found');
                }
                else {
                    done(null,false);
                }
            }
        });


/*
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
            });*/
        }
        catch (e){
            done(e,{});
        }
    }));
};