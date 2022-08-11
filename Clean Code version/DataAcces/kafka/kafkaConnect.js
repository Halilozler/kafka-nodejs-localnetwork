const { Kafka } = require("kafkajs");

exports.kafkaConfig = () => {
    try {
        kafka = new Kafka({
            clientId: "kafka1",
            brokers: ["10.0.74.66:9092"]
        });
        return {ok:1, kafka}
    } catch (error) {
        return {ok:0, error}
    }
}