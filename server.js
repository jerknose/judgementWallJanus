var express = require('express'),
    // , express.static(__dirname, + "/public")
    // app = express.createServer(),
    app=express(),
    http=require('http'),
    server = http.createServer(app),
    st = require('node-static'),
    fs=require('fs');

server.listen(8080);

app.use(express.static(__dirname + "/public"));

app.get('/getScanFolders', function (req, res) {
  var path = require("path"), self = this;
  self.myfiles=[];

  var rootDir = './public/scans'; 
  fs.readdir(rootDir,function(err,files){
    if(err) throw err;
    files.forEach(function(file){
      if(fs.statSync( path.join(rootDir + "/" + file) ).isDirectory()){
        self.myfiles.push(file);
      }
    });
    res.json({ scanDirs: self.myfiles })
  });
});