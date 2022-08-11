const db = require("../Models/dbConnect");
const {kafka} = require("../fileKafka/main");

db.connect();

const tblCreate = "CREATE TABLE tbl_log (id serial PRIMARY KEY, user_id VARCHAR ( 50 ), mesaj VARCHAR ( 50 ))"
const writeData = "INSERT INTO tbl_log(user_id, mesaj) VALUES($1, $2)";
const readData = "SELECT * FROM public.tbl_log ORDER BY id DESC";

exports.setData = (req, res) => {
    const value = ["1", req.body.mesaj];
    db.query(writeData, value)
    .then(res => {
        console.log("Database Yazıldı");
        //kafkaya mesaj gönderiyor.
        const kafkaMethod = async() => {
            try {
                const producer = kafka.producer();
                console.log("Producer'a bağlanılıyor....");
                await producer.connect();
                console.log("Producer'a bağlantı başarılı.");
    
                const message_result = await producer.send({
                    topic :  "topic1",      
                    messages : [{
                        value: req.body.mesaj,
                        key: "1",
                        partition: 0
                        }
                    ]
                })
                console.log("Kafkaya Göderim işlemi başarılı.");
                await producer.disconnect();
            } catch (error) {
                console.log(error);
            }
        }

        kafkaMethod();
    })
    .catch(e => {
        if(e.code == "42P01"){
            db.query(tblCreate);
            console.log("tekrar deneyin");
        }
    })

    res.redirect();
};

exports.getData = (req, res) => {
    db.query(readData)
        .then(res => {console.log(res.rows);})
        .catch(e => console.log("Hata Oldu"))

    res.redirect();
}
