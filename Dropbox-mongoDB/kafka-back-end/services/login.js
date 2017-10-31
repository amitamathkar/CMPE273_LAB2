var mongo = require("../DbConnection");
var mongoURL = "mongodb://localhost:27017/dropbox";
var bcrypt=require('bcrypt');
var auth = require('passport-local-authenticate');


function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

/*
    if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";
    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }*/


    mongo.connect(mongoURL, function(){
                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('users');

                coll.findOne({username: msg.username}, function(err, user){

                    auth.hash(msg.password, function(err, hashed) {
                    auth.verify(msg.password, hashed, function(err, verified) {
                    console.log(verified); // True, passwords match
                    if (verified) {
                         res.code = "200";
                         res.value = "Success Login";
                        console.log('login found');
                    } else {
                         res.code = "401";
                        res.value = "Failed Login";
                        console.log('login not found');

                    }
                    console.log("res: "+res.code);
    callback(null, res);
                      });
                    });
                    /*
                    bcrypt.compare(msg.password, user.password, function(err, check) {
                    if (check==true) {
                         res.code = "200";
                         res.value = "Success Login";
                        console.log('login found');
                    } else {
                         res.code = "401";
                        res.value = "Failed Login";
                        console.log('login not found');

                    }
                    console.log("res: "+res.code);
    callback(null, res);
                });*/
                });
            });


}

exports.handle_request = handle_request;