const fileUpload = require('express-fileupload');
var jwt = require('jsonwebtoken');
var multer = require("multer");
const bodyParser=require('body-parser');
var mysql = require('./DbConnection');
var urlencodedPraser=bodyParser.urlencoded({extended:false});
var express = require('express')
  , path = require('path');

  var MongoClient = require('mongodb').MongoClient;
var mongoURL = "mongodb://localhost:27017/dropbox";




var app = express();
                      app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,authorization');
    next();
})
app.listen(5001,'127.0.0.1');
console.log('now listenring to port 5001');

//Generate Token using secret from process.env.JWT_SECRET


app.use(bodyParser());
app.post('/api/afterSignIn',urlencodedPraser,function(req,res){
		var result;
// Connect to the db
MongoClient.connect(mongoURL, function(err, db) {
  if(err) { return console.dir(err); }
  else
  {

console.log('Connected to mongo at: ' + mongoURL);
                var coll = db.collection('users');
                console.log('username: '+req.body.uname+', password: '+req.body.pass)
                coll.findOne({username: req.body.uname, password:req.body.pass}, function(err, user){
                    if (user) {
                        console.log('done:'+user)
                        result="valid Login";
			            console.log("result: "+result);
			            res.json({result});

                    } else {
                        console.log('error');
                    }
                });
}
});
	console.log("scsdvcsvfvfdvdfv:");
});


app.post('/api/signUp',urlencodedPraser,function(req,res){
	var getUser="select * from users where user_name='"+req.body.uname +"'";
	var saveUser="insert into users(first_name,last_name,user_name,password,email_id) values('"+
	req.body.fname+"','"+req.body.lname+"','"+req.body.uname+"',MD5('" + req.body.pass+"'),'"+
	req.body.email+"')";

	var uname=req.body.uname;
	var pass=req.body.pass;
	var lname=req.body.lname;
	var fname=req.body.fname;
	var email_id=req.body.email;


	console.log("Query is:"+saveUser );
	var status=0;
	console.log("Query is:"+getUser);
	var result;
	MongoClient.connect(mongoURL, function(err, db) {
var coll = db.collection('users');

  	if(err) { return console.dir(err); }
  	else
  	{
		console.log('Connected to mongo at: ' + mongoURL);
        var coll = db.collection('users');
        console.log('username: '+req.body.uname+', password: '+req.body.pass)
        
        coll.insert({username:uname,password:pass,email_id:email_id,lastname:lname,firstname:fname});
        console.log('record inserted');
        status=2;
			console.log("Data inserted successfully");
			res.json({status});
}
});
	/*
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("record found");
				status=1;
				//changes for routing
				
			        if (!err) {
			            
			        }
			        else {
			        	result="Error";
			            //res.end('An error occurred');
			            console.log(err);
			        }
			    	res.json({status});
			}
			else {    
				console.log("No record");

mysql.insertData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			status=2;
			console.log("Data inserted successfully");
		}  
	},saveUser);
    	res.json({status});
			}
		}  
	},getUser);
	*/
	console.log("date insert status:"+status);
	//res.json({result});
});

app.use(fileUpload());
app.post('/api/upload', function(req, res){

/*jwt.verify(req.token,"my_secret_key",function(err,data){
if(err)
{
	res.sendStatus(403);
}
else
{*/
	  if (!req.files)
    //return res.status(400).send('No files were uploaded.');
		console.log('No files were uploaded.');

  let sampleFile = req.files.file;
   console.log("File Received"+sampleFile);
    console.log("Filename: "+req.body.name);
  sampleFile.mv('./files/'+sampleFile.name, function(err) {
    if (err)
    {
      //return res.status(500).send(err);
            console.log("Error uploading file.");
}
else
{
        console.log("File is uploaded");

        var saveFile="insert into files(user_name,filepath,filename,filetype,starred) values('"+
	req.body.name+"','./files/','"+sampleFile.name+"','" + "file"+"','"+
	"no"+"')";

	console.log("Query is:"+saveFile );

	mysql.insertFile(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			//status=2;
			var saveActivity="insert into activity(user_name,activity, date) values('"+
	req.body.name+"','New File uploaded, Filename:,"+sampleFile.name+"',CURDATE()"+")";
			mysql.insertFile(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			//status=2;
			console.log("activity inserted successfully");
		}  
	},saveActivity);
			console.log("File inserted successfully");
		}  
	},saveFile);
	
    }
  });
 });

app.post('/api/getAllFiles',urlencodedPraser,function(req,res){
	var getFiles="select * from files where user_name='"+ req.body.uname+"'";
	console.log("Query is:"+getFiles);
	var result;
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
				console.log("files returned");
			        if (!err) {
			            //res.end(result);
			            result="valid Login";
			            console.log("result: "+result);
			             res.status(200).json({files:results});
  }
			        else {
			        	result="Error";
			            //res.end('An error occurred');
			            console.log(err);
			            res.status(400);
			        }
			    }  
	},getFiles);
	console.log("scsdvcsvfvfdvdfv:"+result);
});

app.post('/api/make_star',urlencodedPraser,function(req,res){
	//var getFiles="select * from files where file_id='"+ req.body.file_id+"'";
	var star_file="Update files set starred='"+req.body.value+"' where file_id="+ req.body.file_id;
	console.log("update Query is:"+star_file);
	var result;
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			var activity=req.body.value==="no"?" Unstarred":" Starred";
			var saveActivity="insert into activity(user_name,activity, date) values('"+
	req.body.user_name+"','File"+activity+", Filename:,"+req.body.Filename+"',CURDATE()"+")";
	console.log("Activity query: "+saveActivity);
			mysql.insertFile(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			//status=2;
			console.log("activity inserted successfully");

			var all_files="select * from files where user_name='"+req.body.user_name+"'";
			console.log("select Query is:"+star_file);
			mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.status(200).json({files:results});
	    }  
	},all_files);
		}  
	},saveActivity);    

	    }  
	},star_file);
	console.log("scsdvcsvfvfdvdfv:"+result);
});


app.post('/api/insertUserAccount',urlencodedPraser,function(req,res){
	//var getFiles="select * from files where file_id='"+ req.body.file_id+"'";
	//overview,Experiance,Education,Contact,Hobbies,Achievement,username
	var user_account="Update users set overview='"+req.body.overview+
	"',Experience='"+req.body.Experiance+"',Education='"+req.body.Education+
	"',Contact='"+req.body.Contact+"',Hobbies='"+req.body.Hobbies+"',Achievement='"+req.body.Achievement
	+"' where user_name='"+ req.body.username+"'";

	console.log("update Query is:"+user_account);
	var result;
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			//var activity=req.body.value==="no"?" Unstarred":" Starred";
			var saveActivity="insert into activity(user_name,activity, date) values('"+
	req.body.user_name+"','User Info added',CURDATE()"+")";
	console.log("Activity query: "+saveActivity); 

	    }  
	},user_account);
	console.log("scsdvcsvfvfdvdfv:"+result);
});

//not required
function ensureToken(req,res,next)
{
	const bearerHeader=req.headers["authorization"];
	console.log(bearerHeader);
	if(typeof(bearerHeader!==undefined))
	{
		const bearer = bearerHeader.split(" ");
		const bearerToken=bearer[1];
		req.token=bearerToken;
		next();
	}
	else
	{
		res.sendStatus(403);
	}
}