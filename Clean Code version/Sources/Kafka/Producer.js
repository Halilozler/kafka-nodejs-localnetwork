
exports.Producer = async(data) => {
    try {
        await global.producer.send({
            topic :  "topic1",      
            messages : [{
                value: data.mesaj,
                key: data.id,
                partition: 0
                }
            ]
        })
        return {ok:1}
    } catch (error) {
        return {ok:0, error}
    }
    
}