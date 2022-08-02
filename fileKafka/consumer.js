const {kafka} = require("./main");
const db = require("../Models/dbConnect");

db.connect();

const writeData = "INSERT INTO tbl_log(user_id, mesaj) VALUES($1, $2)";
const tblCreate = "CREATE TABLE tbl_log (id serial PRIMARY KEY, user_id VARCHAR ( 50 ), mesaj VARCHAR ( 50 ))"

async function fun(){
    try {
        const consumer = kafka.consumer({
            groupId: "11111"
        });

        console.log("Consumer'a bağlanılıyor....");
        await consumer.connect();
        console.log("Consumer'a bağlantı başarılı.");

        await consumer.subscribe({
            topic: "topic1",
            fromBeginning: true     
        });

        await consumer.run({
            eachMessage: async result => {
                //result.message.value
                //result.message.key
                if(result.message.key != "1"){
                    const dbValue = [result.message.key,result.message.value];
                    db.query(writeData, dbValue)
                        .then(res => {
                            console.log("Database yazıldı");
                        }).catch(e => {
                            if(e.code == "42P01"){
                                db.query(tblCreate);
                                console.log("tekrar deneyin");
                            }
                        })
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

fun();

