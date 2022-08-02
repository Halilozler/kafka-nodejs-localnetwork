const { Kafka } = require("kafkajs");

try {
    exports.kafka = new Kafka({
        clientId: "kafka1",
        brokers: ["10.0.74.66:9092"]
    });
    
} catch (error) {
    console.log(error);
}
