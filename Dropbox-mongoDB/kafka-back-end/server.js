var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var signup = require('./services/signUp');
var filelist=require('./services/file_listing');
var shared_filelist=require('./services/Shared_files');
var file_upload=require('./services/file_upload');
var group_members=require('./services/Groupmembers_list');


var topic_name = 'login_topic';
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();

console.log('server is running');
consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    console.log('topic: '+data.data.topic);
    //topic_name = data.data.topic;

    if(data.data.topic==="login_topic")
    {
        console.log('login topic called');

            login.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
    }
    if(data.data.topic==="signup_topic")
    {
        console.log('signup topic called');
        signup.signup_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
    }
    if(data.data.topic==="filelist_topic")
    {
        console.log('filelist_request called');
        filelist.filelist_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
    }

    if(data.data.topic==="shared_files")
    {
        console.log('filelist_request called');
        shared_filelist.filelist_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
    }

    if(data.data.topic==="shared_files")
    {
        console.log('filelist_request called');
        file_upload.fileupload_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
    }
    if(data.data.topic==="group_members")
    {
        console.log('group_members called');
        group_members.members_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
    }
});

//fileupload_request