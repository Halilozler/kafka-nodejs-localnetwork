const express = require('express');
require('dotenv').config()
const {connect} = require("./Sources/Kafka/index")
const { start_db } = require("./DataAcces/postgres/connect")


const mainController = require("./Controller/mainController");


const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post("/", mainController.setData);

app.get("/data", mainController.getData);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    async function fun(){
        const kafka = await connect();

        await start_db();

        if(kafka != 0 || global.db !== undefined){
            console.log('Sunucu başlatıldı');
        }
        else{
            console.log("Sunucu Başlatılırken Kafka veya Database Bağlanamdı");
        }
    } 
    fun()
});


