var express = require("express");
var app = new express();
var http = require("http").Server(app);
var io= require("socket.io")(http);

var Log = require('log'),
	log = new Log('debug')

var port = process.env.PORT || 3000;

app.use(express.static(__dirname+"/public"));

app.get('/',function(req,res){
     res.redirect('index.html')
});


io.on('connection',function(socket){
	//socket para imagenes
	socket.on('stream',function(image){
		socket.broadcast.emit('stream',image);
	});
	//socket para mensaje
	socket.on('chat message', function(msg){
    	io.emit('chat message', msg);
  	});
});



http.listen(port,function(){
	log.info("Servidor escucahndo atravez del puerto %s  ,",port);
});