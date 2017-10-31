var mongo = require("../DbConnection");
var mongoURL = "mongodb://localhost:27017/dropbox";
var bcrypt=require('bcrypt');
var auth = require('passport-local-authenticate');

function signup_request(msg, callback){

    var res = {};
    const saltRounds = 10;
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL, function() {
var coll = mongo.collection('users');

//    else
  //  {
        console.log('Connected to mongo at: ' + mongoURL);
        
        console.log('username: '+msg.username+', password: '+msg.password + msg.email_id + msg.lastname + msg.firstname)
        
        auth.hash(msg.password, function(err, hashed) {
  console.log(hashed.hash); // Hashed password
  console.log(hashed.salt); // Salt

  coll.insert({username:msg.username,password:hashed.hash,email_id:msg.email_id,lastname:msg.lastname,firstname:msg.firstname},function(err,result){
        if(err){
             console.log('error: '+err);
        }
             console.log('record inserted');
        res.code = "200";
        res.value = "Success insertion";
        status=2;
        console.log("Data inserted successfully");
    callback(null, res);
        });
});

        /*
        bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(msg.password, salt, function(err, hash) {

        coll.insert({username:msg.username,password:hash,email_id:msg.email_id,lastname:msg.lastname,firstname:msg.firstname},function(err,result){
        if(err){
             console.log('error: '+err);
        }
             console.log('record inserted');
        res.code = "200";
        res.value = "Success insertion";
        status=2;
        console.log("Data inserted successfully");
    callback(null, res);
        });
    });
                });*/

//}
});

/*

    mongo.connect(mongoURL, function(){
                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('users');

                coll.findOne({username: msg.username, password:msg.password}, function(err, user){
                    if (user) {
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

*/

}

exports.signup_request = signup_request;