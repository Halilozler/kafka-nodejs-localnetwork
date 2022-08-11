const { postgres_writeData }  = require("../Sources/Db/postgres/writeData_db")
const { postgres_readData } = require("../Sources/Db/postgres/readData_db")
const { Producer } = require("../Sources/Kafka/Producer")


exports.setData = async(req, res) => {
    const value = [process.env.ID, req.body.mesaj];
    const return_value = await postgres_writeData(value);
    if(return_value.ok == 1){
        const pro = await Producer({id: value[0], mesaj: value[1]});
        if(pro.ok == 1){
            res.status(200).json("Database yazıldı ve Kafkaya gönderildi");
        }else{
            res.status(400).json(pro.error);
        }
    }else{
        res.status(400).json(value.err);
    }
};

exports.getData = async(req, res) => {
    const value = await postgres_readData();

    if(value.ok == 1){
        res.status(200).json(value.values);
    }else{
        res.status(400).json(value.err);
    }
}
