const mqtt = require("mqtt");
const { stringify } = require("nodemon/lib/utils");

const express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const mongoose = require('mongoose');

const http = require('http');
const dotenv = require('dotenv');
const path = require('path');
const ejs = require('ejs');
const server = http.createServer(app);
require('dotenv').config()

const DBConnect = require('./mongoConnect');
const connect = new DBConnect(process.env.DBUser,process.env.DBPassword);
const mongoose = require("mongoose");
const Data = require('./models/data');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

const broker = "mqtt:broker.hivemq.com:1883";
const client = mqtt.connect(broker);

client.on("connect", () => {
  const topic = "nhom10/dht/temp";
  const topic2 = "nhom10/dht/humi";
  const topic3 = "nhom10/dht/lux";
  const topic4 = "nhom10/dht/led1";
  const topic5 = "nhom10/dht/led2";
  client.subscribe([topic,topic3,topic4,topic5,topic2]);
});

client.on("message", (topic,  message) => {
  let m = message.toString();
  const type = m.split("/");
  let name = type[0];
  var value = type[1];
  if (name == "tem"){
    console.log("temperature: " + value)
  }
  if (name == "hum"){
    console.log("humidity: " + value)
  }
  if (name == "lux"){
    console.log("lux: " + value)
  }  
});

// Gửi khi nhận được data


// Tạo kết nối đến MongoDB
var app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true}));


mongoose.connect(CONNECTION_URL)
var db = mongoose.connection;

// GET DATAs
app.get('/api/data', function(req, res){
  Data.getDatas(function(err, datas){
    if(err){
    	throw err;
    }
    res.json(datas);
  })
})

// GET DATA
app.get('/api/data/:_id', function(req, res){
  Data.getDataById(req.params._id, function(err, data){
    if(err){
    	throw err;
    }
    res.json(data);
  })
})

// POST DATA
app.post('/api/data', function(req, res){
  var data = req.body;
  Data.addData(data,function(err, data){
    if(err){
    	throw err;
    }
    res.json(data);
  })
})

// SEARCH ANY FIELD


// Stacktrace & no stacktrace produced
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Forward 404 to handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(PORT);
console.log('Running on port ' + PORT);