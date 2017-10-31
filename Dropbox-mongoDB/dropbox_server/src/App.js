const fileUpload = require('express-fileupload');
const bodyParser=require('body-parser');
var mysql = require('./DbConnection');
var urlencodedPraser=bodyParser.urlencoded({extended:false});
var express = require('express')
  , path = require('path');
var cors = require('cors');
var ObjectId = require('mongodb').ObjectID

var MongoClient = require('mongodb').MongoClient;
var mongoURL = "mongodb://localhost:27017/dropbox";
var expressSessions = require("express-session");
var LocalStrategy = require("passport-local").Strategy;
var passport = require("passport");
var mongoSessionURL = "mongodb://localhost:27017/sessions";
var mongoStore = require("connect-mongo/es5")(expressSessions);
require('./passport')(passport);
var download = require('download-file');
var kafka = require('./kafka/client');


var fs = require('fs');
var dir = './tmp';

var app = express();

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions))

app.listen(5001,'127.0.0.1');
console.log('now listenring to port 5001');

//Generate Token using secret from process.env.JWT_SECRET
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoURL
    })
}));
app.use(passport.initialize());
app.use(passport.session());



app.use(bodyParser());
app.post('/api/afterSignIn',urlencodedPraser,function(req,res){
		var result;

	passport.authenticate('local', function(err, user) {
		console.log('1');
        if(err) {
            console.log('error:'+err);
            res.status(500).send();
        }

        if(!user) {
            res.status(401).send();
        }
        req.session.user = user.username;
        console.log(req.session.user);
        console.log("session initilized");
        req.login(user.username,function(err,result){
        	console.log(req.session.user);
        	result="valid Login";
			            console.log("result: "+result);
			            //res.json({result});
        	return res.status(200).json({result:result});
        });
        
    })(req, res);

});


app.post('/api/signUp',urlencodedPraser,function(req,res){

	var uname=req.body.uname;
	var pass=req.body.pass;
	var lname=req.body.lname;
	var fname=req.body.fname;
	var email_id=req.body.email;

	var result;

    kafka.make_request('login_topic',{"username":uname,"password":pass,"email_id":email_id,"lastname":lname,"firstname":fname,"topic":"signup_topic"}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                    console.log('kafka client: some error: '+err);
                    res.status(500).send()
                //done(err,{});
            }
            else
            {
                console.log('else called');
                if(results.code == 200){
                    //done(null,{username:username,password:password});
                    console.log('kafka client: signup done');
                    console.log('record inserted');
        status=2;
            console.log("Data inserted successfully");
            res.json({status});
                }
                else {
                    console.log('some error occurred:'+results.code)
                    res.status(500).send()

                    //done(null,false);
                }
            }
        });

    /*
	MongoClient.connect(mongoURL, function(err, db) {
var coll = db.collection('users');

  	if(err){res.status(500).send()}
  	else
  	{
		console.log('Connected to mongo at: ' + mongoURL);
        var coll = db.collection('users');
        console.log('username: '+req.body.uname+', password: '+req.body.pass)
        
        coll.insert({username:uname,password:pass,email_id:email_id,lastname:lname,firstname:fname},function(err,result){

        });
        console.log('record inserted');
        status=2;
			console.log("Data inserted successfully");
			res.json({status});
}
});*/
	//console.log("date insert status:"+status);
	//res.json({result});
});

app.use(fileUpload());
app.use( bodyParser.raw({limit: '50mb'}) ); 

app.post('/api/upload', function(req, res){
console.log("method called");
var parent_flag=false;
var filepath='';
var filepath_db='';
var file={};
	  if (!req.files)
    //return res.status(400).send('No files were uploaded.');
		console.log('No files were uploaded.');
else
{
	  let sampleFile = req.files.file;
   console.log("File Received"+sampleFile);
    console.log("Filename: "+req.body.name);
    console.log("parent flag check: "+req.body.parent_available);
var check_flag=req.body.parent_available;

    if(String(check_flag)==="false")
    {
console.log('inside child logic');

    	parent_flag=false;
    	filepath='./files/'+req.user+'/'+sampleFile.name;
    	filepath_db='./files/'+req.user+'/';

    	file={
			user_name:req.user,
			filepath:filepath_db,
			filename:sampleFile.name,
			filetype:'file',
			starred:'no',
			parent_id:req.user,
            shared_with:[]
		};

    }

    else{

    	console.log('inside parent logic');
 		parent_flag=true;
    	filepath='./files/'+req.user+'/'+req.body.folder_name+'/'+sampleFile.name;
    	filepath_db='./files/'+req.user+'/'+req.body.folder_name;

    	file={
			user_name:req.user,
			filepath:filepath_db,
			filename:sampleFile.name,
			filetype:'file',
			starred:'no',
			parent_id:req.body.name,
            shared_with:[]
		};
    	
    }

    if (!fs.existsSync('./files/'+req.user))
		{
		 console.log('creating a directory');
   		 fs.mkdirSync('./files/'+req.user);
		}
console.log("filepath: "+filepath);
	if (fs.existsSync(filepath)) {
    // Do something
		console.log('File with same name already exists.');
		res.status(202).json({details:"File with same name already exists"});
}
else
{
	console.log(filepath); 
  sampleFile.mv(filepath, function(err) {
    if (err)
    {
      //return res.status(500).send(err);
            console.log("Error uploading file.");
}
else
{
        console.log("File is uploaded");

	MongoClient.connect(mongoURL, function(err, db) {
var coll = db.collection('files');

  	if(err) { return console.dir(err); }
  	else
  	{
		console.log('Connected to mongo at: ' + mongoURL);

        coll.insert(file,function(err,result){
        	if(err){res.status(500).send()}
        		else
        		{
        			console.log('file inserted');
        			//status=2;
					var activity_details={username:req.user,
						activity:"New File uploaded, Filename: "+sampleFile.name,
						date:new Date()};
					insertActivity(activity_details);
					coll.find({user_name:req.user}).toArray(function(err,result){
        			if(err){res.status(500).send()}
        			else if(result.length)
        			{
        				console.log('records found');
        				res.status(200).json({files:result});
        			}
	        		else
	        		{
	        			//res.status(200).json({files:"no records"})
	        			console.log('no records');
	        		}
        			});
        		}
        });
}
});	//mongo files insert
    }
  });//file upload
}
}//parent folder check

 });

app.post('/api/getAllFiles',urlencodedPraser,function(req,res){

        console.log('allfiles user: '+req.body.parent_id);
        kafka.make_request('login_topic',{"parent_id":req.body.parent_id,"topic":"filelist_topic"}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                    console.log('kafka client: some error: '+err);
                    res.status(500).send()
                //done(err,{});
            }
            else
            {
                console.log('else called');
                if(results.code == 200){
                    //done(null,{username:username,password:password});
                    console.log('kafka client: signup done');
                    console.log('files found');
                    res.status(200).json({files:results.value});
                }
                else {
                    console.log('some error occurred:'+results.code)
                    res.status(500).send()

                    //done(null,false);
                }
            }
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
});

app.post('/api/make_star',urlencodedPraser,function(req,res){

			MongoClient.connect(mongoURL, function(err, db) {
var coll = db.collection('files');

  	if(err) { return console.dir(err); }
  	else
  	{
		console.log('Connected to mongo at: ' + mongoURL);
        var fileid={_id:ObjectId(req.body.file_id)};
        console.log("_id: "+ObjectId(req.body.file_id));
        var file_details={$set:
     			 {
        			starred:req.body.value
      }}
        
	coll.update(fileid,file_details,function(err,result){
		if(err){
			res.status(500).send();
		}
		else
		{
			console.log('file starred');
			var activity=req.body.value==="no"?" Unstarred":" Starred";
			var activity_details={username:req.user,
						activity:"File "+activity+", Filename: "+req.body.Filename,
						date:new Date()};
			insertActivity(activity_details);
			coll.find({user_name:req.user}).toArray(function(err,result){
        	if(err){res.status(500).send()}
        		else if(result.length)
        		{
        			console.log('records found');
        			res.status(200).json({files:result});
        		}
        		else
        		{
        			//res.status(200).json({files:"no records"})
        			console.log('no records');
        		}
        });
		}
	})
}
});
});


app.post('/api/insertUserAccount',function(req,res){
		MongoClient.connect(mongoURL, function(err, db) {
var coll = db.collection('users');

  	if(err) { return console.dir(err); }
  	else
  	{
		console.log('Connected to mongo at: ' + mongoURL);
        var coll = db.collection('users');
        var uname={username:req.user};
        console.log("username: "+uname);
        var bio={$set:
     			 {
        			overview: req.body.overview,
        			Experience: req.body.Experiance,
        			Education:req.body.Education,
        			Contact:req.body.Contact,
        			Hobbies:req.body.Hobbies,
        			Achievement:req.body.Achievement
      }}
        
	coll.update(uname,bio,function(err,result){
		if(err){
			res.status(500).send();
		}
		else
		{
			var activity_details={username:req.user,
						activity:"User Info added",
						date:new Date()};
			insertActivity(activity_details);
			console.log('record updated');
		}
	})
}
});
});

app.post('/api/logout', function(req,res) {
    console.log(req.session.user);
    req.logout();
    req.session.destroy();
    console.log('Session Destroyed');
    res.status(200).send();
});

passport.serializeUser(function(username, done) {
  done(null, username);
});

passport.deserializeUser(function(username, done) {
    done(null, username);
  
});

function insertActivity(data){
console.log("data: "+data);
	MongoClient.connect(mongoURL, function(err, db) {
var coll = db.collection('activity');

coll.insertOne(data,function(err,result){
	if(err){res.status(500).send();}
	else
	{
		console.log('activity added');
	}
});
   
});
}

function getFiles(username){
console.log("username in function: "+username);
			MongoClient.connect(mongoURL, function(err, db) {
var coll = db.collection('files');

  	if(err) { return console.dir(err); }
  	else
  	{
		console.log('Connected to mongo at: ' + mongoURL);

        coll.find({user_name:username}).toArray(function(err,result){
        	if(err){res.status(500).send()}
        		else if(result.length)
        		{
        			console.log('records found');
        			return result;
        		}
        		else
        		{
        			//res.status(200).json({files:"no records"})
        			console.log('no records');
        		}
        });
}
});
}

app.post('/api/getDetails',function(req,res){
console.log('getdetails called');
	if(checkAuthentication(req))
	{

		console.log('Authenticated');
		MongoClient.connect(mongoURL, function(err, db) {
var coll = db.collection('users');

  	if(err) { return console.dir(err); }
  	else
  	{
		console.log('Connected to mongo at: ' + mongoURL);
		var uname={username:req.user};
        console.log("username: "+uname);
        coll.findOne({username:req.user},function(err,result){
        	if(err){res.status(500).send()}
        		
        		else
        		{
        			console.log('record found')
        			res.status(200).json({details:result});

        			//res.status(200).json({details:"no records"})
        		}
        
});
    }
    });
	}
	else
	{
		res.status(403).json({details:403});

	}
		});

function checkAuthentication(req){
    if(req.isAuthenticated()){
        //if user is looged in, req.isAuthenticated() will return true 
        return true;
    } else{
        return false;
    }
}

app.post('/api/createDirectory',function(req,res){
console.log('createDirectory called');
	if(checkAuthentication(req))
	{

		if (!fs.existsSync('./files/'+req.user))
		{
		 console.log('creating a directory');
   		 fs.mkdirSync('./files/'+req.user);
		}
		console.log('Authenticated:'+req.body.directory_name);
		if (!fs.existsSync('./files/'+req.user+'/'+req.body.directory_name)){
		 console.log('creating a directory');
   		 fs.mkdirSync('./files/'+req.user+'/'+req.body.directory_name);

    		MongoClient.connect(mongoURL, function(err, db) {
		var coll = db.collection('files');

  	if(err) { return console.dir(err); }
  	else
  	{
		console.log('Connected to mongo at: ' + mongoURL);
        console.log("username: "+req.user);
		var file={
			user_name:req.user,
			filepath:'./files/'+req.user+'/',
			filename:req.body.directory_name,
			filetype:'directory',
			starred:'no',
            parent_id:req.user
		};
        coll.insert(file,function(err,result){
        	if(err){res.status(500).send()}
        		else
        		{
        			console.log('folder inserted');
        			//status=2;
					var activity_details={username:req.user,
						activity:"New folder uploaded, Foldername: "+req.body.directory_name,
						date:new Date()};
					insertActivity(activity_details);
					coll.find({user_name:req.user}).toArray(function(err,result){
        			if(err){res.status(500).send()}
        			else if(result.length)
        			{
        				console.log('records found');
        				res.status(200).json({files:result});
        			}
	        		else
	        		{
	        			//res.status(200).json({files:"no records"})
	        			console.log('no records');
	        		}
        			});
        		}
        });
    }
    });

	}
	else
	{
		res.status(202).json({details:"Folder with same name already exists"});
	}
	}
	else
	{
		res.status(403).json({details:403});

	}
});


app.post('/api/getFiledetails',urlencodedPraser,function(req,res){
console.log('file details called: '+req.user+" : "+req.body.file_id);
		MongoClient.connect(mongoURL, function(err, db) {
var coll = db.collection('files');
var fileid={_id:ObjectId(req.body.file_id)};
  	if(err) { return console.dir(err); }
  	else
  	{
		console.log('Connected to mongo at: ' + mongoURL);
        coll.find(fileid).toArray(function(err,result){
        	if(err){res.status(500).send()}
        		else if(result.length)
        		{
        			console.log('1');
        			res.status(200).json({files:result});
        		}
        		else
        		{
        			console.log('2');
        			//res.status(200).json({files:result});
        			res.status(200).json({files:result})
        		}
        });
}
});
});

app.post('/api/delete_file',urlencodedPraser,function(req,res){

			MongoClient.connect(mongoURL, function(err, db) {
var coll = db.collection('files');

  	if(err) { return console.dir(err); }
  	else
  	{
		console.log('Connected to mongo at: ' + mongoURL);
        var fileid={_id:ObjectId(req.body.file_id)};
        console.log("_id: "+ObjectId(req.body.file_id)+" : "+req.body.Filename);
        
	coll.remove(fileid,function(err,result){
		if(err){
			res.status(500).send();
		}
		else
		{
			console.log('file deleted');
			var activity_details={username:req.user,
						activity:"File deleted, Filename: "+req.body.Filename,
						date:new Date()};
			insertActivity(activity_details);
			coll.find({user_name:req.user}).toArray(function(err,result){
        	if(err){res.status(500).send()}
        		else if(result.length)
        		{
        			console.log('records found');
        			res.status(200).json({files:result});
        		}
        		else
        		{
        			//res.status(200).json({files:"no records"})
        			console.log('no records');
        		}
        });
		}
	})
}
});
});

app.post('/api/download_file',urlencodedPraser,function(req,res){

			MongoClient.connect(mongoURL, function(err, db) {
var coll = db.collection('files');

  	if(err) { return console.dir(err); }
  	else
  	{
		console.log('Connected to mongo at: ' + mongoURL);
        var fileid={_id:ObjectId(req.body.file_id)};
        console.log("download _id: "+ObjectId(req.body.file_id)+" : "+req.body.Filename);
        
	coll.findOne(fileid,function(err,result){
		if(err){
			res.status(500).send();
		}
		else
		{
			console.log('file found: '+result.filepath+result.filename);
			res.download(result.filepath+result.filename,result.filename);
    				console.log("downloaded")
		

			var activity_details={username:req.user,
						activity:"File downloaded, Filename: "+req.body.Filename,
						date:new Date()};
			insertActivity(activity_details);
			coll.find({user_name:req.user}).toArray(function(err,result){
        	if(err){res.status(500).send()}
        		else if(result.length)
        		{
        			console.log('records found');
        			res.status(200).json({files:result});
        		}
        		else
        		{
        			//res.status(200).json({files:"no records"})
        			console.log('no records');
        		}
        });
		}
	})
}
});
});

