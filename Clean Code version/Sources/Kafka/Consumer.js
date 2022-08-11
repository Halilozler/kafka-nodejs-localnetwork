const { postgres_writeData } = require("../../Sources//Db/postgres/writeData_db")


exports.Consumer = async(consumer) => {
    try {
        await consumer.run({
        eachMessage: (result) => {
            
            if(result.message.key != process.env.ID){
                console.log(`Received message: ${result.message.value}, key:${result.message.key} `);
                const dbValue = [result.message.key,result.message.value];
                postgres_writeData(dbValue);

            }
            
        }
    });
    } catch (error) {
        console.log(error);
    }
    
}
