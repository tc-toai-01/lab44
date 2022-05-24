const mqtt = require("mqtt");

const broker = "mqtt:172.31.250.212:1883";
const client = mqtt.connect(broker);

client.on("connect", () => {
  const topic = "dht/value";
  client.subscribe(topic);
});

client.on("message", (topic, message) => {
  console.log(message.toString());
  
});