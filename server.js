var express = require('express');
var app = express();
var server = require('http').createServer(app);
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
