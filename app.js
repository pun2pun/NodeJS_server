var app = require('express')();
var bodyParser =  require("body-parser");
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

var client = 0;
var lamp= '';
var home = '';

app.post('/addName',function(req,res){
    lamp  = req.body.Lamp;
    home = req.body.Name;
    console.log(req.body);
    
    io.sockets.emit('broadcast',{ message: "Home: "+home+ "    Statue Lamp : "+lamp+' '});
    res.end("yes");
});


io.on('connect',function(socket){
    client++;
    io.sockets.emit('broadcast',{ message: "Home: "+home+ "    Statue Lamp : "+lamp+' '});

    socket.on('disconnect',function(){
        client--;
        io.sockets.emit('broadcast',{ message: "Home: "+home+ "    Statue Lamp : "+lamp+' '});
    });

});

http.listen(3000,function(req,res){
    console.log('start server at 3000');

});