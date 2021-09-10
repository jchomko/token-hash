var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs')
var path = require('path')
// var namehash = require('eth-ens-namehash')
// import ENS, { getEnsAddress } from '@ensdomains/ensjs'
// const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })
// ens.name('resolver.eth').getAddress() // 0x123

require('dotenv').config();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

server.listen((process.env.PORT || 5000), function () {
  console.log("Express server listening on port 5000");
});

app.get('/', function(request, response) {
  response.sendFile('/public/index.html', {"root": __dirname})
});

if(process.env.NODE_ENV != 'production') {
  app.get('/editor', function(request, response) {
    response.sendFile('/public/editor.html', {"root": __dirname})
  });
}

io.on('connection', function(socket) {

  console.log("socked connection inited");
  socket.on('join', function(data) {
    console.log(data);
    socket.emit('messages', 'Hello from server');
  });

  socket.on('save-json', function(d, filename){
      //set data to equal data
      data = d
      var jsonString = JSON.stringify(data, null, 1)
      fs.writeFile( "./public/"+filename, jsonString, (err) => {
      if (err) {
          console.error(err)
          return
      }
      console.log("File has been created")
      })
  });
  //Function for debug / editor section
  socket.on('request-json', function(filename){
    var sID = this.id
    console.log("requesting : ", filename)
    if(filename != ""){
        console.log("id: " + sID)
        var fileData = {}
        var filePath = path.join(__dirname, 'public/'+filename)
        fs.readFile(filePath, {encoding: 'utf-8'}, function(err, rawData){
          if (!err) {
            sequenceIndex = 0
            fileData = JSON.parse(rawData)
            data = fileData
            // fileData = rawData
            // console.log("id" + this.id)
            // console.log("filedata : "+fileData)
            io.to(sID).emit("receive-json", fileData)
            // io.emit('receive-json', fileData)
            console.log("Succesfully read " + filename + ", instructions: "+ fileData.length)
          }else{
            console.log(err)
          }
        })
      }else{
        // io.to(sID).emit("receive-json", data)
        // io.to(sID).emit("new-file", sequenceFile)
    }
  })
});
