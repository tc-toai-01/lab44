const mqtt = require("mqtt");
const { stringify } = require("nodemon/lib/utils");

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
    console.log("tempurate: " + value)
  }
  if (name == "hum"){
    console.log("humidity: " + value)
  }
  if (name == "lux"){
    console.log("luxuri: " + value)
  }  
});
