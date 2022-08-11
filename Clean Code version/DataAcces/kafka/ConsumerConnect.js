
exports.kafkaConsumer = async(kafka) => {
    try {
        const consumer = kafka.consumer({
            groupId: "32"
        });
        await consumer.connect();
        await consumer.subscribe({
            topic: "topic1",
            fromBeginning: true     
        });
        return {consumer, ok:1};
    } catch (error) {
        return {error, ok:0};
    }
}