const { Client } = require("pg");
const {DATABASE_CONFIG} = require("../../Core/DataBase/DbConnect");

exports.start_db = () => {

    global.db = new Client(DATABASE_CONFIG); 

    global.db.connect(function (err) {
        if (err) {
            return {ok:0, err} 
        }
        
        return {ok:1}
    });
}
