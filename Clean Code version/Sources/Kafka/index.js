const{ kafkaConfig } = require("../../DataAcces/kafka/kafkaConnect");
const{ kafkaProducer } = require("../../DataAcces/kafka/ProducerConnect");
const{ kafkaConsumer } = require("../../DataAcces/kafka/ConsumerConnect");
const{ Consumer } = require("./Consumer");

exports.connect = async() => {
    const value = await kafkaConfig();
    if(value.ok == 1){
        const producer = await kafkaProducer(value.kafka);
        const consumer = await kafkaConsumer(value.kafka);
        if(producer.ok == 0 || consumer.ok == 0){
            return 0
        }
        Consumer(consumer.consumer);

        return 1;
    }else{
        return 0;
    }
} 

