var mongo = require("../DbConnection");
var mongoURL = "mongodb://localhost:27017/dropbox";

function filelist_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL, function(){
                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('files');
                console.log('username: '+msg.username);
                coll.find({shared_with:msg.username}).toArray(function(err, result){

                if(err){ 
                    res.code = "500";
                    res.value = result;
                    console.log('some error');
                }
                else if(result.length)
                {
                    res.code = "200";
                    res.value = result;
                }
                else
                {
                    res.code = "200";
                    res.value = [];
                    console.log('no record');
                }
                    console.log("res: "+res.code);
                    callback(null, res);
                });
            });


    /*
        MongoClient.connect(mongoURL, function(err, db) {
var coll = db.collection('files');

    if(err) { return console.dir(err); }
    else
    {
        console.log('Connected to mongo at: ' + mongoURL);
        coll.find({user_name:req.user}).toArray(function(err,result){
            if(err){res.status(500).send()}
                else if(result.length)
                {
                    res.status(200).json({files:result});
                }
                else
                {
                    res.status(200).json({files:result});
                    //res.status(200).json({files:"no records"})
                }
        });
}
});
    */
}

exports.filelist_request = filelist_request;