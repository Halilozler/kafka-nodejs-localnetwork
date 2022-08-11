
exports.kafkaProducer = async(kafka) => {
    try {
        const producer = kafka.producer();
        await producer.connect();
        global.producer = producer;
        return {ok:1};
    } catch (error) {
        return {error, ok:0};
    }
}