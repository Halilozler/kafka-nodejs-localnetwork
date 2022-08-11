const {dbCommand} = require("../../../Core/DataBase/DbCommand");

async function postgres_readData() {
    try {
        const val = await global.db.query(dbCommand.readData)
        return {values: val.rows, ok:1};
    } catch (error) {
        return {err: error, ok:0};
    }
}

module.exports = {
    postgres_readData
}