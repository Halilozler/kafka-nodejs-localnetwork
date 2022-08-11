const {dbCommand} = require("../../../Core/DataBase/DbCommand");

async function postgres_writeData(data){
    try {
        await global.db.query(dbCommand.writeData, data)
        return {ok:1}
    } catch (error) {
        return {ok:0, err:error}
    }
}

module.exports = {
    postgres_writeData
};