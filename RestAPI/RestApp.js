var express = require('express');
var app = express();
var fs = require('fs');

app.get('/getUser',function(req,res){
    fs.readFile(__dirname+'/user.json',function(err,data){
        console.log(data);
        res.end(data);
    });

});

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');

});

var user ={
    "user4":{
        "name":"121212",
        "password":"121212",
        "add":"121212",
        "id":322
        
    }
}

app.post('/addUser',function(req,res){
    fs.readFile(__dirname+'/user.json','utf-8',function(err,data){
       data = JSON.parse(data);
       data["user4"] = user["user4"];
       console.log("data comming..");
       res.end(JSON.stringify(data));


    });

});



var server = app.listen(8081,function(){
        var host  = server.address().address
        var port  = server.address().port

        console.log("application Run At http://%s:%s",host,port)

});