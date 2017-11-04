var mongo = require("../DbConnection");
var mongoURL = "mongodb://localhost:27017/dropbox";
var chunk_data;
var fs = require('fs');


function fileupload_request(msg, callback){
var myStreamWrite=fs.createWriteStream(__dirname,'/'+msg.filename);
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    chunk_data.push(msg.chunk);
    myStreamWrite.write(msg.chunk);
    console.log("chunk received"+chunk_data.length);
}

exports.fileupload_request = fileupload_request;