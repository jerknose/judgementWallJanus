var express = require('express'),
    // , express.static(__dirname, + "/public")
    // app = express.createServer(),
    app=express(),
    http=require('http'),
    server = http.createServer(app),
    io=require('socket.io').listen(server, {log:false}),
    osc=require('node-osc/lib/osc.js'),
    st = require('node-static'),
    fs=require('fs');

io.set('log level', 1);
var oscServer, oscClient;
oscServer = new osc.Server(3333, '0.0.0.0'); //listening on 3333
// oscClient = new osc.Cliend('127.0.0.1', 3333);

// oscClient.send('/connection', 1);

var connectedSockets=[];

oscServer.on('message', function(msg, rinfo){
  console.log(msg[2]);
  connectedSockets.forEach(function(s){
    s.emit("oscdata", msg[2]);
  })
})


server.listen(8080);

app.use(express.static(__dirname + "/public"));

app.get('/getDirectoryInfo', function (req, res) {
  var path = require("path"), self = this;
  self.myfiles=[];

  var rootDir = "./public/" + req.query.parentDir;

  fs.readdir(rootDir,function(err,files){
    if(err) throw err;
    files.sort(function(a, b) {
      if(!fs.statSync( path.join(rootDir + a) ).isDirectory()){
        return;
      }
      if(!fs.statSync( path.join(rootDir + b) ).isDirectory()){
        return;
      }
      return fs.statSync(rootDir + b).mtime.getTime() - fs.statSync(rootDir + a).mtime.getTime();
    });
    files.forEach(function(file){
      if(fs.statSync( path.join(rootDir + file) ).isDirectory()){
        self.myfiles.push({"name": file, "fullPath": req.query.parentDir + file, "dateAdded": fs.statSync(rootDir + file).mtime.getTime()});
      }
    });
    res.json({ directories: self.myfiles })
  });
});

io.sockets.on('connection', function(socket){
  connectedSockets.push(socket);
  console.log('a new connection, num of connections is '+(connectedSockets.length));

  socket.on('disconnect', function(){
    var idx = connectedSockets.indexOf(socket);
    connectedSockets.splice(idx,1);

    console.log('disconnected, remaining connections: '+ (connectedSockets.length));
  });


})
