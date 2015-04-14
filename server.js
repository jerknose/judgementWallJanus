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