const express = require('express');
const mainController = require("./Controller/mainController");

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post("/", mainController.setData);

app.get("/data", mainController.getData);


const port = 3000;
app.listen(port, () => {
    console.log('Sunucu başlatıldı');
});


